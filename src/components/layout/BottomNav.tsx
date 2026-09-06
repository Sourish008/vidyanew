import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bot, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BottomNav: React.FC = () => {
  const { role } = useAuth();

  const studentItems = [
    { to: '/student', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/student/courses', label: 'Courses', icon: BookOpen },
    { to: '/student/ai-tutor', label: 'AI Tutor', icon: Bot },
    { to: '/student/quizzes', label: 'Quizzes', icon: HelpCircle },
  ];

  const teacherItems = [
    { to: '/teacher', label: 'Home', icon: LayoutDashboard, end: true },
    { to: '/teacher/courses', label: 'Courses', icon: BookOpen },
    { to: '/teacher/materials', label: 'Uploads', icon: Bot },
    { to: '/teacher/analytics', label: 'Analytics', icon: HelpCircle },
  ];

  const items = role === 'teacher' ? teacherItems : studentItems;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 transition-colors"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-4 items-center max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
