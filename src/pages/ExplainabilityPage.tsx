import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  UserCheck, 
  Compass, 
  ShieldCheck
} from 'lucide-react';
import { 
  GLOBAL_SHAP_FEATURES, 
  PERMUTATION_IMPORTANCES, 
  LOCAL_ARCHETYPES, 
  LocalArchetypeCase
} from '../data/explainability';

export const ExplainabilityPage: React.FC = () => {
  const [metricMode, setMetricMode] = useState<'shap' | 'permutation'>('shap');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCase, setSelectedCase] = useState<LocalArchetypeCase>(LOCAL_ARCHETYPES[0]);

  const filteredShap = GLOBAL_SHAP_FEATURES.filter((f) => {
    if (selectedCategory === 'ALL') return true;
    return f.category === selectedCategory;
  });

  const filteredPerm = PERMUTATION_IMPORTANCES.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    const item = GLOBAL_SHAP_FEATURES.find(g => g.feature === p.feature);
    return item?.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Phase 6: Explainable AI (TreeSHAP & Permutation Importance)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Model Interpretability & Pedagogical Explainability
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              TreeSHAP polynomial decomposition uncovers global feature drivers and local individual student predictions.
              By establishing game-theoretic Shapley values, SEB-XRIF provides transparent, verifiable reasoning for automated
              XR pedagogical interventions without black-box opacity.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-slate-200 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Algorithm</div>
                <div className="font-mono font-bold text-slate-100">Exact TreeSHAP (Lundberg et al.)</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-slate-200 flex items-center space-x-3">
              <Compass className="w-5 h-5 text-indigo-300" />
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Attribution Basis</div>
                <div className="font-mono font-bold text-indigo-200">16 Features • 480 Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fairness & Attribution Distribution Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            63%
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Behavioural Domain Dominance</h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
              VisITedResources, raisedhands, and announcements account for <strong>62.8%</strong> of total decision weight.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start space-x-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
            28%
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Academic & Attendance Factors</h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
              Absences and parental involvement account for <strong>28.4%</strong> of predictive attribution.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start space-x-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            9%
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Demographic Fairness Shield</h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">
              Nationality, gender, and stage account for only <strong>8.8%</strong>, confirming minimal demographic bias.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: GLOBAL FEATURE IMPORTANCE (SHAP & PERMUTATION) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">Global Feature Importance & Attribution</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Quantifying the overall influence of each predictor across the full student cohort
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setMetricMode('shap')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  metricMode === 'shap'
                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                TreeSHAP (Mean |SHAP|)
              </button>
              <button
                onClick={() => setMetricMode('permutation')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  metricMode === 'permutation'
                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Permutation (F1 Loss)
              </button>
            </div>

            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg text-xs">
              {['ALL', 'behavioural', 'academic', 'demographic'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 font-medium rounded-md capitalize transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-indigo-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {metricMode === 'shap' ? (
            filteredShap.map((item) => {
              const maxVal = 0.30;
              const widthPct = Math.min(100, (item.meanAbsShap / maxVal) * 100);

              return (
                <div key={item.feature} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-slate-400 text-[11px] w-5">#{item.rank}</span>
                      <span className="font-bold text-slate-900">{item.feature}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${
                          item.category === 'behavioural'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                            : item.category === 'academic'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[11px] text-slate-500 hidden sm:inline">{item.description}</span>
                      <span className="font-mono font-bold text-indigo-700 text-sm">
                        {item.meanAbsShap.toFixed(4)} <span className="text-[10px] text-slate-400 font-normal">|SHAP|</span>
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        item.category === 'behavioural'
                          ? 'bg-indigo-600'
                          : item.category === 'academic'
                          ? 'bg-amber-500'
                          : 'bg-slate-500'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            filteredPerm.map((item) => {
              const maxVal = 0.11;
              const widthPct = Math.min(100, (item.f1Drop / maxVal) * 100);

              return (
                <div key={item.feature} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-slate-400 text-[11px] w-5">#{item.rank}</span>
                      <span className="font-bold text-slate-900">{item.feature}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-rose-600 text-sm">
                        -{item.f1Drop.toFixed(4)} <span className="text-[10px] text-slate-400 font-normal">±{item.f1DropStd.toFixed(4)} Macro F1</span>
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-2.5 rounded-full bg-rose-500 transition-all duration-300"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* SECTION 2: LOCAL SHAP WATERFALL DECOMPOSITION FOR INDIVIDUAL LEARNERS */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">Local Student SHAP Waterfall Decomposition</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Explain why a specific student received their performance prediction (Base Value $E[f(x)] \to f(x)$)
            </p>
          </div>

          <div className="flex space-x-2">
            {LOCAL_ARCHETYPES.map((c) => (
              <button
                key={c.caseId}
                onClick={() => setSelectedCase(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedCase.caseId === c.caseId
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {c.name.split(':')[0]} ({c.predicted})
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm">{selectedCase.name}</span>
              <span className="font-mono text-xs text-slate-400">[{selectedCase.caseId}]</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <div>Ground Truth: <strong className="font-mono text-slate-800">{selectedCase.groundTruth}</strong></div>
              <div>Model Prediction: <strong className="font-mono text-indigo-700 font-bold">{selectedCase.predicted}</strong></div>
              <div>Model Confidence: <strong className="font-mono text-emerald-700">{(selectedCase.confidence * 100).toFixed(1)}%</strong></div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono bg-white px-3 py-2 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px]">Base E[f(x)]</span>
              <span className="font-bold text-slate-700">{selectedCase.baseValue.toFixed(3)}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Predicted f(x)</span>
              <span className="font-bold text-indigo-700 text-sm">{selectedCase.outputValue.toFixed(3)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Shapley Force Vectors (Pushing & Pulling Prediction)
          </h4>

          <div className="space-y-2">
            {selectedCase.shapContributions.map((c) => {
              const isRisk = c.direction === 'increases_risk' || c.direction === 'negative';
              const magnitude = Math.abs(c.shapValue);
              const maxMagnitude = 0.25;
              const barWidth = Math.min(100, (magnitude / maxMagnitude) * 100);

              return (
                <div key={c.feature} className="p-3 bg-white border border-slate-100 rounded-lg hover:border-slate-300 transition-colors space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div className="flex items-center space-x-2">
                      {isRisk ? (
                        <TrendingDown className="w-4 h-4 text-rose-500 shrink-0" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      <span className="font-bold text-slate-800">{c.feature}</span>
                      <span className="text-slate-500 font-mono text-[11px]">({c.value})</span>
                    </div>

                    <div className="flex items-center space-x-2 font-mono">
                      <span className={`font-bold ${isRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {c.shapValue > 0 ? `+${c.shapValue.toFixed(3)}` : c.shapValue.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">{c.interpretation}</p>

                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${isRisk ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs sm:text-sm">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Prescriptive XR Pedagogical Intervention:</span>
          </div>
          <p className="text-xs text-indigo-950 leading-relaxed">
            {selectedCase.interventionRecommended}
          </p>
        </div>
      </div>
    </div>
  );
};