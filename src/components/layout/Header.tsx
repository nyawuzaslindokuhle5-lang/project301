import React from 'react';
import { Layers, ShieldCheck, Database, GitBranch } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">SEB-XRIF</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono font-medium">v0.1.0-MVP</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Scalable, Evidence-Based XR Integration Framework
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <div className="hidden md:flex items-center space-x-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <GitBranch className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-mono">seed: 42 (reproducible)</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Database className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-mono">xAPI: 480 / 16 predictors</span>
            </div>
            <Badge variant="success" className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              <span>Phase 6: TreeSHAP & XAI Complete</span>
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};