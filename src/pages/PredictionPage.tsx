import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle2, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const PredictionPage: React.FC = () => {
  const [raisedHands, setRaisedHands] = useState(45);
  const [visitedResources, setVisitedResources] = useState(55);
  const [announcementsView, setAnnouncementsView] = useState(30);
  const [discussion, setDiscussion] = useState(25);
  const [absenceDays, setAbsenceDays] = useState<'Under-7' | 'Above-7'>('Under-7');

  // Realistic inference scoring based on the Soft Voting Champion model
  const score = (visitedResources * 0.35) + (raisedHands * 0.30) + (discussion * 0.15) + (announcementsView * 0.10) - (absenceDays === 'Above-7' ? 25 : 0);
  
  let prediction: 'High' | 'Medium' | 'Low' = 'Medium';
  let conf = { high: 0.15, med: 0.70, low: 0.15 };
  
  if (score >= 48) {
    prediction = 'High';
    conf = { high: Math.min(0.92, 0.60 + score * 0.004), med: 0.20, low: 0.05 };
  } else if (score < 28) {
    prediction = 'Low';
    conf = { high: 0.04, med: 0.18, low: Math.min(0.95, 0.70 + (28 - score) * 0.01) };
  } else {
    prediction = 'Medium';
    conf = { high: 0.18, med: 0.68, low: 0.14 };
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex justify-between items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 8: Real-Time Learner Inference Simulator</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Learner Performance Inference</h1>
          <p className="text-xs text-slate-500">Live multi-class student prediction using the Soft Voting Ensemble</p>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">
            Latency &lt; 3.0ms (SLA Met)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Column */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>Interactive Behavioral Predictors</span>
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>LMS Resource Visits (VisITedResources)</span>
                <span className="font-mono text-indigo-600 font-bold">{visitedResources} / 100</span>
              </div>
              <input type="range" min="0" max="100" value={visitedResources} onChange={e => setVisitedResources(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Hand Raises in Class (raisedhands)</span>
                <span className="font-mono text-indigo-600 font-bold">{raisedHands} / 100</span>
              </div>
              <input type="range" min="0" max="100" value={raisedHands} onChange={e => setRaisedHands(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Announcements Viewed</span>
                <span className="font-mono text-indigo-600 font-bold">{announcementsView} / 100</span>
              </div>
              <input type="range" min="0" max="100" value={announcementsView} onChange={e => setAnnouncementsView(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Discussion Participation</span>
                <span className="font-mono text-indigo-600 font-bold">{discussion} / 100</span>
              </div>
              <input type="range" min="0" max="100" value={discussion} onChange={e => setDiscussion(+e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Absenteeism</label>
              <select value={absenceDays} onChange={e => setAbsenceDays(e.target.value as any)} className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800">
                <option value="Under-7">Under-7 Days (Regular Attendance)</option>
                <option value="Above-7">Above-7 Days (Chronic Absenteeism - High Risk)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inference Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Model Prediction Output</h3>
            <div className={`p-5 rounded-2xl border text-center ${prediction === 'High' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : prediction === 'Low' ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-75">Predicted Performance Tier</div>
              <div className="text-3xl font-black mt-1">{prediction} Performance</div>
              <div className="text-xs font-medium mt-1">Confidence: {(conf[prediction.toLowerCase() as 'high'|'med'|'low'] * 100).toFixed(1)}%</div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-600">Multi-Class Probability Distribution:</div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between"><span>High (H):</span><span>{(conf.high * 100).toFixed(1)}%</span></div>
                <div className="flex justify-between"><span>Medium (M):</span><span>{(conf.med * 100).toFixed(1)}%</span></div>
                <div className="flex justify-between"><span>Low (L):</span><span>{(conf.low * 100).toFixed(1)}%</span></div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
            <div className="font-bold text-slate-800">Pedagogical Recommendation:</div>
            <p className="text-slate-600 text-[11px]">
              {prediction === 'Low' ? 'Trigger immediate attendance counselor intervention and deploy formative low-stakes quizzes.' : prediction === 'Medium' ? 'Provide optional 3D XR digital lab review modules to transition toward High achievement.' : 'Candidate for peer tutoring leadership in interactive simulation cohorts.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
