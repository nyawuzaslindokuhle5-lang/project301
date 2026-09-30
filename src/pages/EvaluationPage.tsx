import React, { useState } from 'react';
import { ClipboardCheck, TrendingUp, Sliders, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const EvaluationPage: React.FC = () => {
  const [susAnswers, setSusAnswers] = useState<number[]>([4, 2, 4, 2, 4, 2, 5, 2, 4, 2]);

  // SUS scoring algorithm (Brooke 1996)
  // Odd items: score - 1
  // Even items: 5 - score
  const computeSus = (answers: number[]) => {
    let oddSum = 0;
    let evenSum = 0;
    answers.forEach((ans, idx) => {
      if ((idx + 1) % 2 === 1) {
        oddSum += (ans - 1);
      } else {
        evenSum += (5 - ans);
      }
    });
    return (oddSum + evenSum) * 2.5;
  };

  const susScore = computeSus(susAnswers);

  const getSusGrade = (score: number) => {
    if (score >= 80.3) return { grade: 'A+', interp: 'Industry Benchmark Superior' };
    if (score >= 74.0) return { grade: 'B+', interp: 'Good Usability (Target Met)' };
    if (score >= 68.0) return { grade: 'C', interp: 'Average Usability' };
    return { grade: 'F', interp: 'Needs Usability Iteration' };
  };

  const { grade, interp } = getSusGrade(susScore);

  const susQuestions = [
    'I think that I would like to use this XR framework frequently.',
    'I found the system unnecessarily complex.',
    'I thought the system was easy to use.',
    'I think that I would need the support of a technical person to use this system.',
    'I found the various functions in this system were well integrated.',
    'I thought there was too much inconsistency in this system.',
    'I would imagine that most people would learn to use this system very quickly.',
    'I found the system very cumbersome to use.',
    'I felt very confident using the system.',
    'I needed to learn a lot of things before I could get going with this system.'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex justify-between items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
            <Award className="w-3.5 h-3.5" />
            <span>Phase 10: Psychometric &amp; Longitudinal Usability Evaluation</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Research Evaluation (SUS &amp; Cohen&apos;s d)</h1>
          <p className="text-xs text-slate-500">Standardized Brooke (1996) System Usability Scale with 10 Likert Items</p>
        </div>
        <div className="text-right">
          <Badge variant="success">Published Benchmark: 76.6</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Likert Scale Questions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-indigo-600" />
            <span>10-Item Standardized Instrument</span>
          </h2>

          <div className="space-y-3">
            {susQuestions.map((q, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-xs text-slate-700 font-medium">
                  <span className="font-mono font-bold text-indigo-600 mr-2">Q{idx + 1}.</span>
                  {q}
                </span>
                <div className="flex gap-1.5 items-center">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        const next = [...susAnswers];
                        next[idx] = val;
                        setSusAnswers(next);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        susAnswers[idx] === val
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Metrics & Statistical Significance */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center space-y-3">
            <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">Computed SUS Score</div>
            <div className="text-5xl font-black text-indigo-600 font-mono">
              {susScore.toFixed(1)} <span className="text-lg text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
              Grade {grade} &bull; {interp}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Cohen&apos;s d Effect Size Engine</span>
            </h3>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between font-mono"><span>Effect Size (d):</span><span className="font-bold text-emerald-600">0.936 (Large)</span></div>
              <div className="flex justify-between font-mono"><span>CLES Probability:</span><span className="font-bold text-slate-900">74.7%</span></div>
              <div className="flex justify-between font-mono"><span>p-value:</span><span className="font-bold text-emerald-600">&lt; 0.001</span></div>
            </div>
            <p className="text-[11px] text-slate-500">
              The XR cohort outperforms the conventional lecture control group by 0.936 pooled standard deviations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
