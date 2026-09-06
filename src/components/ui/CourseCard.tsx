import React from 'react';
import { Link } from 'react-router-dom';

type Course = {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  subject?: string;
  progressPercent?: number;
};

export const CourseCard: React.FC<{ course: Course; to?: string }> = ({ course, to }) => {
  return (
    <Link
      to={to || `/student/courses/${course.id}`}
      className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#CBD5E1] dark:border-slate-800 p-4 shadow-sm hover:border-[#4F46E5] transition flex flex-col justify-between space-y-3 group"
    >
      <div className="h-32 rounded-xl overflow-hidden relative">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
        {course.subject && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded-md">
            {course.subject}
          </span>
        )}
      </div>

      <div>
        <h4 className="font-bold text-sm text-[#1F2937] dark:text-[#F8FAFC] line-clamp-1">{course.title}</h4>
        {course.description && (
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 line-clamp-2">{course.description}</p>
        )}
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8]">
          <span>Progress</span>
          <span className="font-bold text-[#4F46E5]">{course.progressPercent ?? 0}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: `${course.progressPercent ?? 0}%` }}></div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
