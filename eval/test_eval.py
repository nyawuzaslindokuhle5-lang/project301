#!/usr/bin/env python3
import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from eval.sus import calculate_single_sus, evaluate_cohort_sus, PUBLISHED_SUS_BENCHMARK
from eval.effect_size import calculate_cohens_d, PUBLISHED_COHENS_D_BENCHMARK
from eval.longitudinal import LongitudinalTrajectoryEngine

sus_neutral = calculate_single_sus([3]*10)
assert sus_neutral["sus_score"] == 50.0
print(" [PASS] 1. SUS Neutral Vector: All 3s = 50.0")

sus_perfect = calculate_single_sus([5, 1, 5, 1, 5, 1, 5, 1, 5, 1])
assert sus_perfect["sus_score"] == 100.0
print(" [PASS] 2. SUS Maximum Vector: Score = 100.0 (Grade A+)")

sus_worst = calculate_single_sus([1, 5, 1, 5, 1, 5, 1, 5, 1, 5])
assert sus_worst["sus_score"] == 0.0
print(" [PASS] 3. SUS Minimum Vector: Score = 0.0 (Grade F)")

cohort = evaluate_cohort_sus([[4, 2, 5, 2, 4, 2, 5, 2, 4, 2], [5, 1, 4, 2, 5, 2, 4, 1, 5, 2]])
assert cohort["mean_sus"] >= 75.0
print(f" [PASS] 4. SUS Cohort: Mean = {cohort['mean_sus']} (Target: {PUBLISHED_SUS_BENCHMARK})")

d_zero = calculate_cohens_d(70, 10, 30, 70, 10, 30)
assert d_zero["cohens_d"] == 0.0
print(" [PASS] 5. Cohen's d Null: d = 0.0")

d_bench = calculate_cohens_d(76.8, 12.2, 50, 65.2, 12.5, 50)
assert abs(d_bench["cohens_d"] - PUBLISHED_COHENS_D_BENCHMARK) < 0.02
print(f" [PASS] 6. Cohen's d Benchmark: d = {d_bench['cohens_d']} (Target: {PUBLISHED_COHENS_D_BENCHMARK})")

traj = LongitudinalTrajectoryEngine().compute_trajectory()
assert traj["metrics"]["immediate_gain"] == 18.4
print(f" [PASS] 7. Longitudinal (T0-T2): Immediate Gain = +{traj['metrics']['immediate_gain']} pts, Retained = {traj['metrics']['retention_efficiency_pct']}%")
print("\n All 7/7 Phase 10 Evaluation tests PASSED successfully!\n")
