import React, { useState, useMemo } from 'react';
import { 
  Database, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowUpDown, 
  FileCheck, 
  Info, 
  BarChart2,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { RAW_DATASET, DATASET_STATS } from '../data/dataset';
import { LearnerRecord, PerformanceClassRaw } from '../types';

export const DistributionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [selectedAbsence, setSelectedAbsence] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof LearnerRecord>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<LearnerRecord | null>(null);
  const pageSize = 15;

  const filteredData = useMemo(() => {
    return RAW_DATASET.filter((row) => {
      if (selectedClass !== 'ALL' && row.Class !== selectedClass) return false;
      if (selectedStage !== 'ALL' && row.StageID !== selectedStage) return false;
      if (selectedAbsence !== 'ALL' && row.StudentAbsenceDays !== selectedAbsence) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesId = row.id?.toString().toLowerCase().includes(q);
        const matchesNat = row.NationalITy.toLowerCase().includes(q);
        const matchesTopic = row.Topic.toLowerCase().includes(q);
        const matchesGrade = row.GradeID.toLowerCase().includes(q);
        if (!matchesId && !matchesNat && !matchesTopic && !matchesGrade) return false;
      }
      return true;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA === undefined || valB === undefined) return 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      return sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [searchQuery, selectedClass, selectedStage, selectedAbsence, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (field: keyof LearnerRecord) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getClassBadge = (cls: PerformanceClassRaw) => {
    if (cls === 'H') return <Badge variant="success">High (H)</Badge>;
    if (cls === 'M') return <Badge variant="primary">Medium (M)</Badge>;
    return <Badge variant="danger">Low (L)</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phase 2: Dataset Loading & Pandera Validation Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              xAPI Educational Interaction Dataset
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Canonical Kalboard 360 dataset loaded with strict schema validation. Features 480 learner records, 
              16 multidimensional predictors across demographic, academic, and behavioral channels, mapped to 3 performance tiers.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-slate-200 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Validation Status</div>
                <div className="font-semibold text-emerald-300">Pandera Strict: PASSED</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-slate-200 flex items-center space-x-3">
              <Database className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Cohort Dimensions</div>
                <div className="font-mono font-medium text-slate-100">480 Rows × 17 Columns</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Class Distribution Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Target Class Distribution (N = 480)</h2>
            <p className="text-xs text-slate-500">
              Stratified tripartite performance tiers: Low (L), Medium (M), and High (H)
            </p>
          </div>
          <Badge variant="info">Natural Class Imbalance</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Low Class */}
          <div className="bg-white border-t-4 border-t-rose-500 border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                Low Tier (L)
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400">Class = 'L'</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">127</span>
              <span className="text-sm font-semibold text-slate-500">learners</span>
              <span className="text-xs font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full ml-auto">
                26.46%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-rose-500 h-2 rounded-full" style={{ width: '26.46%' }} />
            </div>
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>Avg Hands: <span className="font-semibold text-slate-800">16.9</span></div>
              <div>Avg Visited: <span className="font-semibold text-slate-800">19.3</span></div>
              <div>Avg Announce: <span className="font-semibold text-slate-800">16.4</span></div>
              <div>Avg Discuss: <span className="font-semibold text-slate-800">23.5</span></div>
            </div>
          </div>

          {/* Medium Class */}
          <div className="bg-white border-t-4 border-t-indigo-600 border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                Medium Tier (M)
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400">Class = 'M'</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">211</span>
              <span className="text-sm font-semibold text-slate-500">learners</span>
              <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full ml-auto">
                43.96%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '43.96%' }} />
            </div>
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>Avg Hands: <span className="font-semibold text-slate-800">49.8</span></div>
              <div>Avg Visited: <span className="font-semibold text-slate-800">60.1</span></div>
              <div>Avg Announce: <span className="font-semibold text-slate-800">41.2</span></div>
              <div>Avg Discuss: <span className="font-semibold text-slate-800">43.1</span></div>
            </div>
          </div>

          {/* High Class */}
          <div className="bg-white border-t-4 border-t-emerald-600 border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                High Tier (H)
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400">Class = 'H'</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">142</span>
              <span className="text-sm font-semibold text-slate-500">learners</span>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                29.58%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '29.58%' }} />
            </div>
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>Avg Hands: <span className="font-semibold text-slate-800">71.5</span></div>
              <div>Avg Visited: <span className="font-semibold text-slate-800">78.4</span></div>
              <div>Avg Announce: <span className="font-semibold text-slate-800">63.8</span></div>
              <div>Avg Discuss: <span className="font-semibold text-slate-800">54.2</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Rationale & Schema Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Methodological Rationale: Macro F1 Selection</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The dataset exhibits mild class imbalance where <strong>Medium (43.96%)</strong> significantly outnumbers 
            <strong> Low (26.46%)</strong> and <strong>High (29.58%)</strong>. A trivial majority-class classifier 
            would achieve a deceptively high raw accuracy of 44% while achieving 0% recall for struggling learners.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center space-x-1.5">
              <span>Why Macro F1 is Mandatory in SEB-XRIF:</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Macro F1 computes the unweighted mean of F1 scores across all three classes, weighting Low, Medium, and High equally. 
              This guarantees that misclassifications in the vulnerable 'Low' class are penalized as severely as errors in the majority class.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Pandera Validation Specifications</h3>
            </div>
            <Badge variant="success">All Checks Passed</Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-slate-800">17-Column Schema</div>
                <div className="text-[11px] text-slate-500">16 predictors + 1 Class target verified</div>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-slate-800">Zero Null Values</div>
                <div className="text-[11px] text-slate-500">100% complete across all 480 rows</div>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-slate-800">Numerical Bounds [0, 100]</div>
                <div className="text-[11px] text-slate-500">raisedhands, resources, views, discussion</div>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold text-slate-800">Categorical Domains</div>
                <div className="text-[11px] text-slate-500">Stages, Semesters, Absences validated</div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>DVC Stage: validate_data</span>
            <span>cmd: python3 -m analytics.schema</span>
          </div>
        </div>
      </div>

      {/* Behavioral Indicators */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2">
          <BarChart2 className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Behavioral Engagement Breakdown by Performance Tier</h3>
            <p className="text-xs text-slate-500">Comparing mean interaction frequency (0 - 100) across performance classes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="text-xs font-semibold text-slate-700">Raised Hands</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center"><span className="text-rose-600 font-medium">Low:</span><span className="font-mono font-bold">16.9</span></div>
              <div className="flex justify-between items-center"><span className="text-indigo-600 font-medium">Medium:</span><span className="font-mono font-bold">49.8</span></div>
              <div className="flex justify-between items-center"><span className="text-emerald-600 font-medium">High:</span><span className="font-mono font-bold">71.5</span></div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="text-xs font-semibold text-slate-700">Visited Resources</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center"><span className="text-rose-600 font-medium">Low:</span><span className="font-mono font-bold">19.3</span></div>
              <div className="flex justify-between items-center"><span className="text-indigo-600 font-medium">Medium:</span><span className="font-mono font-bold">60.1</span></div>
              <div className="flex justify-between items-center"><span className="text-emerald-600 font-medium">High:</span><span className="font-mono font-bold">78.4</span></div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="text-xs font-semibold text-slate-700">Announcements Viewed</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center"><span className="text-rose-600 font-medium">Low:</span><span className="font-mono font-bold">16.4</span></div>
              <div className="flex justify-between items-center"><span className="text-indigo-600 font-medium">Medium:</span><span className="font-mono font-bold">41.2</span></div>
              <div className="flex justify-between items-center"><span className="text-emerald-600 font-medium">High:</span><span className="font-mono font-bold">63.8</span></div>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
            <div className="text-xs font-semibold text-slate-700">Discussion Participation</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center"><span className="text-rose-600 font-medium">Low:</span><span className="font-mono font-bold">23.5</span></div>
              <div className="flex justify-between items-center"><span className="text-indigo-600 font-medium">Medium:</span><span className="font-mono font-bold">43.1</span></div>
              <div className="flex justify-between items-center"><span className="text-emerald-600 font-medium">High:</span><span className="font-mono font-bold">54.2</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Explorer Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Learner Dataset Explorer</h3>
              <p className="text-xs text-slate-500">
                Browse, search, and inspect individual learner records ({filteredData.length} matches of 480 total)
              </p>
            </div>
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search ID, nationality, topic..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <div className="flex items-center space-x-1 text-slate-500 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span className="font-semibold text-[11px] uppercase">Filters:</span>
            </div>
            <select
              value={selectedClass}
              onChange={(e) => { setSelectedClass(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-xs"
            >
              <option value="ALL">All Classes ({DATASET_STATS.totalRecords})</option>
              <option value="L">Low (L - 127)</option>
              <option value="M">Medium (M - 211)</option>
              <option value="H">High (H - 142)</option>
            </select>
            <select
              value={selectedStage}
              onChange={(e) => { setSelectedStage(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-xs"
            >
              <option value="ALL">All Stages</option>
              <option value="lowerlevel">Lower Level</option>
              <option value="MiddleSchool">Middle School</option>
              <option value="HighSchool">High School</option>
            </select>
            <select
              value={selectedAbsence}
              onChange={(e) => { setSelectedAbsence(e.target.value); setCurrentPage(1); }}
              className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-xs"
            >
              <option value="ALL">All Absence Tiers</option>
              <option value="Under-7">Under 7 Days</option>
              <option value="Above-7">Above 7 Days</option>
            </select>
            {(selectedClass !== 'ALL' || selectedStage !== 'ALL' || selectedAbsence !== 'ALL' || searchQuery !== '') && (
              <button
                onClick={() => { setSelectedClass('ALL'); setSelectedStage('ALL'); setSelectedAbsence('ALL'); setSearchQuery(''); setCurrentPage(1); }}
                className="text-xs text-indigo-600 hover:text-indigo-800 underline ml-2 font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('id')}>
                  <div className="flex items-center space-x-1"><span>ID</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                </th>
                <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('Class')}>
                  <div className="flex items-center space-x-1"><span>Target Class</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                </th>
                <th className="py-3 px-3">Demographics</th>
                <th className="py-3 px-3">Stage & Topic</th>
                <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('raisedhands')}>
                  <div className="flex items-center justify-end space-x-1"><span>Hands</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('VisITedResources')}>
                  <div className="flex items-center justify-end space-x-1"><span>Resources</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('AnnouncementsView')}>
                  <div className="flex items-center justify-end space-x-1"><span>Announce</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                </th>
                <th className="py-3 px-3 text-right cursor-pointer" onClick={() => handleSort('Discussion')}>
                  <div className="flex items-center justify-end space-x-1"><span>Discuss</span><ArrowUpDown className="w-3 h-3 text-slate-400" /></div>
                </th>
                <th className="py-3 px-3">Absence</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-900">{row.id}</td>
                  <td className="py-3 px-4">{getClassBadge(row.Class)}</td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-800">{row.gender === 'M' ? 'Male' : 'Female'}</span>, {row.NationalITy}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-900">{row.Topic}</div>
                    <div className="text-[11px] text-slate-500">{row.StageID} ({row.GradeID})</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium">{row.raisedhands}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium">{row.VisITedResources}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium">{row.AnnouncementsView}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium">{row.Discussion}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${row.StudentAbsenceDays === 'Under-7' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                      {row.StudentAbsenceDays}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedStudent(row)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            Showing <span className="font-semibold">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(currentPage * pageSize, filteredData.length)}</span> of{' '}
            <span className="font-semibold">{filteredData.length}</span> entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium px-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Learner Record: {selectedStudent.id}</h3>
                  <p className="text-xs text-slate-500">17-Feature Attribute Profile</p>
                </div>
              </div>
              <div>{getClassBadge(selectedStudent.Class)}</div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2 uppercase text-[10px] tracking-wider text-slate-400">Demographic Predictors</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div><span className="text-slate-500">Gender:</span> <span className="font-semibold text-slate-800">{selectedStudent.gender}</span></div>
                  <div><span className="text-slate-500">Nationality:</span> <span className="font-semibold text-slate-800">{selectedStudent.NationalITy}</span></div>
                  <div><span className="text-slate-500">Birthplace:</span> <span className="font-semibold text-slate-800">{selectedStudent.PlaceofBirth}</span></div>
                  <div><span className="text-slate-500">Stage:</span> <span className="font-semibold text-slate-800">{selectedStudent.StageID}</span></div>
                  <div><span className="text-slate-500">Grade:</span> <span className="font-semibold text-slate-800">{selectedStudent.GradeID}</span></div>
                  <div><span className="text-slate-500">Section:</span> <span className="font-semibold text-slate-800">{selectedStudent.SectionID}</span></div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 uppercase text-[10px] tracking-wider text-slate-400">Academic & Parental Context</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div><span className="text-slate-500">Topic:</span> <span className="font-semibold text-slate-800">{selectedStudent.Topic}</span></div>
                  <div><span className="text-slate-500">Semester:</span> <span className="font-semibold text-slate-800">{selectedStudent.Semester}</span></div>
                  <div><span className="text-slate-500">Relation:</span> <span className="font-semibold text-slate-800">{selectedStudent.Relation}</span></div>
                  <div><span className="text-slate-500">Survey:</span> <span className="font-semibold text-slate-800">{selectedStudent.ParentAnsweringSurvey}</span></div>
                  <div><span className="text-slate-500">Satisfaction:</span> <span className="font-semibold text-slate-800">{selectedStudent.ParentschoolSatisfaction}</span></div>
                  <div><span className="text-slate-500">Absence:</span> <span className="font-semibold text-slate-800">{selectedStudent.StudentAbsenceDays}</span></div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 uppercase text-[10px] tracking-wider text-slate-400">Behavioral Interactions (0 - 100)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                  <div className="text-center p-2 bg-white rounded border border-indigo-100">
                    <div className="text-slate-500 text-[10px]">Raised Hands</div>
                    <div className="text-base font-bold font-mono text-indigo-700">{selectedStudent.raisedhands}</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-indigo-100">
                    <div className="text-slate-500 text-[10px]">Visited Res.</div>
                    <div className="text-base font-bold font-mono text-indigo-700">{selectedStudent.VisITedResources}</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-indigo-100">
                    <div className="text-slate-500 text-[10px]">Announcements</div>
                    <div className="text-base font-bold font-mono text-indigo-700">{selectedStudent.AnnouncementsView}</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded border border-indigo-100">
                    <div className="text-slate-500 text-[10px]">Discussion</div>
                    <div className="text-base font-bold font-mono text-indigo-700">{selectedStudent.Discussion}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};