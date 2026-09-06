import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { BookOpen, UploadCloud, Plus, Eye, Clock } from 'lucide-react';

export const TeacherCoursesPage: React.FC = () => {
  const { courses } = useData();

  return (
    <Shell title="Teacher Course Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Published Courses</h2>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md">
            <Plus className="w-4 h-4" /> Create New Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="h-40 rounded-2xl overflow-hidden relative">
                <img src={c.thumbnailUrl} alt={c.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded">
                  {c.gradeLevel}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{c.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {c.durationMinutes} mins
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/teacher/materials/upload?courseId=${c.id}`}
                    className="px-3.5 py-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold rounded-xl text-xs flex items-center gap-1 hover:bg-purple-100 transition"
                  >
                    <UploadCloud className="w-3.5 h-3.5" /> Upload Material
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
};
