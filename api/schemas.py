"""
SEB-XRIF Pydantic Request & Response Schemas (Phase 8)
"""
from typing import Dict, Any, List, Optional, Literal
try:
    from pydantic import BaseModel, Field
    PYDANTIC_AVAILABLE = True
except ImportError:
    PYDANTIC_AVAILABLE = False
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
        def model_dump(self): return self.__dict__
        def dict(self): return self.__dict__
    def Field(*args, **kwargs): return None

class LearnerFeatures(BaseModel):
    raisedhands: int = Field(default=35, ge=0, le=100)
    VisITedResources: int = Field(default=45, ge=0, le=100)
    AnnouncementsView: int = Field(default=30, ge=0, le=100)
    Discussion: int = Field(default=25, ge=0, le=100)
    StudentAbsenceDays: Literal["Under-7", "Above-7"] = Field(default="Under-7")
    ParentschoolSatisfaction: Literal["Good", "Bad"] = Field(default="Good")
    ParentAnsweringSurvey: Literal["Yes", "No"] = Field(default="Yes")
    Relation: Literal["Mum", "Father"] = Field(default="Mum")
    Topic: str = Field(default="IT")
    Semester: Literal["F", "S"] = Field(default="F")
    gender: Literal["M", "F"] = Field(default="M")
    NationalITy: str = Field(default="KW")
    PlaceofBirth: str = Field(default="KuwaIT")
    StageID: Literal["lowerlevel", "MiddleSchool", "HighSchool"] = Field(default="MiddleSchool")
    GradeID: str = Field(default="G-07")
    SectionID: Literal["A", "B", "C"] = Field(default="A")

class PredictRequest(BaseModel):
    learner_id: Optional[str] = None
    features: LearnerFeatures = Field(default_factory=LearnerFeatures)

class ClassProbabilities(BaseModel):
    Low: float
    Medium: float
    High: float

class LocalFeatureContribution(BaseModel):
    feature: str
    value: Any
    shap_impact: float
    direction: Literal["positive", "negative", "neutral"]
    interpretation: str

class PredictResponse(BaseModel):
    learner_id: Optional[str]
    prediction: Literal["L", "M", "H"]
    predicted_tier: Literal["Low", "Medium", "High"]
    confidence: float
    probabilities: ClassProbabilities
    risk_level: str
    model_id: str
    model_name: str
    model_version: str
    top_contributions: List[LocalFeatureContribution]
    pedagogical_recommendations: List[str]
    inference_latency_ms: float

class BatchPredictRequest(BaseModel):
    learners: List[PredictRequest]

class BatchPredictResponse(BaseModel):
    total_records: int
    predictions: List[PredictResponse]
    cohort_summary: Dict[str, Any]
    execution_time_ms: float

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    model_loaded: bool
    model_name: str
    model_f1: float
    uptime_seconds: float
    timestamp: str

class MetricsResponse(BaseModel):
    model_id: str
    model_name: str
    version: str
    test_macro_f1: float
    test_accuracy: float
    cv_mean_macro_f1: float
    cv_std_macro_f1: float
    latency_ms: float
    benchmark_status: str
    per_class_metrics: Dict[str, Dict[str, float]]
    confusion_matrix: List[List[int]]

class ImportanceItem(BaseModel):
    feature: str
    importance: float
    category: str
    rank: int
    pedagogical_actionability: str

class ImportanceResponse(BaseModel):
    model_name: str
    method: str
    total_features: int
    ranking: List[ImportanceItem]
    top_driver: str

class TrendsResponse(BaseModel):
    sample_size: int
    class_distribution: Dict[str, int]
    behavioural_averages_by_tier: Dict[str, Dict[str, float]]
    longitudinal_milestones: List[Dict[str, Any]]