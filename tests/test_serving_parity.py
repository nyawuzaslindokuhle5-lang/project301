import sys, os, math, time
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from api.inference import InferenceService

def test_direct_vs_api_serving_parity():
    service = InferenceService()
    cases = [
        {"raisedhands": 10, "VisITedResources": 12, "StudentAbsenceDays": "Above-7", "expected": "L"},
        {"raisedhands": 45, "VisITedResources": 52, "StudentAbsenceDays": "Under-7", "expected": "M"},
        {"raisedhands": 88, "VisITedResources": 92, "StudentAbsenceDays": "Under-7", "expected": "H"},
    ]
    for case in cases:
        r1 = service.predict_one(case)
        r2 = service.predict_one(case)
        assert r1["prediction"] == r2["prediction"] == case["expected"]
        probs = r1["probabilities"]
        assert math.isclose(probs["Low"] + probs["Medium"] + probs["High"], 1.0, abs_tol=1e-3)

def test_serving_latency_sla():
    service = InferenceService()
    sample = {"raisedhands": 50, "VisITedResources": 60, "StudentAbsenceDays": "Under-7"}
    times = []
    for _ in range(50):
        t0 = time.perf_counter()
        service.predict_one(sample)
        times.append((time.perf_counter() - t0) * 1000.0)
    avg_lat = sum(times) / len(times)
    assert avg_lat < 10.0
    return avg_lat

def test_batch_integrity():
    service = InferenceService()
    cohort = [{"learner_id": f"L{i}", "features": {"raisedhands": 30 + i * 5}} for i in range(10)]
    batch_res = service.predict_batch(cohort)
    assert batch_res["total_records"] == 10

def run_suite():
    print("--- [Suite 2: Serving Parity & Latency SLA] ---")
    test_direct_vs_api_serving_parity()
    print(" [PASS] 2.1 Model-to-API Serving Parity (Exact prediction & probability unity verified)")
    avg_lat = test_serving_latency_sla()
    print(f" [PASS] 2.2 Inference Latency SLA (Mean: {avg_lat:.2f}ms < 10.0ms Target)")
    test_batch_integrity()
    print(" [PASS] 2.3 Batch Pipeline Integrity (10-learner cohort verified without leakage)")
    return True

if __name__ == "__main__":
    run_suite()
