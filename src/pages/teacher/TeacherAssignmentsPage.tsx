import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { FileCheck, Calendar, Users, Plus } from 'lucide-react';

export const TeacherAssignmentsPage: React.FC = () => {
  const { assignments } = useData();

  return (
    <Shell title="Assignments & Submissions">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Assignments</h2>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md">
            <Plus className="w-4 h-4" /> Create Assignment
          </button>
        </div>

        <div className="space-y-4">
          {assignments.map((a) => (
            <div
              key={a.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded">
                  {a.courseTitle}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{a.title}</h3>
                <p className="text-xs text-slate-500">{a.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Due: {new Date(a.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white block text-sm">
                    {a.submissionsCount} / {a.totalStudents}
                  </span>
                  <span className="text-slate-400">Submissions</span>
                </div>

                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-100 transition">
                  Review Submissions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
};
