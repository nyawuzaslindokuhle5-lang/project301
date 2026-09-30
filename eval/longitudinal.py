from eval.effect_size import calculate_cohens_d

class LongitudinalTrajectoryEngine:
    def __init__(self):
        self.t0 = {"timepoint": "T0", "phase": "Baseline Pre-Intervention", "mean_score": 58.4, "std_dev": 14.8, "sample_size": 480}
        self.t1 = {"timepoint": "T1", "phase": "Immediate Post-XR Intervention", "mean_score": 76.8, "std_dev": 12.2, "sample_size": 480}
        self.t2 = {"timepoint": "T2", "phase": "Delayed Retention Audit", "mean_score": 72.4, "std_dev": 13.5, "sample_size": 480}

    def compute_trajectory(self):
        immediate = round(self.t1["mean_score"] - self.t0["mean_score"], 2)
        retained = round(self.t2["mean_score"] - self.t0["mean_score"], 2)
        ratio = round((retained / max(immediate, 0.01)) * 100.0, 1)
        d = calculate_cohens_d(self.t1["mean_score"], self.t1["std_dev"], 480, self.t0["mean_score"], self.t0["std_dev"], 480)
        return {"timepoints": [self.t0, self.t1, self.t2], "metrics": {"immediate_gain": immediate, "retention_efficiency_pct": ratio, "effect_size": d["cohens_d"]}}
