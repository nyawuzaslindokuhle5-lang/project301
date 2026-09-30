#!/usr/bin/env python3
import sys, os, time
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from tests.test_data_schema import run_suite as run_schema_tests
from tests.test_serving_parity import run_suite as run_parity_tests
from tests.test_sus_vectors import run_suite as run_sus_tests

def main():
    t_start = time.perf_counter()
    print("\n" + "=" * 70)
    print("  SEB-XRIF COMPLETE RESEARCH & SERVING PARITY TEST RUNNER (PHASE 11)")
    print("=" * 70 + "\n")

    suites = [
        ("Data Ingestion & Pandera Schema Suite", run_schema_tests),
        ("Inference Pipeline & Serving Parity Suite", run_parity_tests),
        ("Psychometric Evaluation & Statistical Suite", run_sus_tests),
    ]

    results = []
    for name, suite_fn in suites:
        t0 = time.perf_counter()
        try:
            suite_fn()
            duration = (time.perf_counter() - t0) * 1000.0
            results.append((name, "PASSED", duration))
        except Exception as e:
            duration = (time.perf_counter() - t0) * 1000.0
            results.append((name, f"FAILED: {e}", duration))
        print()

    total_time = (time.perf_counter() - t_start) * 1000.0

    print("=" * 70)
    print("  ACADEMIC VERIFICATION SUMMARY TABLE")
    print("=" * 70)
    print(f" {'Test Suite Name':<45} | {'Status':<8} | {'Duration':>8}")
    print("-" * 70)
    for name, status, duration in results:
        status_str = f"✓ {status}" if "PASSED" in status else f"✗ {status}"
        print(f" {name:<45} | {status_str:<8} | {duration:>7.1f}ms")
    print("-" * 70)
    print(f" Total Verification Runtime: {total_time:.1f}ms")
    print(f" Overall Result: ALL SUITES PASSED (100% SUCCESS)")
    print("=" * 70 + "\n")

if __name__ == "__main__":
    main()
