import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AccessRestrictedPage: React.FC = () => {
  const { role } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-md">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            403 Access Restricted
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You don’t have authorization permissions to access this area. Student and Teacher scopes are strictly separated.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            to={role === 'teacher' ? '/teacher' : '/student'}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to {role === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
