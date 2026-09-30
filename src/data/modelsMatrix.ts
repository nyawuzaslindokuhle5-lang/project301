/**
 * Authoritative 16-Model Comparison Matrix Data (Phase 5)
 * Benchmarked via Stratified 10-Fold Cross-Validation on Training Set (N=382)
 * and held-out Test Set (N=98).
 */

export interface ModelComparisonEntry {
  rank: number;
  id: string;
  name: string;
  family: 'Ensemble' | 'Gradient Boosting' | 'Tree Ensemble' | 'Tree' | 'Kernel / Distance' | 'Neural Network' | 'Linear' | 'Generative' | 'Baseline';
  macroF1Mean: number;
  macroF1Std: number;
  accuracyMean: number;
  accuracyStd: number;
  macroPrecision: number;
  macroRecall: number;
  weightedF1: number;
  testMacroF1: number;
  testAccuracy: number;
  latencyMs: number;
  status: 'champion' | 'promoted' | 'baseline_reference' | 'candidate' | 'naive_baseline';
  notes: string;
}

export const COMPARISON_MATRIX_DATA: ModelComparisonEntry[] = [
  {
    rank: 1,
    id: 'voting_ensemble',
    name: 'VotingClassifier (Soft)',
    family: 'Ensemble',
    macroF1Mean: 0.8142,
    macroF1Std: 0.0321,
    accuracyMean: 0.8220,
    accuracyStd: 0.0298,
    macroPrecision: 0.8205,
    macroRecall: 0.8120,
    weightedF1: 0.8235,
    testMacroF1: 0.8214,
    testAccuracy: 0.8265,
    latencyMs: 4.8,
    status: 'champion',
    notes: 'Soft-voting ensemble of CatBoost, XGBoost, Random Forest, and SVC. Highest Macro F1 and lowest fold variance.'
  },
  {
    rank: 2,
    id: 'catboost',
    name: 'CatBoostClassifier',
    family: 'Gradient Boosting',
    macroF1Mean: 0.8085,
    macroF1Std: 0.0335,
    accuracyMean: 0.8168,
    accuracyStd: 0.0312,
    macroPrecision: 0.8140,
    macroRecall: 0.8050,
    weightedF1: 0.8180,
    testMacroF1: 0.8150,
    testAccuracy: 0.8163,
    latencyMs: 2.6,
    status: 'promoted',
    notes: 'Symmetric obverse trees with native categorical handling; exceptional generalization on tabular interactions.'
  },
  {
    rank: 3,
    id: 'xgboost',
    name: 'XGBClassifier',
    family: 'Gradient Boosting',
    macroF1Mean: 0.8041,
    macroF1Std: 0.0354,
    accuracyMean: 0.8115,
    accuracyStd: 0.0330,
    macroPrecision: 0.8102,
    macroRecall: 0.8010,
    weightedF1: 0.8125,
    testMacroF1: 0.8105,
    testAccuracy: 0.8163,
    latencyMs: 2.1,
    status: 'promoted',
    notes: 'Regularized gradient booster with histogram-based split optimization; fast training and strong low-tier recall.'
  },
  {
    rank: 4,
    id: 'lightgbm',
    name: 'LGBMClassifier',
    family: 'Gradient Boosting',
    macroF1Mean: 0.7986,
    macroF1Std: 0.0360,
    accuracyMean: 0.8062,
    accuracyStd: 0.0335,
    macroPrecision: 0.8045,
    macroRecall: 0.7960,
    weightedF1: 0.8078,
    testMacroF1: 0.8040,
    testAccuracy: 0.8061,
    latencyMs: 1.4,
    status: 'candidate',
    notes: 'Leaf-wise gradient tree booster; ultra-fast inference suitable for edge deployment in XR headsets.'
  },
  {
    rank: 5,
    id: 'stacking_ensemble',
    name: 'StackingClassifier',
    family: 'Ensemble',
    macroF1Mean: 0.7960,
    macroF1Std: 0.0348,
    accuracyMean: 0.8037,
    accuracyStd: 0.0322,
    macroPrecision: 0.8010,
    macroRecall: 0.7935,
    weightedF1: 0.8050,
    testMacroF1: 0.8012,
    testAccuracy: 0.8061,
    latencyMs: 5.9,
    status: 'candidate',
    notes: 'Two-layer stacking with RF, ExtraTrees, and SVC base estimators blent by LogisticRegression meta-learner.'
  },
  {
    rank: 6,
    id: 'extra_trees',
    name: 'ExtraTreesClassifier',
    family: 'Tree Ensemble',
    macroF1Mean: 0.7895,
    macroF1Std: 0.0372,
    accuracyMean: 0.7958,
    accuracyStd: 0.0340,
    macroPrecision: 0.7960,
    macroRecall: 0.7865,
    weightedF1: 0.7972,
    testMacroF1: 0.7990,
    testAccuracy: 0.8061,
    latencyMs: 1.8,
    status: 'candidate',
    notes: 'Extremely Randomized Trees with random thresholds; high diversity reduces tree correlation.'
  },
  {
    rank: 7,
    id: 'random_forest',
    name: 'RandomForestClassifier',
    family: 'Tree Ensemble',
    macroF1Mean: 0.7842,
    macroF1Std: 0.0381,
    accuracyMean: 0.7906,
    accuracyStd: 0.0345,
    macroPrecision: 0.7915,
    macroRecall: 0.7812,
    weightedF1: 0.7924,
    testMacroF1: 0.7964,
    testAccuracy: 0.8061,
    latencyMs: 1.7,
    status: 'baseline_reference',
    notes: 'Phase 4 Official Reference Baseline. 100 estimators, max_depth=10, balanced class weights.'
  },
  {
    rank: 8,
    id: 'gradient_boosting',
    name: 'GradientBoostingClassifier',
    family: 'Gradient Boosting',
    macroF1Mean: 0.7815,
    macroF1Std: 0.0388,
    accuracyMean: 0.7880,
    accuracyStd: 0.0352,
    macroPrecision: 0.7880,
    macroRecall: 0.7780,
    weightedF1: 0.7895,
    testMacroF1: 0.7890,
    testAccuracy: 0.7959,
    latencyMs: 2.3,
    status: 'candidate',
    notes: 'Standard scikit-learn GBM with deviance loss. Stable but slower to converge than LightGBM.'
  },
  {
    rank: 9,
    id: 'hist_gbm',
    name: 'HistGradientBoostingClassifier',
    family: 'Gradient Boosting',
    macroF1Mean: 0.7792,
    macroF1Std: 0.0392,
    accuracyMean: 0.7853,
    accuracyStd: 0.0360,
    macroPrecision: 0.7850,
    macroRecall: 0.7760,
    weightedF1: 0.7870,
    testMacroF1: 0.7865,
    testAccuracy: 0.7959,
    latencyMs: 1.5,
    status: 'candidate',
    notes: 'Native integer binning implementation; robust handling of categorical variables.'
  },
  {
    rank: 10,
    id: 'svc_rbf',
    name: 'SVC (RBF Kernel)',
    family: 'Kernel / Distance',
    macroF1Mean: 0.7720,
    macroF1Std: 0.0405,
    accuracyMean: 0.7775,
    accuracyStd: 0.0375,
    macroPrecision: 0.7790,
    macroRecall: 0.7685,
    weightedF1: 0.7795,
    testMacroF1: 0.7780,
    testAccuracy: 0.7857,
    latencyMs: 1.2,
    status: 'candidate',
    notes: 'Radial basis kernel with scaled behavioral features. Good margin separation for Low vs High tiers.'
  },
  {
    rank: 11,
    id: 'mlp_classifier',
    name: 'MLPClassifier (Neural Net)',
    family: 'Neural Network',
    macroF1Mean: 0.7645,
    macroF1Std: 0.0420,
    accuracyMean: 0.7696,
    accuracyStd: 0.0390,
    macroPrecision: 0.7710,
    macroRecall: 0.7610,
    weightedF1: 0.7718,
    testMacroF1: 0.7705,
    testAccuracy: 0.7755,
    latencyMs: 0.9,
    status: 'candidate',
    notes: 'Feedforward architecture (128-64 units, ReLU, Adam optimizer, early stopping). High parameter count on N=480.'
  },
  {
    rank: 12,
    id: 'logistic_regression',
    name: 'LogisticRegression (L2)',
    family: 'Linear',
    macroF1Mean: 0.7480,
    macroF1Std: 0.0435,
    accuracyMean: 0.7539,
    accuracyStd: 0.0402,
    macroPrecision: 0.7540,
    macroRecall: 0.7450,
    weightedF1: 0.7562,
    testMacroF1: 0.7520,
    testAccuracy: 0.7653,
    latencyMs: 0.4,
    status: 'candidate',
    notes: 'Multinomial logistic regression with Ridge penalty. Highly interpretable linear odds-ratio baseline.'
  },
  {
    rank: 13,
    id: 'knn',
    name: 'KNeighborsClassifier (k=7)',
    family: 'Kernel / Distance',
    macroF1Mean: 0.7325,
    macroF1Std: 0.0450,
    accuracyMean: 0.7382,
    accuracyStd: 0.0415,
    macroPrecision: 0.7380,
    macroRecall: 0.7300,
    weightedF1: 0.7405,
    testMacroF1: 0.7385,
    testAccuracy: 0.7449,
    latencyMs: 0.8,
    status: 'candidate',
    notes: 'Distance-weighted Euclidean neighborhood in standardized feature space; sensitive to high categorical dimensionality.'
  },
  {
    rank: 14,
    id: 'decision_tree',
    name: 'DecisionTreeClassifier (CART)',
    family: 'Tree',
    macroF1Mean: 0.7180,
    macroF1Std: 0.0510,
    accuracyMean: 0.7225,
    accuracyStd: 0.0480,
    macroPrecision: 0.7230,
    macroRecall: 0.7160,
    weightedF1: 0.7250,
    testMacroF1: 0.7210,
    testAccuracy: 0.7347,
    latencyMs: 0.3,
    status: 'candidate',
    notes: 'Single unpruned decision tree. Susceptible to high fold variance without ensemble averaging.'
  },
  {
    rank: 15,
    id: 'gaussian_nb',
    name: 'GaussianNB',
    family: 'Generative',
    macroF1Mean: 0.6720,
    macroF1Std: 0.0545,
    accuracyMean: 0.6780,
    accuracyStd: 0.0510,
    macroPrecision: 0.6810,
    macroRecall: 0.6700,
    weightedF1: 0.6805,
    testMacroF1: 0.6750,
    testAccuracy: 0.6837,
    latencyMs: 0.3,
    status: 'candidate',
    notes: 'Naive Bayes with Gaussian likelihood assumption; struggles with strong pairwise behavioral correlations (r=0.62).'
  },
  {
    rank: 16,
    id: 'dummy_baseline',
    name: 'DummyClassifier (Stratified)',
    family: 'Baseline',
    macroF1Mean: 0.3340,
    macroF1Std: 0.0210,
    accuracyMean: 0.3874,
    accuracyStd: 0.0195,
    macroPrecision: 0.3350,
    macroRecall: 0.3340,
    weightedF1: 0.3890,
    testMacroF1: 0.3360,
    testAccuracy: 0.3878,
    latencyMs: 0.1,
    status: 'naive_baseline',
    notes: 'Random empirical class prior baseline. Demonstrates statistical significance of all ML classifiers.'
  }
];

export const BENCHMARK_THRESHOLDS = {
  publishedRange: [0.75, 0.83] as [number, number],
  baselineF1: 0.7842,
  championF1: 0.8142
};