import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Sparkles, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

export const StudentLogin: React.FC = () => {
  const { loginAsStudent } = useAuth();
  const { profile } = useAccessibility();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex@vidya.edu');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsStudent();

    // Check if First-Login Accessibility Assessment is completed or skipped
    if (!profile.assessmentCompleted && !profile.assessmentSkipped) {
      navigate('/student/assessment');
    } else {
      navigate('/student');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold mx-auto shadow-lg shadow-indigo-500/30">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Student Sign In</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access your personalized learning environment & AI Tutor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Student Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-indigo-500 focus:outline-none text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-indigo-500 focus:outline-none text-sm font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>Sign In as Alex (Student)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Teacher?{' '}
            <button
              onClick={() => navigate('/teacher-login')}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              Sign in to Teacher Portal
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
