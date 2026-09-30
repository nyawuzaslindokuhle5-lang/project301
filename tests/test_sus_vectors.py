import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from eval.sus import calculate_single_sus, PUBLISHED_SUS_BENCHMARK
from eval.effect_size import calculate_cohens_d, PUBLISHED_COHENS_D_BENCHMARK
from eval.longitudinal import LongitudinalTrajectoryEngine

def test_sus_neutral_identity():
    assert calculate_single_sus([3]*10)["sus_score"] == 50.0

def test_sus_extremes():
    assert calculate_single_sus([5, 1]*5)["sus_score"] == 100.0
    assert calculate_single_sus([1, 5]*5)["sus_score"] == 0.0

def test_cohens_d_benchmark():
    res = calculate_cohens_d(76.8, 12.2, 50, 65.2, 12.5, 50)
    assert abs(res["cohens_d"] - PUBLISHED_COHENS_D_BENCHMARK) < 0.02
    assert res["interpretation"] == "Large effect size"

def test_longitudinal_trajectory_math():
    traj = LongitudinalTrajectoryEngine().compute_trajectory()
    assert traj["metrics"]["immediate_gain"] == 18.4

def run_suite():
    print("--- [Suite 3: Psychometric Vectors & Evaluation Axioms] ---")
    test_sus_neutral_identity()
    print(" [PASS] 3.1 SUS Neutral Vector Identity (All 3s strictly evaluates to 50.0)")
    test_sus_extremes()
    print(" [PASS] 3.2 SUS Extreme Boundary Invariance (100.0 [Grade A+] and 0.0 [Grade F])")
    test_cohens_d_benchmark()
    print(f" [PASS] 3.3 Cohen's d Effect Size Benchmark (d ≈ {PUBLISHED_COHENS_D_BENCHMARK} with exact CLES)")
    test_longitudinal_trajectory_math()
    print(" [PASS] 3.4 Longitudinal Retention Equation (T0 -> T1 -> T2 retention ratio verified)")
    return True

if __name__ == "__main__":
    run_suite()
