import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { Play, CheckCircle2, Clock, BookOpen, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams();
  const { courses } = useData();

  const course = courses.find((c) => c.id === courseId) || courses[0];

  return (
    <Shell title={course.title}>
      <div className="space-y-8">
        <Link
          to="/student/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Courses
        </Link>

        {/* Hero Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-96 h-60 rounded-2xl overflow-hidden relative shrink-0">
            <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold">
                {course.subject}
              </span>
              <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold">
                {course.gradeLevel}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {course.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {course.description}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span>Instructor: {course.teacherName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {course.durationMinutes} minutes total
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to={`/student/courses/${course.id}/lessons/${course.modules[0]?.lessons[0]?.id || 'les_math_1'}`}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Learning / Resume Lesson</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Modules & Lesson Syllabus */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Course Modules & Lessons</h2>

          {course.modules.map((mod, modIdx) => (
            <div
              key={mod.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-6 space-y-4"
            >
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center text-xs font-extrabold">
                  {modIdx + 1}
                </span>
                <span>{mod.title}</span>
              </h3>

              <div className="space-y-2">
                {mod.lessons.map((les) => (
                  <Link
                    key={les.id}
                    to={`/student/courses/${course.id}/lessons/${les.id}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition group border border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      {les.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Play className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {les.title}
                        </p>
                        <span className="text-xs text-slate-400">
                          {les.durationMinutes} mins • {les.contentType.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition">
                      Open Lesson →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
};
