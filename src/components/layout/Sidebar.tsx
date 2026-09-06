import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  Bot,
  HelpCircle,
  FolderOpen,
  Bookmark,
  Sliders,
  LayoutDashboard,
  UploadCloud,
  Users,
  FileCheck,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role } = useAuth();

  const studentLinks = [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/student/courses', label: 'My Courses', icon: BookOpen },
    { to: '/student/ai-tutor', label: 'AI Tutor Workspace', icon: Bot, badge: 'AI' },
    { to: '/student/quizzes', label: 'Quizzes & Practice', icon: HelpCircle },
    { to: '/student/resources', label: 'Learning Resources', icon: FolderOpen },
    { to: '/student/notes', label: 'Saved Study Notes', icon: Bookmark },
    { to: '/student/profile/accessibility', label: 'Accessibility Preferences', icon: Sliders },
  ];

  const teacherLinks = [
    { to: '/teacher', label: 'Teacher Dashboard', icon: LayoutDashboard, end: true },
    { to: '/teacher/courses', label: 'Course Management', icon: BookOpen },
    { to: '/teacher/materials', label: 'Materials & Uploads', icon: UploadCloud, badge: 'AI Pipeline' },
    { to: '/teacher/students', label: 'Class Rosters & Students', icon: Users },
    { to: '/teacher/assignments', label: 'Assignments', icon: FileCheck },
    { to: '/teacher/analytics', label: 'Teacher Analytics', icon: BarChart3 },
  ];

  const links = role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <aside
      className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 shrink-0 transition-colors"
      aria-label="Main Application Sidebar"
    >
      {/* Brand Logo & Title */}
      <Link to={role === 'teacher' ? '/teacher' : '/student'} className="flex items-center gap-3 px-2 py-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            Vidya
          </span>
          <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Inclusive EdTech
          </span>
        </div>
      </Link>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer Banner */}
      <div className="mt-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <span>Accessibility First</span>
        </p>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          WCAG 2.2 AA compliant. Every learner belongs.
        </p>
      </div>
    </aside>
  );
};
