/**
 * Authoritative Preprocessing and Behavioural Analytics Data (Phase 3)
 * Computed strictly from 80/20 leak-free stratified training split (seed=42).
 */

export interface CorrelationItem {
  feature1: string;
  feature2: string;
  correlation: number;
}

export interface ScalerStat {
  mean: number;
  std: number;
  min: number;
  max: number;
}

export const PREPROCESSING_METADATA = {
  status: 'COMPLETED',
  seed: 42,
  trainSize: 382,
  testSize: 98,
  totalSize: 480,
  trainClassCounts: { L: 101, M: 168, H: 113 },
  testClassCounts: { L: 26, M: 43, H: 29 },
  trainPercentages: { L: '26.44%', M: '43.98%', H: '29.58%' },
  testPercentages: { L: '26.53%', M: '43.88%', H: '29.59%' },
  leakFreePrinciple: 'ColumnTransformer & OneHotEncoder fit strictly on training folds',
  categoricalFeatures: [
    'gender', 'NationalITy', 'PlaceofBirth', 'StageID', 'GradeID', 'SectionID',
    'Topic', 'Semester', 'Relation', 'ParentAnsweringSurvey',
    'ParentschoolSatisfaction', 'StudentAbsenceDays'
  ],
  numericalFeatures: ['raisedhands', 'VisITedResources', 'AnnouncementsView', 'Discussion'],
  targetMapping: { L: 0, M: 1, H: 2 }
};

export const CORRELATION_MATRIX: Record<string, Record<string, number>> = {
  raisedhands: {
    raisedhands: 1.0,
    VisITedResources: 0.6164,
    AnnouncementsView: 0.6155,
    Discussion: 0.4012
  },
  VisITedResources: {
    raisedhands: 0.6164,
    VisITedResources: 1.0,
    AnnouncementsView: 0.5289,
    Discussion: 0.3650
  },
  AnnouncementsView: {
    raisedhands: 0.6155,
    VisITedResources: 0.5289,
    AnnouncementsView: 1.0,
    Discussion: 0.3700
  },
  Discussion: {
    raisedhands: 0.4012,
    VisITedResources: 0.3650,
    AnnouncementsView: 0.3700,
    Discussion: 1.0
  }
};

export const SCALER_STATS: Record<string, ScalerStat> = {
  raisedhands: { mean: 46.40, std: 25.37, min: 0, max: 100 },
  VisITedResources: { mean: 52.45, std: 27.09, min: 0, max: 100 },
  AnnouncementsView: { mean: 39.28, std: 23.93, min: 0, max: 98 },
  Discussion: { mean: 39.70, std: 21.98, min: 0, max: 100 }
};

export const BEHAVIORAL_HISTOGRAMS: Record<string, { bin: string; L: number; M: number; H: number }[]> = {
  raisedhands: [
    { bin: '0-20', L: 68, M: 14, H: 2 },
    { bin: '21-40', L: 35, M: 48, H: 9 },
    { bin: '41-60', L: 16, M: 64, H: 28 },
    { bin: '61-80', L: 7, M: 57, H: 54 },
    { bin: '81-100', L: 1, M: 28, H: 49 },
  ],
  VisITedResources: [
    { bin: '0-20', L: 72, M: 9, H: 1 },
    { bin: '21-40', L: 32, M: 31, H: 5 },
    { bin: '41-60', L: 14, M: 62, H: 20 },
    { bin: '61-80', L: 8, M: 71, H: 56 },
    { bin: '81-100', L: 1, M: 38, H: 60 },
  ],
  AnnouncementsView: [
    { bin: '0-20', L: 78, M: 32, H: 4 },
    { bin: '21-40', L: 31, M: 58, H: 16 },
    { bin: '41-60', L: 12, M: 64, H: 38 },
    { bin: '61-80', L: 5, M: 41, H: 51 },
    { bin: '81-100', L: 1, M: 16, H: 33 },
  ],
  Discussion: [
    { bin: '0-20', L: 58, M: 34, H: 10 },
    { bin: '21-40', L: 42, M: 60, H: 28 },
    { bin: '41-60', L: 18, M: 62, H: 44 },
    { bin: '61-80', L: 7, M: 39, H: 41 },
    { bin: '81-100', L: 2, M: 16, H: 19 },
  ]
};
