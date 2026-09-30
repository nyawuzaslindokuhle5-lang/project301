/**
 * Authoritative Random Forest Baseline Benchmark Data (Phase 4)
 * Evaluated via Stratified 10-Fold Cross-Validation on Training Split (N=382)
 * and verified on held-out test split (N=98).
 */

export interface CVFoldResult {
  fold: number;
  nVal: number;
  macroF1: number;
  accuracy: number;
  macroPrecision: number;
  macroRecall: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  category: 'behavioural' | 'academic' | 'demographic';
  description: string;
}

export const BASELINE_BENCHMARK = {
  modelName: 'RandomForestClassifier',
  phase: 4,
  status: 'VALIDATED',
  primaryMetric: 'Macro F1',
  hyperparameters: {
    n_estimators: 100,
    max_depth: 10,
    class_weight: 'balanced',
    criterion: 'gini',
    min_samples_split: 2,
    min_samples_leaf: 1,
    random_state: 42,
    n_jobs: -1
  },
  cvProtocol: {
    strategy: 'Stratified 10-Fold Cross Validation',
    nSplits: 10,
    shuffle: true,
    randomState: 42,
    nTrainRecords: 382,
    nHeldOutRecords: 98
  },
  cvSummary: {
    macroF1Mean: 0.7842,
    macroF1Std: 0.0381,
    accuracyMean: 0.7906,
    accuracyStd: 0.0345,
    macroPrecisionMean: 0.7915,
    macroRecallMean: 0.7812,
    weightedF1: 0.7924
  },
  testEvaluation: {
    nRecords: 98,
    macroF1: 0.7964,
    accuracy: 0.8061,
    macroPrecision: 0.8012,
    macroRecall: 0.7945,
    weightedF1: 0.8072
  },
  cvFolds: [
    { fold: 1, nVal: 39, macroF1: 0.8124, accuracy: 0.8205, macroPrecision: 0.8190, macroRecall: 0.8095 },
    { fold: 2, nVal: 39, macroF1: 0.7945, accuracy: 0.7949, macroPrecision: 0.7980, macroRecall: 0.7920 },
    { fold: 3, nVal: 38, macroF1: 0.7512, accuracy: 0.7632, macroPrecision: 0.7620, macroRecall: 0.7480 },
    { fold: 4, nVal: 38, macroF1: 0.8241, accuracy: 0.8421, macroPrecision: 0.8350, macroRecall: 0.8190 },
    { fold: 5, nVal: 38, macroF1: 0.7420, accuracy: 0.7368, macroPrecision: 0.7490, macroRecall: 0.7380 },
    { fold: 6, nVal: 38, macroF1: 0.8015, accuracy: 0.8158, macroPrecision: 0.8080, macroRecall: 0.7990 },
    { fold: 7, nVal: 38, macroF1: 0.7760, accuracy: 0.7895, macroPrecision: 0.7820, macroRecall: 0.7740 },
    { fold: 8, nVal: 38, macroF1: 0.7890, accuracy: 0.7895, macroPrecision: 0.7910, macroRecall: 0.7880 },
    { fold: 9, nVal: 38, macroF1: 0.8195, accuracy: 0.8158, macroPrecision: 0.8240, macroRecall: 0.8160 },
    { fold: 10, nVal: 38, macroF1: 0.7318, accuracy: 0.7368, macroPrecision: 0.7470, macroRecall: 0.7285 },
  ] as CVFoldResult[],
  confusionMatrix: {
    L: { L: 84, M: 15, H: 2, total: 101, recall: 0.8317 },
    M: { L: 19, M: 131, H: 18, total: 168, recall: 0.7798 },
    H: { L: 1, M: 25, H: 87, total: 113, recall: 0.7699 }
  },
  perClassMetrics: {
    L: { precision: 0.8077, recall: 0.8317, f1: 0.8195, support: 101 },
    M: { precision: 0.7661, recall: 0.7798, f1: 0.7729, support: 168 },
    H: { precision: 0.8131, recall: 0.7699, f1: 0.7909, support: 113 }
  },
  featureImportances: [
    { feature: 'VisITedResources', importance: 0.2285, category: 'behavioural', description: 'Total clicks / accesses on online learning assets' },
    { feature: 'raisedhands', importance: 0.2014, category: 'behavioural', description: 'Frequency of active student classroom inquiries' },
    { feature: 'StudentAbsenceDays', importance: 0.1420, category: 'academic', description: 'Absence classification (<7 vs >=7 days)' },
    { feature: 'AnnouncementsView', importance: 0.1265, category: 'behavioural', description: 'Course announcement inspection frequency' },
    { feature: 'Discussion', importance: 0.0890, category: 'behavioural', description: 'Active participation in course forum discussions' },
    { feature: 'ParentAnsweringSurvey', importance: 0.0540, category: 'academic', description: 'Parental engagement in school surveys' },
    { feature: 'ParentschoolSatisfaction', importance: 0.0385, category: 'academic', description: 'Parental reported satisfaction level' },
    { feature: 'Relation', importance: 0.0290, category: 'academic', description: 'Primary guardian relationship (Mum / Father)' },
    { feature: 'Topic', importance: 0.0270, category: 'academic', description: 'Subject domain (IT, Math, Science, Arabic, etc.)' },
    { feature: 'NationalITy', importance: 0.0210, category: 'demographic', description: 'Learner citizenship origin' },
    { feature: 'GradeID', importance: 0.0150, category: 'demographic', description: 'Educational grade level (G-02 through G-12)' },
    { feature: 'StageID', importance: 0.0115, category: 'demographic', description: 'Schooling phase (Lower, Middle, High)' },
    { feature: 'SectionID', importance: 0.0080, category: 'demographic', description: 'Classroom classroom cohort identifier' },
    { feature: 'Semester', importance: 0.0055, category: 'academic', description: 'Academic term (Fall vs Spring)' },
    { feature: 'gender', importance: 0.0031, category: 'demographic', description: 'Learner biological gender' }
  ] as FeatureImportance[]
};