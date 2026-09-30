import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  Activity, 
  Table, 
  Sparkles, 
  UserCheck, 
  Award, 
  GitFork 
} from 'lucide-react';
import { NavigationTab } from '../../types';
import { CheckCheck } from 'lucide-react';
import { FileText } from 'lucide-react';



interface NavigationProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs: Array<{ id: NavigationTab; label: string; icon: React.ReactNode; phase: string }> = [
    { id: 'overview', label: 'Framework Overview', icon: <LayoutDashboard className="w-4 h-4" />, phase: 'P1-Found' },
    { id: 'distribution', label: 'Performance Dist.', icon: <PieChart className="w-4 h-4" />, phase: 'P2-Data' },
    { id: 'behaviour', label: 'Behaviour Analytics', icon: <Activity className="w-4 h-4" />, phase: 'P3-Prep' },
    { id: 'models', label: 'Model Matrix', icon: <Table className="w-4 h-4" />, phase: 'P4/5-Models' },
    { id: 'explainability', label: 'SHAP Explainability', icon: <Sparkles className="w-4 h-4" />, phase: 'P6-SHAP' },
    { id: 'prediction', label: 'Learner Inference', icon: <UserCheck className="w-4 h-4" />, phase: 'P8-API' },
    { id: 'evaluation', label: 'Research Evaluation', icon: <Award className="w-4 h-4" />, phase: 'P10-Eval' },
    { id: 'reproducibility', label: 'Reproducibility & DVC', icon: <GitFork className="w-4 h-4" />, phase: 'P7-Track' },
 { id: 'verification', label: 'Parity & Test Suite', icon: <CheckCheck className="w-4 h-4" />, phase: 'P11-Test' },
  ];


  return (
    <nav className="bg-white border-b border-slate-200 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-3.5 border-b-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
