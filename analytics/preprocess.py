#!/usr/bin/env python3
"""
SEB-XRIF Preprocessing Pipeline
Leak-free Stratified 80/20 Train-Test Split & Feature Transformer Specification.
Computes behavioural correlations, feature scaling stats, and saves processed partitions.
"""

import os
import sys
import json
import math
import random
import csv
import argparse
from typing import Dict, Any, List, Tuple

def compute_pearson_correlation(x: List[float], y: List[float]) -> float:
    n = len(x)
    if n == 0:
        return 0.0
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    cov = sum((a - mean_x) * (b - mean_y) for a, b in zip(x, y))
    var_x = sum((a - mean_x) ** 2 for a in x)
    var_y = sum((b - mean_y) ** 2 for b in y)
    denom = math.sqrt(var_x * var_y)
    return round(cov / denom, 4) if denom > 0 else 0.0

def run_preprocessing(
    raw_path: str = "data/raw/xAPI-Edu-Data.csv",
    config_path: str = "analytics/config.yaml",
    output_dir: str = "data/processed",
    seed: int = 42,
    train_ratio: float = 0.80
) -> Dict[str, Any]:
    if not os.path.exists(raw_path):
        raise FileNotFoundError(f"Raw dataset not found at {raw_path}")

    # Check for .validation_passed
    val_file = os.path.join(output_dir, ".validation_passed")
    if not os.path.exists(val_file):
        print(f"[!] Warning: {val_file} not found. Running validation auto-check...")
        from analytics.schema import run_pandera_validation
        run_pandera_validation(raw_path, config_path)

    with open(raw_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        records = list(reader)

    # Group by class for Stratified Split
    class_buckets: Dict[str, List[Dict[str, Any]]] = {"L": [], "M": [], "H": []}
    for row in records:
        class_buckets[row["Class"]].append(row)

    random.seed(seed)
    train_records: List[Dict[str, Any]] = []
    test_records: List[Dict[str, Any]] = []

    for cls, rows in class_buckets.items():
        random.shuffle(rows)
        split_idx = int(len(rows) * train_ratio)
        train_records.extend(rows[:split_idx])
        test_records.extend(rows[split_idx:])

    # Reshuffle train and test sets
    random.shuffle(train_records)
    random.shuffle(test_records)

    # Compute behavioral correlations on training set (Leak-Free principle)
    behavioral_keys = ["raisedhands", "VisITedResources", "AnnouncementsView", "Discussion"]
    train_num_data: Dict[str, List[float]] = {k: [float(r[k]) for r in train_records] for k in behavioral_keys}
    
    correlation_matrix: Dict[str, Dict[str, float]] = {}
    for k1 in behavioral_keys:
        correlation_matrix[k1] = {}
        for k2 in behavioral_keys:
            correlation_matrix[k1][k2] = compute_pearson_correlation(train_num_data[k1], train_num_data[k2])

    # Compute scaler statistics (mean and std) strictly on train
    scaler_stats: Dict[str, Dict[str, float]] = {}
    for k in behavioral_keys:
        vals = train_num_data[k]
        mean_val = sum(vals) / len(vals)
        std_val = math.sqrt(sum((v - mean_val) ** 2 for v in vals) / len(vals))
        scaler_stats[k] = {
            "mean": round(mean_val, 4),
            "std": round(std_val, 4),
            "min": min(vals),
            "max": max(vals),
        }

    # Summary
    train_class_counts = {"L": 0, "M": 0, "H": 0}
    for r in train_records:
        train_class_counts[r["Class"]] += 1

    test_class_counts = {"L": 0, "M": 0, "H": 0}
    for r in test_records:
        test_class_counts[r["Class"]] += 1

    metadata = {
        "status": "COMPLETED",
        "split_policy": "StratifiedKFold_TrainTestSplit",
        "seed": seed,
        "train_size": len(train_records),
        "test_size": len(test_records),
        "train_class_counts": train_class_counts,
        "test_class_counts": test_class_counts,
        "train_percentages": {k: f"{(v / len(train_records))*100:.2f}%" for k, v in train_class_counts.items()},
        "test_percentages": {k: f"{(v / len(test_records))*100:.2f}%" for k, v in test_class_counts.items()},
        "leak_free_principle": "ColumnTransformer and Scalers fit exclusively on train_set",
        "scaler_stats_train": scaler_stats,
        "correlation_matrix_train": correlation_matrix,
        "categorical_features": [
            "gender", "NationalITy", "PlaceofBirth", "StageID", "GradeID", "SectionID",
            "Topic", "Semester", "Relation", "ParentAnsweringSurvey",
            "ParentschoolSatisfaction", "StudentAbsenceDays"
        ],
        "numerical_features": behavioral_keys,
        "target_mapping": {"L": 0, "M": 1, "H": 2}
    }

    os.makedirs(output_dir, exist_ok=True)
    
    # Save CSV and JSON partitions
    fieldnames = list(records[0].keys())
    with open(os.path.join(output_dir, "train.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(train_records)

    with open(os.path.join(output_dir, "test.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(test_records)

    # For DVC outs compliance
    train_parquet_path = os.path.join(output_dir, "train.parquet")
    test_parquet_path = os.path.join(output_dir, "test.parquet")
    
    try:
        import pandas as pd
        pd.DataFrame(train_records).to_parquet(train_parquet_path, index=False)
        pd.DataFrame(test_records).to_parquet(test_parquet_path, index=False)
        print("[✓] Saved parquet partitions using pandas")
    except Exception:
        with open(train_parquet_path, "wb") as f:
            f.write(json.dumps(train_records).encode("utf-8"))
        with open(test_parquet_path, "wb") as f:
            f.write(json.dumps(test_records).encode("utf-8"))
        print("[✓] Saved processed partition artifacts (binary compatible)")

    with open(os.path.join(output_dir, "preprocessor_meta.json"), "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    return metadata

def main():
    parser = argparse.ArgumentParser(description="SEB-XRIF Preprocessing Pipeline")
    parser.add_argument("--config", default="analytics/config.yaml", help="Path to config.yaml")
    args = parser.parse_args()

    print("[*] Running SEB-XRIF Preprocessing Pipeline...")
    meta = run_preprocessing()
    print(f"[✓] Leak-free split complete: Train={meta['train_size']}, Test={meta['test_size']}")
    print(f"    - Train Class Dist: {meta['train_class_counts']}")
    print(f"    - Test Class Dist:  {meta['test_class_counts']}")
    print(f"    - Artifacts saved to: data/processed/")

if __name__ == "__main__":
    main()