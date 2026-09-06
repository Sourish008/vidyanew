import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowRight, AlertCircle } from 'lucide-react';

export const TeacherLogin: React.FC = () => {
  const { loginAsTeacher } = useAuth();
  const navigate = useNavigate();
  const [teacherId, setTeacherId] = useState('T-1082');
  const [password, setPassword] = useState('••••••••••••');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    (async () => {
      const success = await loginAsTeacher(teacherId, password);
      if (success) {
        navigate('/teacher');
      } else {
        setErrorMsg('Invalid credentials. Please verify your Teacher ID.');
      }
    })();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-bold mx-auto shadow-lg shadow-purple-500/30">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Teacher Portal Sign In</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage course materials, review AI accessibility outputs, and view rosters
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Teacher ID Number
            </label>
            <input
              type="text"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              placeholder="e.g. T-1082"
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-purple-500 focus:outline-none text-sm font-medium"
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
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-purple-500 focus:outline-none text-sm font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>Sign In as Dr. Priya Sharma (Teacher)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Student?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
            >
              Sign in to Student Portal
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
