import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses, processingJobs, materials, classes } = useData();

  const pendingReviewJobs = processingJobs.filter((j) => j.status === 'ready_for_review');

  return (
    <Shell title="Teacher Workspace Dashboard">
      <div className="space-y-8">
        {/* Header Hero - Flat Solid Primary Indigo #4F46E5 */}
        <section className="p-6 sm:p-8 bg-[#4F46E5] rounded-3xl text-[#FFFFFF] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-purple-300" />
              <span>Teacher Identity • {user?.department}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Dr. Priya Sharma'}
            </h2>
            <p className="text-sm text-indigo-100">
              Upload teaching materials, review AI generated accessibility conversions, and monitor class progress.
            </p>
          </div>

          <Link
            to="/teacher/materials/upload"
            className="px-6 py-3.5 bg-[#FFFFFF] text-[#4F46E5] font-extrabold rounded-2xl shadow-sm hover:bg-indigo-50 transition shrink-0 flex items-center gap-2 text-sm"
          >
            <UploadCloud className="w-5 h-5 text-[#4F46E5]" />
            <span>Upload Teaching Material</span>
          </Link>
        </section>

        {/* Pending Review Alert Banner */}
        {pendingReviewJobs.length > 0 && (
          <div className="p-5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#F59E0B] text-white rounded-2xl shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-amber-950 dark:text-amber-200">
                  {pendingReviewJobs.length} AI Accessibility Conversion Ready for Review
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-400 mt-0.5">
                  Review generated MathML, alt text, and transcripts for "{pendingReviewJobs[0].resourceTitle}"
                </p>
              </div>
            </div>

            <Link
              to={`/teacher/materials/${pendingReviewJobs[0].resourceId}/review`}
              className="px-5 py-2.5 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm shrink-0"
            >
              <span>Open Review Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Top Operational Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl border border-[#CBD5E1] dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
              Active Courses
            </span>
            <span className="text-3xl font-black text-[#1F2937] dark:text-[#F8FAFC]">
              {courses.length}
            </span>
            <span className="text-[11px] text-[#22C55E] font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Published
            </span>
          </div>

          <div className="p-5 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl border border-[#CBD5E1] dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
              Enrolled Students
            </span>
            <span className="text-3xl font-black text-[#1F2937] dark:text-[#F8FAFC]">128</span>
            <span className="text-[11px] text-[#64748B]">Across {classes.length} Class Rosters</span>
          </div>

          <div className="p-5 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl border border-[#CBD5E1] dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
              Materials Converted
            </span>
            <span className="text-3xl font-black text-[#1F2937] dark:text-[#F8FAFC]">
              {materials.length}
            </span>
            <span className="text-[11px] text-[#4F46E5] font-semibold">AI Pipeline Ready</span>
          </div>

          <div className="p-5 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl border border-[#CBD5E1] dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
              Pending Review
            </span>
            <span className="text-3xl font-black text-[#F59E0B]">
              {pendingReviewJobs.length}
            </span>
            <span className="text-[11px] text-[#F59E0B] font-semibold">Teacher Approval</span>
          </div>
        </div>

        {/* Active Courses & Materials Quick Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-[#F8FAFC]">Course Management</h3>
              <Link
                to="/teacher/courses"
                className="text-xs font-bold text-[#4F46E5] hover:underline"
              >
                Manage all courses
              </Link>
            </div>

            <div className="space-y-4">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl p-5 border border-[#CBD5E1] dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={c.thumbnailUrl}
                      alt={c.title}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                        {c.gradeLevel}
                      </span>
                      <h4 className="font-extrabold text-base text-[#1F2937] dark:text-[#F8FAFC] mt-1">
                        {c.title}
                      </h4>
                      <p className="text-xs text-[#64748B]">{c.modules.length} Modules • {c.durationMinutes} mins</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link
                      to={`/teacher/materials/upload?courseId=${c.id}`}
                      className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950 text-[#4F46E5] font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-indigo-100 transition"
                    >
                      <UploadCloud className="w-4 h-4" /> Upload Material
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Recent Uploads */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1F2937] dark:text-[#F8FAFC]">Recent Upload Jobs</h3>

            <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl p-5 border border-[#CBD5E1] dark:border-slate-800 shadow-sm space-y-3">
              {materials.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1F2937] dark:text-[#F8FAFC] line-clamp-1">
                      {m.title}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        m.accessibilityStatus === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {m.accessibilityStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#64748B]">{m.courseTitle}</p>

                  {m.accessibilityStatus === 'ready_for_review' && (
                    <Link
                      to={`/teacher/materials/${m.id}/review`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4F46E5] hover:underline pt-1"
                    >
                      Open Accessibility Review Console →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
