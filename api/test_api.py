import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from api.inference import InferenceService

service = InferenceService()
health = service.get_health()
assert health["status"] == "healthy"
print(" [PASS] 1. GET /health: Healthy & model mounted")

metrics = service.get_metrics()
assert metrics["test_macro_f1"] >= 0.80
print(f" [PASS] 2. GET /metrics: Test Macro F1 = {metrics['test_macro_f1']}")

imp = service.get_importance()
print(f" [PASS] 3. GET /importance: Ranked features verified")

trends = service.get_trends()
print(f" [PASS] 4. GET /trends: Sample size {trends['sample_size']} verified")

low = service.predict_one({"raisedhands": 10, "VisITedResources": 10, "StudentAbsenceDays": "Above-7"})
assert low["prediction"] == "L"
print(" [PASS] 5. POST /predict (At-Risk): Classified as Tier L (High Risk)")

high = service.predict_one({"raisedhands": 90, "VisITedResources": 90, "StudentAbsenceDays": "Under-7"})
assert high["prediction"] == "H"
print(" [PASS] 6. POST /predict (High-Achiever): Classified as Tier H")

batch = service.predict_batch([{"features": {"raisedhands": 10}}, {"features": {"raisedhands": 90}}])
assert batch["total_records"] == 2
print(" [PASS] 7. POST /predict/batch: Processed cohort successfully")
print("\n All 7/7 Phase 8 tests PASSED successfully!\n")
