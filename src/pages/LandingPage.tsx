import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, GraduationCap, ShieldAlert, Volume2, Eye, Mic, Brain } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#111827] text-[#1F2937] dark:text-[#F8FAFC] flex flex-col font-sans">
      {/* Navbar Header */}
      <header className="px-6 lg:px-12 py-4 flex items-center justify-between border-b border-[#CBD5E1] dark:border-slate-800 bg-[#FFFFFF] dark:bg-[#1F2937]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#4F46E5] flex items-center justify-center text-[#FFFFFF] font-bold shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#1F2937] dark:text-[#F8FAFC]">
            Vidya
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-[#64748B] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 rounded-xl transition"
          >
            Student Sign In
          </Link>
          <Link
            to="/teacher-login"
            className="px-4 py-2 text-sm font-semibold bg-[#4F46E5] hover:bg-indigo-700 text-[#FFFFFF] rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Teacher Portal</span>
          </Link>
        </div>
      </header>

      {/* Hero Section - Clean Solid Background, Zero Gradients */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 lg:py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-indigo-400 rounded-full text-xs font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-4 h-4" />
          <span>Vidya prioritizes accessibility over visual complexity</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1F2937] dark:text-[#F8FAFC] tracking-tight max-w-4xl leading-tight">
          A calm digital classroom where <span className="text-[#4F46E5]">every student belongs</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#64748B] dark:text-[#94A3B8] max-w-2xl font-normal leading-relaxed">
          AI-powered inclusive learning platform adapting UI formatting, synchronized audio reading, MathML equations, and teacher-reviewed accessibility content for all learners.
        </p>

        {/* Portal Entry Cards - Flat Solid Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-3xl">
          <Link
            to="/login"
            className="group p-8 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl border border-[#CBD5E1] dark:border-slate-800 shadow-sm hover:border-[#4F46E5] transition text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#3B82F6] flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2937] dark:text-[#F8FAFC]">Student Portal</h2>
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-2">
                Access your personalized courses, synchronized TTS audio reader, AI Tutor, and quizzes.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#4F46E5] group-hover:translate-x-1 transition">
              Enter Student Workspace →
            </span>
          </Link>

          <Link
            to="/teacher-login"
            className="group p-8 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-3xl border border-[#CBD5E1] dark:border-slate-800 shadow-sm hover:border-[#4F46E5] transition text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2937] dark:text-[#F8FAFC]">Teacher Portal</h2>
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mt-2">
                Upload teaching materials (PDF, Video), run AI accessibility conversions, review MathML, and manage student rosters.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#4F46E5] group-hover:translate-x-1 transition">
              Enter Teacher Dashboard →
            </span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl">
          <div className="p-4 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-2xl border border-[#CBD5E1] dark:border-slate-800 text-left shadow-sm">
            <Volume2 className="w-6 h-6 text-[#3B82F6] mb-2" />
            <h3 className="font-bold text-sm text-[#1F2937] dark:text-[#F8FAFC]">Audio Reader</h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">Live word-by-word text highlighting.</p>
          </div>
          <div className="p-4 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-2xl border border-[#CBD5E1] dark:border-slate-800 text-left shadow-sm">
            <Brain className="w-6 h-6 text-[#4F46E5] mb-2" />
            <h3 className="font-bold text-sm text-[#1F2937] dark:text-[#F8FAFC]">AI Tutor</h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">Document-styled answers, simplify & translate.</p>
          </div>
          <div className="p-4 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-2xl border border-[#CBD5E1] dark:border-slate-800 text-left shadow-sm">
            <Mic className="w-6 h-6 text-[#3B82F6] mb-2" />
            <h3 className="font-bold text-sm text-[#1F2937] dark:text-[#F8FAFC]">Voice Navigation</h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">Hands-free voice command routing.</p>
          </div>
          <div className="p-4 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-2xl border border-[#CBD5E1] dark:border-slate-800 text-left shadow-sm">
            <Eye className="w-6 h-6 text-[#4F46E5] mb-2" />
            <h3 className="font-bold text-sm text-[#1F2937] dark:text-[#F8FAFC]">Dyslexia & Themes</h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">OpenDyslexic font, High Contrast, Colorblind.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
