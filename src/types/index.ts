/**
 * SEB-XRIF Authoritative TypeScript Type Definitions
 * Scalable, Evidence-Based XR Integration Framework
 */

// 1. Dataset & Predictor Types
export interface DemographicFeatures {
  gender: 'M' | 'F';
  NationalITy: string;
  PlaceofBirth: string;
  StageID: 'lowerlevel' | 'MiddleSchool' | 'HighSchool' | string;
  GradeID: string;
  SectionID: 'A' | 'B' | 'C' | string;
}

export interface AcademicFeatures {
  Topic: string;
  Semester: 'F' | 'S';
  Relation: 'Father' | 'Mum';
  ParentAnsweringSurvey: 'Yes' | 'No';
  ParentschoolSatisfaction: 'Good' | 'Bad';
  StudentAbsenceDays: 'Under-7' | 'Above-7';
}

export interface BehaviouralFeatures {
  raisedhands: number;        // 0 - 100
  VisITedResources: number;   // 0 - 100
  AnnouncementsView: number;  // 0 - 100
  Discussion: number;         // 0 - 100
}

export type LearnerPredictors = DemographicFeatures & AcademicFeatures & BehaviouralFeatures;

export type PerformanceClassRaw = 'L' | 'M' | 'H';
export type PerformanceTierDisplay = 'Low' | 'Medium' | 'High';

export interface LearnerRecord extends LearnerPredictors {
  id?: string | number;
  Class: PerformanceClassRaw;
}

// 2. Prediction & Inference Types
export interface ClassProbabilities {
  Low: number;
  Medium: number;
  High: number;
}

export interface PredictionResult {
  prediction: PerformanceTierDisplay;
  probabilities: ClassProbabilities;
  confidence: number;
  model_version: string;
  feature_contributions?: Record<string, number>;
}

export interface BatchPredictionResponse {
  total: number;
  predictions: Array<PredictionResult & { index: number }>;
  model_version: string;
}

// 3. Model Comparison & Metrics Types
export interface ConfusionMatrix {
  labels: PerformanceTierDisplay[];
  matrix: number[][]; // 3x3 matrix [[LL, LM, LH], [ML, MM, MH], [HL, HM, HH]]
}

export interface ModelMetrics {
  model_name: string;
  model_version: string;
  accuracy: number;
  macro_precision: number;
  weighted_precision: number;
  macro_recall: number;
  weighted_recall: number;
  macro_f1: number;
  weighted_f1: number;
  cv_mean: number;
  cv_std: number;
  confusion_matrix: ConfusionMatrix;
  benchmark_f1_range: [number, number]; // [0.75, 0.83]
}

export interface ModelComparisonRow {
  model: string;
  family: string;
  accuracy: number;
  macro_precision: number;
  macro_recall: number;
  macro_f1: number;
  weighted_f1: number;
  cv_mean: number;
  cv_std: number;
  status: 'promoted' | 'candidate' | 'baseline';
  notes?: string;
}

// 4. Explainability Types
export interface FeatureImportanceItem {
  feature: string;
  importance: number;
  category: 'demographic' | 'academic' | 'behavioural';
  rank: number;
}

export interface ShapSummaryData {
  features: string[];
  mean_abs_shap: number[];
  base_value: number;
}

// 5. Evaluation Layer Types
export interface SusAssessment {
  id?: string;
  timestamp: string;
  participant_id: string;
  answers: [number, number, number, number, number, number, number, number, number, number]; // 10 items, 1-5 scale
  raw_total: number;
  sus_score: number; // 0 - 100
  interpretation: 'Excellent' | 'Good' | 'OK' | 'Poor' | 'Unacceptable';
  completeness: boolean;
}

export interface CohensDResult {
  comparison: string;
  cohens_d: number;
  interpretation: 'small' | 'medium' | 'large' | 'negligible';
  ci_lower?: number;
  ci_upper?: number;
  sample_size_t0?: number;
  sample_size_t1?: number;
  sample_size_t2?: number;
}

export interface LongitudinalRetentionPlan {
  timepoint: 'T0' | 'T1' | 'T2';
  description: string;
  measurement_status: 'actual' | 'published_benchmark' | 'future_pilot';
  mean_score?: number;
  std_dev?: number;
  sample_size?: number;
}

// 6. Navigation and UI State
export interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'production';
}

export type NavigationTab = 
  | 'overview'
  | 'distribution'
  | 'behaviour'
  | 'models'
  | 'explainability'
  | 'prediction'
  | 'evaluation'
  | 'verification'
  | 'reproducibility';