import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useData } from '../../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mic,
  Bell,
  Search,
  User as UserIcon,
  Sliders,
  LogOut,
  Sparkles,
  CheckCheck,
  ShieldAlert,
  GraduationCap,
} from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Student Dashboard' }) => {
  const { user, role, logout, switchDemoRole } = useAuth();
  const { setIsVoiceModalOpen } = useAccessibility();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Page Title & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {title}
              </h1>
              {role === 'teacher' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                  <ShieldAlert className="w-3 h-3" /> Teacher Scope
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                  <GraduationCap className="w-3 h-3" /> Student
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, lessons, topics, formulas..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition"
              aria-label="Search learning resources"
            />
          </div>
        </form>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Voice Navigation Trigger Button */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition flex items-center gap-1.5 font-medium text-xs shadow-sm"
            title="Voice Navigation & Commands"
            aria-label="Voice Navigation Assistant"
          >
            <Mic className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Voice Control</span>
          </button>

          {/* Accessibility Settings Shortcut */}
          <Link
            to="/student/profile/accessibility"
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Accessibility Preferences"
            aria-label="Accessibility Settings"
          >
            <Sliders className="w-5 h-5" />
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label={`Notifications (${unreadCount} unread)`}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-700">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 text-xs transition cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                        !n.read ? 'bg-indigo-50/50 dark:bg-indigo-950/20' : ''
                      }`}
                    >
                      <p className="font-semibold text-slate-900 dark:text-white">{n.title}</p>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="User profile menu"
            >
              <img
                src={user?.avatarUrl}
                alt={user?.name || 'User Profile'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <span className="hidden md:inline font-semibold text-xs text-slate-800 dark:text-slate-200">
                {user?.name}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>

                {/* Demo Switcher for fast evaluation */}
                <div className="py-2 border-b border-slate-100 dark:border-slate-700 px-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Demo Role Switcher
                  </p>
                  <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button
                      onClick={() => {
                        switchDemoRole('student');
                        setShowUserMenu(false);
                        navigate('/student');
                      }}
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        role === 'student'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      onClick={() => {
                        switchDemoRole('teacher');
                        setShowUserMenu(false);
                        navigate('/teacher');
                      }}
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        role === 'teacher'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Teacher
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to={role === 'teacher' ? '/teacher/profile' : '/student/profile'}
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg"
                  >
                    <UserIcon className="w-4 h-4" /> Profile & Account
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
