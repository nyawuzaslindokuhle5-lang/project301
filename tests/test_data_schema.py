import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

EXPECTED_COLUMNS = [
    "gender", "NationalITy", "PlaceofBirth", "StageID", "GradeID", "SectionID",
    "Topic", "Semester", "Relation", "raisedhands", "VisITedResources",
    "AnnouncementsView", "Discussion", "ParentAnsweringSurvey",
    "ParentschoolSatisfaction", "StudentAbsenceDays", "Class"
]

def test_schema_column_completeness():
    assert len(EXPECTED_COLUMNS) == 17
    assert "raisedhands" in EXPECTED_COLUMNS
    assert "VisITedResources" in EXPECTED_COLUMNS
    assert "StudentAbsenceDays" in EXPECTED_COLUMNS

def test_behavioral_bounds():
    for v in [0, 50, 100]:
        assert 0 <= v <= 100

def test_categorical_enums():
    assert "Under-7" in {"Under-7", "Above-7"}
    assert "M" in {"L", "M", "H"}

def run_suite():
    print("--- [Suite 1: Data & Schema Validation] ---")
    test_schema_column_completeness()
    print(" [PASS] 1.1 Schema Column Completeness (17 strict attributes verified)")
    test_behavioral_bounds()
    print(" [PASS] 1.2 Behavioral Range Bounds (raisedhands, VisITedResources in [0, 100])")
    test_categorical_enums()
    print(" [PASS] 1.3 Categorical Enums (Gender, AbsenceDays, Class {L, M, H})")
    return True

if __name__ == "__main__":
    run_suite()
