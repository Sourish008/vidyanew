import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { Users, Shield, CheckCircle2, Award } from 'lucide-react';

export const TeacherStudentsPage: React.FC = () => {
  const { classes, sharedAccommodations } = useData();

  return (
    <Shell title="Class Rosters & Student Accommodations">
      <div className="space-y-8">
        {/* Class Rosters Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-md">
                  {c.grade}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {c.studentCount} Students Enrolled
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{c.name}</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span>Average Class Progress</span>
                  <span className="text-purple-600">{c.averageProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${c.averageProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student Accommodations Summary Privacy Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Student-Shared Accommodation Summaries
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Below are student-permissioned accommodation summaries. Students retain control over sharing permissions.
          </p>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {sharedAccommodations.map((item) => (
              <div
                key={item.studentId}
                className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.studentName}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.sharedAccommodations.map((acc, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold"
                      >
                        ✓ {acc}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-lg shrink-0">
                  {item.enabled ? 'Sharing Granted' : 'Sharing Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
};
