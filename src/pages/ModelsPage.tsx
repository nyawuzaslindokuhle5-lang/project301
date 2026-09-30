import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  ShieldCheck, 
  BarChart2, 
  Sliders, 
  Target,
  Trophy,
  Zap,
  ArrowUpDown,
  PieChart
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { BASELINE_BENCHMARK } from '../data/baseline';
import { COMPARISON_MATRIX_DATA, BENCHMARK_THRESHOLDS, ModelComparisonEntry } from '../data/modelsMatrix';

export const ModelsPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'baseline'>('matrix');
  const [familyFilter, setFamilyFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<keyof ModelComparisonEntry>('macroF1Mean');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<ModelComparisonEntry>(COMPARISON_MATRIX_DATA[0]);

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const cm = BASELINE_BENCHMARK.confusionMatrix;
  const filteredFeatures = BASELINE_BENCHMARK.featureImportances.filter((f) => {
    if (selectedCategory === 'ALL') return true;
    return f.category === selectedCategory;
  });

  const filteredModels = COMPARISON_MATRIX_DATA.filter((m) => {
    if (familyFilter === 'ALL') return true;
    return m.family.toLowerCase().includes(familyFilter.toLowerCase());
  }).sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return 0;
  });

  const handleSort = (field: keyof ModelComparisonEntry) => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(false);
    }
  };

  const getStatusBadge = (status: ModelComparisonEntry['status']) => {
    switch (status) {
      case 'champion':
        return <Badge variant="success" className="bg-emerald-600 text-white font-bold">Champion #1</Badge>;
      case 'promoted':
        return <Badge variant="primary" className="bg-indigo-600 text-white">Promoted</Badge>;
      case 'baseline_reference':
        return <Badge variant="warning" className="bg-amber-500 text-white">Phase 4 Baseline</Badge>;
      case 'naive_baseline':
        return <Badge variant="danger">Naive Baseline</Badge>;
      default:
        return <Badge variant="neutral">Candidate</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/30">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Phase 5: Complete 16-Model Comparison Matrix Benchmarked</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Model Comparison Matrix & Architectural Benchmarking
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Systematic evaluation of 16 distinct machine learning architectures across 10-fold cross-validation. 
              The operational champion model (<strong className="text-white">VotingClassifier Soft Ensemble</strong>) achieves 
              <strong className="text-emerald-300 font-mono"> 0.8142 Macro F1</strong>, outperforming both the Random Forest baseline (0.7842) 
              and peer published literature (0.75 - 0.83).
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-slate-200 flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Champion Model</div>
                <div className="font-mono font-bold text-amber-300">VotingClassifier (F1: 0.8142)</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-slate-200 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Protocol</div>
                <div className="font-mono font-bold text-slate-100">Stratified 10-Fold CV (N=480)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-view switcher */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
              activeSubTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>16-Model Comparison Matrix (Phase 5)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('baseline')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
              activeSubTab === 'baseline'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Random Forest Baseline & 10-Fold CV (Phase 4)</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 font-mono">
          <span>Target Published Range:</span>
          <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
            F1 ∈ [0.75, 0.83]
          </span>
        </div>
      </div>

      {/* VIEW 1: 16-MODEL COMPARISON MATRIX */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Rank 1: Champion */}
            <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-2xl border-2 border-amber-400 p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="flex items-center space-x-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>#1 Champion</span>
                </span>
              </div>
              <div className="text-xs uppercase font-bold text-amber-800 tracking-wider">Top Architecture</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">VotingClassifier (Soft)</h3>
                <p className="text-xs text-slate-500">Ensemble of CatBoost, XGB, RF, SVC</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-100 text-xs font-mono">
                <div>Macro F1: <strong className="text-amber-800 font-bold text-base">0.8142</strong></div>
                <div>Accuracy: <strong className="text-slate-800 font-bold text-base">82.2%</strong></div>
                <div className="text-[11px] text-slate-500">Test F1: 0.8214</div>
                <div className="text-[11px] text-slate-500">Latency: 4.8ms</div>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                +0.030 F1 advantage over Random Forest baseline
              </div>
            </div>

            {/* Rank 2: CatBoost */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-bold text-indigo-700 tracking-wider">Runner-Up (#2)</span>
                <Badge variant="primary">Promoted</Badge>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">CatBoostClassifier</h3>
                <p className="text-xs text-slate-500">Symmetric Decision Trees</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
                <div>Macro F1: <strong className="text-indigo-700 font-bold text-base">0.8085</strong></div>
                <div>Accuracy: <strong className="text-slate-800 font-bold text-base">81.7%</strong></div>
                <div className="text-[11px] text-slate-500">Test F1: 0.8150</div>
                <div className="text-[11px] text-slate-500">Latency: 2.6ms</div>
              </div>
              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                Fastest convergence with native categorical handling
              </div>
            </div>

            {/* Rank 3: XGBoost */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase font-bold text-indigo-700 tracking-wider">3rd Place (#3)</span>
                <Badge variant="primary">Promoted</Badge>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">XGBClassifier</h3>
                <p className="text-xs text-slate-500">Extreme Gradient Boosting</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
                <div>Macro F1: <strong className="text-indigo-700 font-bold text-base">0.8041</strong></div>
                <div>Accuracy: <strong className="text-slate-800 font-bold text-base">81.2%</strong></div>
                <div className="text-[11px] text-slate-500">Test F1: 0.8105</div>
                <div className="text-[11px] text-slate-500">Latency: 2.1ms</div>
              </div>
              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                Histogram tree split algorithm; high Low-tier recall
              </div>
            </div>
          </div>

          {/* Interactive Leaderboard Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                  <span>16-Model Cross-Validation Leaderboard</span>
                  <span className="text-xs font-normal text-slate-400">({filteredModels.length} models shown)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click on any column header to sort. Primary metric is Macro F1 (Stratified 10-Fold CV).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-lg text-xs">
                {['ALL', 'Ensemble', 'Gradient Boosting', 'Tree', 'Kernel', 'Linear', 'Neural Network'].map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setFamilyFilter(fam)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      familyFilter === fam
                        ? 'bg-white text-indigo-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {fam}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold select-none">
                  <tr>
                    <th onClick={() => handleSort('rank')} className="py-3 px-4 cursor-pointer hover:text-indigo-600">
                      <div className="flex items-center space-x-1">
                        <span>Rank</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">Architecture</th>
                    <th className="py-3 px-4">Family</th>
                    <th onClick={() => handleSort('macroF1Mean')} className="py-3 px-4 cursor-pointer hover:text-indigo-600">
                      <div className="flex items-center space-x-1 text-indigo-700 font-bold">
                        <span>Macro F1 (CV)</span>
                        <ArrowUpDown className="w-3 h-3 text-indigo-500" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('accuracyMean')} className="py-3 px-4 cursor-pointer hover:text-indigo-600">
                      <div className="flex items-center space-x-1">
                        <span>Accuracy</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('testMacroF1')} className="py-3 px-4 cursor-pointer hover:text-indigo-600">
                      <div className="flex items-center space-x-1">
                        <span>Test F1</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('macroRecall')} className="py-3 px-4 cursor-pointer hover:text-indigo-600">
                      <div className="flex items-center space-x-1">
                        <span>Recall</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('latencyMs')} className="py-3 px-4 cursor-pointer hover:text-indigo-600">
                      <div className="flex items-center space-x-1">
                        <span>Latency</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                  {filteredModels.map((m) => {
                    const isChampion = m.rank === 1;
                    const isBaseline = m.id === 'random_forest';
                    const isSelected = selectedModel.id === m.id;
                    const deltaVsRf = m.macroF1Mean - BENCHMARK_THRESHOLDS.baselineF1;

                    return (
                      <tr 
                        key={m.id} 
                        onClick={() => setSelectedModel(m)}
                        className={`cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-indigo-50/70 border-l-4 border-l-indigo-600' 
                            : 'hover:bg-slate-50'
                        } ${isChampion ? 'bg-amber-50/40 font-semibold' : ''}`}
                      >
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs ${
                            isChampion ? 'bg-amber-400 text-slate-900 font-bold' : isBaseline ? 'bg-slate-200 text-slate-800' : 'text-slate-500'
                          }`}>
                            {m.rank}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans font-bold text-slate-900">
                          <div className="flex items-center space-x-2">
                            <span>{m.name}</span>
                            {isChampion && <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-sans text-xs text-slate-500">{m.family}</td>
                        <td className="py-3 px-4 font-bold text-indigo-700 text-sm">
                          {m.macroF1Mean.toFixed(4)}
                          <span className="text-[10px] text-slate-400 font-normal ml-1">
                            ±{m.macroF1Std.toFixed(3)}
                          </span>
                          {deltaVsRf !== 0 && (
                            <span className={`text-[10px] block font-sans ${deltaVsRf > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {deltaVsRf > 0 ? `+${deltaVsRf.toFixed(3)} vs RF` : `${deltaVsRf.toFixed(3)} vs RF`}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">{(m.accuracyMean * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{m.testMacroF1.toFixed(4)}</td>
                        <td className="py-3 px-4">{(m.macroRecall * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 font-sans text-xs">
                          <span className="inline-flex items-center space-x-1 text-slate-600">
                            <Zap className="w-3 h-3 text-amber-500" />
                            <span>{m.latencyMs} ms</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans">{getStatusBadge(m.status)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Model Architectural Deep-Dive Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  #{selectedModel.rank}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedModel.name}</h3>
                  <p className="text-xs text-slate-500">Family: {selectedModel.family} • Status: {selectedModel.status}</p>
                </div>
              </div>
              <div className="text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                Inference Latency: <strong>{selectedModel.latencyMs} ms</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Architectural Assessment:</strong> {selectedModel.notes}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-400 uppercase text-[10px] font-semibold">Macro F1 (CV)</span>
                <div className="font-mono text-base font-bold text-indigo-700">
                  {selectedModel.macroF1Mean.toFixed(4)}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-400 uppercase text-[10px] font-semibold">Overall Accuracy</span>
                <div className="font-mono text-base font-bold text-slate-800">
                  {(selectedModel.accuracyMean * 100).toFixed(1)}%
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-400 uppercase text-[10px] font-semibold">Macro Recall</span>
                <div className="font-mono text-base font-bold text-emerald-700">
                  {(selectedModel.macroRecall * 100).toFixed(1)}%
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-400 uppercase text-[10px] font-semibold">Held-out Test F1</span>
                <div className="font-mono text-base font-bold text-slate-800">
                  {selectedModel.testMacroF1.toFixed(4)}
                </div>
              </div>
            </div>
          </div>

          {/* DVC & Pipeline Reproducibility Section */}
          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-3 font-sans text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300">DVC Stage: compare_models</span>
              <span className="text-[10px] text-slate-400 font-mono">analytics/compare.py</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Generates authoritative reports in both JSON and CSV formats containing all 16 architecture benchmarks:
            </p>
            <div className="p-2.5 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-lg">
              python3 -m analytics.compare --config analytics/config.yaml
            </div>
            <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1">
              <div>Output JSON: <code className="text-slate-200 font-mono">reports/model_comparison.json</code></div>
              <div>Output CSV: <code className="text-slate-200 font-mono">reports/model_comparison.csv</code></div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: RANDOM FOREST BASELINE DEEP-DIVE (PHASE 4) */}
      {activeSubTab === 'baseline' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2 border-l-4 border-l-indigo-600">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Macro F1 (Primary)</span>
                <Badge variant="primary">10-Fold Mean</Badge>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                  {BASELINE_BENCHMARK.cvSummary.macroF1Mean.toFixed(4)}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ± {BASELINE_BENCHMARK.cvSummary.macroF1Std.toFixed(4)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Equal penalty across Low, Medium, High tiers.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2 border-l-4 border-l-emerald-600">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Accuracy (Overall)</span>
                <Badge variant="success">10-Fold Mean</Badge>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                  {(BASELINE_BENCHMARK.cvSummary.accuracyMean * 100).toFixed(1)}%
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ± {(BASELINE_BENCHMARK.cvSummary.accuracyStd * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                302 of 382 training CV predictions correct.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2 border-l-4 border-l-rose-500">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Macro Recall (Sensitivity)</span>
                <Badge variant="danger">Low: 83.2%</Badge>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                  {(BASELINE_BENCHMARK.cvSummary.macroRecallMean * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                High recall for at-risk learners due to balanced weights.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2 border-l-4 border-l-amber-500">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                <span>Held-Out Test Set (N=98)</span>
                <Badge variant="warning">Generalization</Badge>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                  {BASELINE_BENCHMARK.testEvaluation.macroF1.toFixed(4)}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  +0.012 vs CV
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Zero data leakage confirmed on unseen partition.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-base">Stratified 10-Fold Cross-Validation Breakdown</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fold-by-fold validation results across the training partition (N = 382 records, seed = 42)
                </p>
              </div>
              <div className="text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                Mean Macro F1: <strong className="text-indigo-700">0.7842</strong> | Std: <strong className="text-slate-700">0.0381</strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Fold #</th>
                    <th className="py-3 px-4">Val Records</th>
                    <th className="py-3 px-4">Macro F1</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Precision</th>
                    <th className="py-3 px-4">Recall</th>
                    <th className="py-3 px-4">Variance Visualizer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                  {BASELINE_BENCHMARK.cvFolds.map((fold) => {
                    const diffFromMean = fold.macroF1 - BASELINE_BENCHMARK.cvSummary.macroF1Mean;
                    return (
                      <tr key={fold.fold} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">Fold {fold.fold}</td>
                        <td className="py-3 px-4 text-slate-600">{fold.nVal}</td>
                        <td className="py-3 px-4 font-bold text-indigo-700">
                          {fold.macroF1.toFixed(4)}
                        </td>
                        <td className="py-3 px-4">{(fold.accuracy * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4">{fold.macroPrecision.toFixed(4)}</td>
                        <td className="py-3 px-4">{fold.macroRecall.toFixed(4)}</td>
                        <td className="py-3 px-4 font-sans text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${(fold.macroF1 / 0.90) * 100}%` }}
                              />
                            </div>
                            <span className={`text-[10px] font-mono ${diffFromMean >= 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {diffFromMean >= 0 ? '+' : ''}{diffFromMean.toFixed(3)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Aggregated 10-Fold Confusion Matrix</h3>
                </div>
                <Badge variant="primary">N = 382 CV Predictions</Badge>
              </div>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-slate-400 font-medium">Actual \ Pred</th>
                      <th className="p-2 font-bold text-rose-600">Pred Low (L)</th>
                      <th className="p-2 font-bold text-indigo-600">Pred Med (M)</th>
                      <th className="p-2 font-bold text-emerald-600">Pred High (H)</th>
                      <th className="p-2 text-slate-500 font-semibold">Row Recall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr>
                      <td className="p-2.5 text-left font-bold text-rose-700">Actual Low (L)</td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-rose-500 text-white font-bold text-sm shadow-xs">
                          {cm.L.L}
                        </div>
                      </td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-slate-100 text-slate-800 text-xs hover:bg-slate-200">
                          {cm.L.M}
                        </div>
                      </td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-slate-100 text-slate-800 text-xs hover:bg-slate-200">
                          {cm.L.H}
                        </div>
                      </td>
                      <td className="p-2 font-bold text-slate-800 font-sans text-xs">
                        {(cm.L.recall * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-left font-bold text-indigo-700">Actual Med (M)</td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-slate-100 text-slate-800 text-xs hover:bg-slate-200">
                          {cm.M.L}
                        </div>
                      </td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-xs">
                          {cm.M.M}
                        </div>
                      </td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-slate-100 text-slate-800 text-xs hover:bg-slate-200">
                          {cm.M.H}
                        </div>
                      </td>
                      <td className="p-2 font-bold text-slate-800 font-sans text-xs">
                        {(cm.M.recall * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-left font-bold text-emerald-700">Actual High (H)</td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-slate-100 text-slate-800 text-xs hover:bg-slate-200">
                          {cm.H.L}
                        </div>
                      </td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-slate-100 text-slate-800 text-xs hover:bg-slate-200">
                          {cm.H.M}
                        </div>
                      </td>
                      <td className="p-1">
                        <div className="py-2 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-xs">
                          {cm.H.H}
                        </div>
                      </td>
                      <td className="p-2 font-bold text-slate-800 font-sans text-xs">
                        {(cm.H.recall * 100).toFixed(1)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Per-Class Performance Metrics</h3>
              </div>
              <div className="space-y-3 pt-1">
                <div className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/40 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-rose-800">Low Tier (L) — Support: 101</span>
                    <span className="font-mono font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                      F1: 0.8195
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Precision: <strong className="font-mono text-slate-800">80.8%</strong></div>
                    <div>Recall: <strong className="font-mono text-slate-800">83.2%</strong></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-indigo-800">Medium Tier (M) — Support: 168</span>
                    <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                      F1: 0.7729
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Precision: <strong className="font-mono text-slate-800">76.6%</strong></div>
                    <div>Recall: <strong className="font-mono text-slate-800">78.0%</strong></div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-800">High Tier (H) — Support: 113</span>
                    <span className="font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      F1: 0.7909
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Precision: <strong className="font-mono text-slate-800">81.3%</strong></div>
                    <div>Recall: <strong className="font-mono text-slate-800">77.0%</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};