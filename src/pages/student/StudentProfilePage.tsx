import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Link } from 'react-router-dom';
import { User, Sliders, Shield, BookOpen, Award } from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { profile } = useAccessibility();

  return (
    <Shell title="Student Profile & Account">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6">
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-500/30"
          />
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold mt-1">
              Class 9 Student • Vidya Learner
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" /> Active Accessibility Profile Summary
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-slate-400 block font-semibold">Text Scale</span>
              <span className="font-bold text-slate-900 dark:text-white uppercase">{profile.textSize}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-slate-400 block font-semibold">Dyslexia Mode</span>
              <span className="font-bold text-slate-900 dark:text-white">{profile.dyslexiaMode ? 'Enabled' : 'Off'}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <span className="text-slate-400 block font-semibold">Audio Reader</span>
              <span className="font-bold text-slate-900 dark:text-white">{profile.textToSpeech ? 'Active' : 'Off'}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/student/profile/accessibility"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Configure full accessibility preferences →
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  );
};
