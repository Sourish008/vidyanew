import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { AccessibilityIndicator } from '../../components/accessibility/AccessibilityIndicator';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Sparkles, CheckCircle2, Clock, Award, Sliders } from 'lucide-react';
import { CourseCard } from '../../components/ui/CourseCard';
import { QuickActions } from '../../components/ui/QuickActions';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses } = useData();
  const { profile } = useAccessibility();

  const activeCourse = courses[0];

  return (
    <Shell title="Student Dashboard">
      <div className="space-y-8">
        {/* Compact Hero Banner - Flat Solid Primary Indigo #4F46E5 */}
        <section className="relative overflow-hidden p-6 sm:p-8 bg-[#4F46E5] rounded-3xl text-[#FFFFFF] shadow-sm">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Inclusive AI Classroom</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Good morning, {user?.name || 'Alex'} 👋
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base font-normal">
              Ready to learn? Continue where you left off in Algebra or ask your AI Tutor for assistance.
            </p>

            <AccessibilityIndicator />
          </div>
        </section>

        {/* First-Login Accessibility Assessment Banner / Retake Button */}
        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#4F46E5] text-white rounded-2xl shrink-0 shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#1F2937] dark:text-[#F8FAFC]">
                First-Login Accessibility Test & Personalization
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                {profile.assessmentCompleted
                  ? 'Your accessibility profile is personalized. You can retake the assessment test anytime.'
                  : 'Take the 8-question test to let Vidya customize audio reading, text scaling, and accessibility tools.'}
              </p>
            </div>
          </div>

          <Link
            to="/student/assessment"
            className="px-5 py-2.5 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm shrink-0 transition"
          >
            <span>{profile.assessmentCompleted ? 'Retake Assessment Test' : 'Start Accessibility Test'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <QuickActions />

        {/* Primary Element: CONTINUE LEARNING CARD */}
        {activeCourse && (
          <section aria-label="Primary Learning Task">
            <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl p-6 border border-[#CBD5E1] dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-6 items-center">
              <div className="w-full lg:w-72 h-48 rounded-2xl overflow-hidden relative shrink-0">
                <img
                  src={activeCourse.thumbnailUrl}
                  alt={activeCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#111827]/40 flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/90 text-[#4F46E5] shadow-md">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
                    Continue Learning
                  </span>
                  <span className="text-xs text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 15 mins left in lesson
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] dark:text-[#F8FAFC]">
                    {activeCourse.title}
                  </h3>
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
                    Chapter 4 — Quadratic Formula & Discriminant Analysis
                  </p>
                </div>

                {/* Solid Progress Bar (Zero Gradients) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#1F2937] dark:text-[#F8FAFC]">
                    <span>Course Progress</span>
                    <span>{activeCourse.progressPercent}% Completed</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4F46E5] rounded-full transition-all duration-500"
                      style={{ width: `${activeCourse.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    to={`/student/courses/${activeCourse.id}/lessons/les_math_1`}
                    className="px-6 py-3 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition"
                  >
                    <span>Resume Lesson</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Two-Column Grid: Recommended Courses & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1F2937] dark:text-[#F8FAFC]">
                Enrolled & Recommended Courses
              </h3>
              <Link
                to="/student/courses"
                className="text-xs font-bold text-[#4F46E5] hover:underline"
              >
                View all ({courses.length})
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl p-6 border border-[#CBD5E1] dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-base font-bold text-[#1F2937] dark:text-[#F8FAFC]">
                  Learning Milestone
                </h3>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-amber-800 dark:text-amber-300">
                  <span>Level 4 Scholar</span>
                  <span>450 / 500 XP</span>
                </div>
                <div className="w-full h-2.5 bg-amber-200 dark:bg-amber-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '90%' }}></div>
                </div>
                <p className="text-[11px] text-amber-700 dark:text-amber-400">
                  ⚡ Complete 1 more lesson to reach Level 5!
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
                  Recent Activity Timeline
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1F2937] dark:text-[#F8FAFC]">
                        Algebra Quiz completed (84%)
                      </p>
                      <span className="text-[#64748B] text-[10px]">Yesterday</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1F2937] dark:text-[#F8FAFC]">
                        Physics Energy video watched
                      </p>
                      <span className="text-[#64748B] text-[10px]">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
