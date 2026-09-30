import React, { useState } from 'react';
import { 
  Activity, 
  GitFork, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Binary, 
  Info
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { 
  CORRELATION_MATRIX, 
  SCALER_STATS, 
  BEHAVIORAL_HISTOGRAMS 
} from '../data/preprocessing';

export const BehaviourPage: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('raisedhands');
  const [hoveredCorrelation, setHoveredCorrelation] = useState<{ f1: string; f2: string; val: number } | null>(null);

  // Transformation simulator test input
  const [testInputs, setTestInputs] = useState({
    raisedhands: 45,
    VisITedResources: 65,
    AnnouncementsView: 30,
    Discussion: 50,
    gender: 'M',
    StageID: 'MiddleSchool',
    Semester: 'F',
    StudentAbsenceDays: 'Under-7'
  });

  const behavioralKeys = ['raisedhands', 'VisITedResources', 'AnnouncementsView', 'Discussion'];

  const calculateZScore = (feature: string, value: number) => {
    const stats = SCALER_STATS[feature];
    if (!stats || stats.std === 0) return 0;
    return Number(((value - stats.mean) / stats.std).toFixed(3));
  };

  const getCorrelationColor = (val: number) => {
    if (val === 1.0) return 'bg-indigo-600 text-white font-bold';
    if (val >= 0.6) return 'bg-indigo-500/80 text-white font-semibold';
    if (val >= 0.5) return 'bg-indigo-400/70 text-slate-900 font-semibold';
    if (val >= 0.35) return 'bg-indigo-200 text-indigo-900 font-medium';
    return 'bg-slate-100 text-slate-700';
  };

  const featureLabels: Record<string, string> = {
    raisedhands: 'Raised Hands',
    VisITedResources: 'Visited Resources',
    AnnouncementsView: 'Announcements',
    Discussion: 'Discussion Groups'
  };

  const activeHistogram = BEHAVIORAL_HISTOGRAMS[selectedFeature];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phase 3: Preprocessing Pipeline & Behaviour Analytics Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Behavioral Engagement & Preprocessing Architecture
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Leak-free transformation pipeline specification. Features 80/20 stratified partitioning,
              ColumnTransformer feature serialization (OneHotEncoder + StandardScaler), and inter-feature correlation analytics.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-slate-200 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Data Leakage Guard</div>
                <div className="font-semibold text-emerald-300">Fit Exclusively on Train Folds</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-slate-200 flex items-center space-x-3">
              <GitFork className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Stratified Split (80/20)</div>
                <div className="font-mono font-medium text-slate-100">Train: 382 | Test: 98 (Seed: 42)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stratified Partitioning & Leak-Free Principle */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Leak-Free Stratified Partitioning (N = 480)</h2>
            <p className="text-xs text-slate-500">
              Class balance is strictly preserved across both training (80%) and held-out test (20%) partitions
            </p>
          </div>
          <Badge variant="primary">Seed: 42 Reproducible</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Train Partition */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600" />
                <span className="font-bold text-slate-900 text-sm">Training Partition (80%)</span>
              </div>
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                N = 382 records
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Low Tier (L):</span>
                <span className="font-mono font-bold text-slate-800">101 learners (26.44%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-500 h-1.5" style={{ width: '26.44%' }} />
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>Medium Tier (M):</span>
                <span className="font-mono font-bold text-slate-800">168 learners (43.98%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-600 h-1.5" style={{ width: '43.98%' }} />
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>High Tier (H):</span>
                <span className="font-mono font-bold text-slate-800">113 learners (29.58%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-1.5" style={{ width: '29.58%' }} />
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
              <span>StandardScaler Parameters:</span>
              <span className="font-mono text-indigo-700 font-semibold">μ and σ fit on Train only</span>
            </div>
          </div>

          {/* Test Partition */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
                <span className="font-bold text-slate-900 text-sm">Held-Out Test Partition (20%)</span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                N = 98 records
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Low Tier (L):</span>
                <span className="font-mono font-bold text-slate-800">26 learners (26.53%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-500 h-1.5" style={{ width: '26.53%' }} />
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>Medium Tier (M):</span>
                <span className="font-mono font-bold text-slate-800">43 learners (43.88%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-600 h-1.5" style={{ width: '43.88%' }} />
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>High Tier (H):</span>
                <span className="font-mono font-bold text-slate-800">29 learners (29.59%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-1.5" style={{ width: '29.59%' }} />
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
              <span>Evaluation Role:</span>
              <span className="font-mono text-emerald-700 font-semibold">Unseen final model test score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Correlation Matrix & Behavioral Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm">Behavioral Pearson Correlation Matrix (Train Split)</h3>
            </div>
            <Badge variant="info">r ∈ [-1, 1]</Badge>
          </div>

          <p className="text-xs text-slate-500">
            Computed on the leak-free training partition to prevent information leakage:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs">
              <thead>
                <tr>
                  <th className="p-2 text-left text-slate-400 font-medium">Feature</th>
                  {behavioralKeys.map((k) => (
                    <th key={k} className="p-2 font-semibold text-slate-700">{featureLabels[k]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {behavioralKeys.map((rowKey) => (
                  <tr key={rowKey}>
                    <td className="p-2 text-left font-semibold text-slate-800">{featureLabels[rowKey]}</td>
                    {behavioralKeys.map((colKey) => {
                      const val = CORRELATION_MATRIX[rowKey][colKey];
                      return (
                        <td
                          key={colKey}
                          onMouseEnter={() => setHoveredCorrelation({ f1: featureLabels[rowKey], f2: featureLabels[colKey], val })}
                          onMouseLeave={() => setHoveredCorrelation(null)}
                          className="p-1"
                        >
                          <div
                            className={`py-2 px-1 rounded-lg transition-transform hover:scale-105 cursor-pointer font-mono text-xs ${getCorrelationColor(
                              val
                            )}`}
                          >
                            {val.toFixed(2)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hoveredCorrelation && (
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-900 flex items-center justify-between">
              <span className="font-medium">
                {hoveredCorrelation.f1} ↔ {hoveredCorrelation.f2}
              </span>
              <span className="font-mono font-bold text-indigo-700">
                r = {hoveredCorrelation.val.toFixed(4)} ({hoveredCorrelation.val >= 0.6 ? 'Strong Correlation' : hoveredCorrelation.val >= 0.4 ? 'Moderate Correlation' : 'Weak Correlation'})
              </span>
            </div>
          )}

          <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between">
            <span>Highest Association:</span>
            <span className="font-semibold text-slate-800">Raised Hands ↔ Visited Resources (r = 0.62)</span>
          </div>
        </div>

        {/* Feature Scaler Parameters (StandardScaler) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">StandardScaler Training Moments (μ, σ)</h3>
          </div>
          <p className="text-xs text-slate-500">
            For distance and gradient-sensitive models (SVC, Logistic Regression, MLP, KNN), features are standardized via <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-700">z = (x - μ) / σ</code>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {behavioralKeys.map((key) => {
              const s = SCALER_STATS[key];
              return (
                <div key={key} className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 space-y-1.5">
                  <div className="font-semibold text-slate-800">{featureLabels[key]}</div>
                  <div className="grid grid-cols-2 gap-1 text-[11px]">
                    <div>Mean (<span className="font-mono">μ</span>): <span className="font-mono font-bold">{s.mean}</span></div>
                    <div>Std (<span className="font-mono">σ</span>): <span className="font-mono font-bold">{s.std}</span></div>
                    <div>Min: <span className="font-mono">{s.min}</span></div>
                    <div>Max: <span className="font-mono">{s.max}</span></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Tree-Based Model Invariance</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Tree ensembles (Random Forest, Extra Trees, XGBoost, LightGBM) are scale-invariant and split directly on raw interaction thresholds. 
              The pipeline maintains dual routes: scaled for kernels/networks, raw for tree ensembles.
            </p>
          </div>
        </div>
      </div>

      {/* Behavioral Density Explorer by Performance Class */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Behavioral Frequency Distribution Across Performance Tiers</h3>
            <p className="text-xs text-slate-500">
              Examines how engagement levels discriminate Low, Medium, and High performing students
            </p>
          </div>

          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            {behavioralKeys.map((key) => (
              <button
                key={key}
                onClick={() => setSelectedFeature(key)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedFeature === key
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {featureLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <div className="grid grid-cols-5 gap-3">
            {activeHistogram.map((binData) => {
              const maxVal = Math.max(...activeHistogram.flatMap((b) => [b.L, b.M, b.H]));
              return (
                <div key={binData.bin} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <div className="text-center font-mono font-bold text-slate-800 text-xs">{binData.bin}</div>
                  
                  <div className="space-y-1.5 pt-1">
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-rose-600 font-medium">
                        <span>Low (L)</span>
                        <span className="font-mono">{binData.L}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-rose-500 h-1.5" style={{ width: `${(binData.L / maxVal) * 100}%` }} />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-indigo-600 font-medium">
                        <span>Med (M)</span>
                        <span className="font-mono">{binData.M}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-indigo-600 h-1.5" style={{ width: `${(binData.M / maxVal) * 100}%` }} />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-emerald-600 font-medium">
                        <span>High (H)</span>
                        <span className="font-mono">{binData.H}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-600 h-1.5" style={{ width: `${(binData.H / maxVal) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-xs text-slate-600">
            <span className="font-medium text-slate-800">
              Clear Separation Pattern for {featureLabels[selectedFeature]}:
            </span>
            <span>
              Low tier clusters heavily in <strong>0-20</strong>; High tier dominates <strong>61-100</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* Preprocessing Transformation Pipeline Simulator */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Binary className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">Pipeline Transformation Simulator</h3>
              <p className="text-xs text-slate-500">
                Simulate how raw learner records are transformed by ColumnTransformer into ML-ready numerical tensors
              </p>
            </div>
          </div>
          <Badge variant="success">ColumnTransformer Active</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* 1. Raw Input Controls */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>1. Raw Feature Input</span>
              <span className="text-[10px] text-slate-400 font-mono">16 Predictors</span>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-slate-600 flex justify-between">
                  <span>Raised Hands:</span>
                  <span className="font-mono font-bold">{testInputs.raisedhands}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={testInputs.raisedhands}
                  onChange={(e) => setTestInputs({ ...testInputs, raisedhands: Number(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="text-slate-600 flex justify-between">
                  <span>Visited Resources:</span>
                  <span className="font-mono font-bold">{testInputs.VisITedResources}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={testInputs.VisITedResources}
                  onChange={(e) => setTestInputs({ ...testInputs, VisITedResources: Number(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="text-slate-600 flex justify-between">
                  <span>Announcements:</span>
                  <span className="font-mono font-bold">{testInputs.AnnouncementsView}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={testInputs.AnnouncementsView}
                  onChange={(e) => setTestInputs({ ...testInputs, AnnouncementsView: Number(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="text-slate-600 flex justify-between">
                  <span>Discussion:</span>
                  <span className="font-mono font-bold">{testInputs.Discussion}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={testInputs.Discussion}
                  onChange={(e) => setTestInputs({ ...testInputs, Discussion: Number(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500">Gender:</label>
                  <select
                    value={testInputs.gender}
                    onChange={(e) => setTestInputs({ ...testInputs, gender: e.target.value })}
                    className="w-full p-1 rounded border border-slate-200 bg-white text-xs mt-0.5"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-500">Absence:</label>
                  <select
                    value={testInputs.StudentAbsenceDays}
                    onChange={(e) => setTestInputs({ ...testInputs, StudentAbsenceDays: e.target.value })}
                    className="w-full p-1 rounded border border-slate-200 bg-white text-xs mt-0.5"
                  >
                    <option value="Under-7">Under-7</option>
                    <option value="Above-7">Above-7</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Scaled Numerical Outputs (Z-Scores) */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>2. StandardScaler (Z-Scores)</span>
              <span className="text-[10px] text-indigo-600 font-mono">z = (x - μ) / σ</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">z(raisedhands)</div>
                  <div className="text-[10px] text-slate-400 font-mono">(val - 46.40) / 25.37</div>
                </div>
                <span className="font-mono text-sm font-bold text-indigo-700">
                  {calculateZScore('raisedhands', testInputs.raisedhands) > 0 ? '+' : ''}
                  {calculateZScore('raisedhands', testInputs.raisedhands)}
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">z(VisITedResources)</div>
                  <div className="text-[10px] text-slate-400 font-mono">(val - 52.45) / 27.09</div>
                </div>
                <span className="font-mono text-sm font-bold text-indigo-700">
                  {calculateZScore('VisITedResources', testInputs.VisITedResources) > 0 ? '+' : ''}
                  {calculateZScore('VisITedResources', testInputs.VisITedResources)}
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">z(AnnouncementsView)</div>
                  <div className="text-[10px] text-slate-400 font-mono">(val - 39.28) / 23.93</div>
                </div>
                <span className="font-mono text-sm font-bold text-indigo-700">
                  {calculateZScore('AnnouncementsView', testInputs.AnnouncementsView) > 0 ? '+' : ''}
                  {calculateZScore('AnnouncementsView', testInputs.AnnouncementsView)}
                </span>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">z(Discussion)</div>
                  <div className="text-[10px] text-slate-400 font-mono">(val - 39.70) / 21.98</div>
                </div>
                <span className="font-mono text-sm font-bold text-indigo-700">
                  {calculateZScore('Discussion', testInputs.Discussion) > 0 ? '+' : ''}
                  {calculateZScore('Discussion', testInputs.Discussion)}
                </span>
              </div>
            </div>
          </div>

          {/* 3. OneHotEncoder Tensor Representation */}
          <div className="space-y-3 p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 text-xs">
            <div className="font-bold flex items-center justify-between text-indigo-300">
              <span>3. Encoded Vector Slice</span>
              <span className="text-[10px] font-mono text-slate-400">OneHot + Scaled</span>
            </div>

            <div className="font-mono text-[11px] bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1 overflow-x-auto">
              <div className="text-slate-400">// Scaled continuous features (4):</div>
              <div className="text-emerald-400">
                [{calculateZScore('raisedhands', testInputs.raisedhands)}, {calculateZScore('VisITedResources', testInputs.VisITedResources)}, {calculateZScore('AnnouncementsView', testInputs.AnnouncementsView)}, {calculateZScore('Discussion', testInputs.Discussion)}]
              </div>

              <div className="text-slate-400 pt-2">// One-Hot encoded categorical slice:</div>
              <div className="text-indigo-400">
                gender_M: {testInputs.gender === 'M' ? '1' : '0'}, gender_F: {testInputs.gender === 'F' ? '1' : '0'}
              </div>
              <div className="text-indigo-400">
                absence_Under-7: {testInputs.StudentAbsenceDays === 'Under-7' ? '1' : '0'}, absence_Above-7: {testInputs.StudentAbsenceDays === 'Above-7' ? '1' : '0'}
              </div>
              <div className="text-slate-400 pt-1">... total 58 one-hot expanded columns</div>
            </div>

            <div className="text-[11px] text-slate-300">
              Ready to feed directly into Phase 4: <strong>Random Forest Baseline Classifier</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};