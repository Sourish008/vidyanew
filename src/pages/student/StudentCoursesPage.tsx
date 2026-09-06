import React, { useState } from 'react';
import { Shell } from '../../components/layout/Shell';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

export const StudentCoursesPage: React.FC = () => {
  const { courses } = useData();
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredCourses = courses.filter((c) => {
    const matchesSubject = subjectFilter === 'all' || c.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <Shell title="My Courses & Discovery">
      <div className="space-y-6">
        {/* Search & Filter Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses by keyword..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {['all', 'Mathematics', 'Science', 'Computer Science', 'English'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubjectFilter(sub)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  subjectFilter === sub
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {sub === 'all' ? 'All Subjects' : sub}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/student/courses/${course.id}`}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-indigo-500 hover:shadow-xl transition flex flex-col justify-between group"
            >
              <div className="h-44 relative">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold rounded-lg">
                  {course.gradeLevel}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-md">
                  {course.difficulty}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {/* Accessibility Badges */}
                  <div className="flex flex-wrap gap-1">
                    {course.accessibilityBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course.durationMinutes} mins
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {course.progressPercent}% Completed
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${course.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
};
