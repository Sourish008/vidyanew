import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { BarChart3, TrendingUp, Users, CheckCircle2, Award } from 'lucide-react';

export const TeacherAnalyticsPage: React.FC = () => {
  return (
    <Shell title="Teacher Analytics & Learning Performance">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Average Quiz Mastery Rate
            </span>
            <span className="text-4xl font-black text-indigo-600">82.4%</span>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +4.2% from last week
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Accessibility Material Usage
            </span>
            <span className="text-4xl font-black text-purple-600">94.1%</span>
            <p className="text-xs text-slate-500">Audio reader & MathML active</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              AI Tutor Queries
            </span>
            <span className="text-4xl font-black text-emerald-600">312</span>
            <p className="text-xs text-slate-500">Algebra & Physics questions</p>
          </div>
        </div>

        {/* Visual Performance Charts Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" /> Class Performance & Struggling Topics
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Algebraic Polynomial Roots</span>
                <span className="text-emerald-600">84% Mastery</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Discriminant Complex Roots (Δ &lt; 0)</span>
                <span className="text-amber-600">58% Mastery (Needs Review)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Kinetic Energy Transformation</span>
                <span className="text-indigo-600">76% Mastery</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
