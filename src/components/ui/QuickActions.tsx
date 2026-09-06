import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Bot, HelpCircle, FolderOpen } from 'lucide-react';

const Action: React.FC<{ to: string; icon: React.ReactNode; title: string; subtitle?: string }> = ({
  to,
  icon,
  title,
  subtitle,
}) => (
  <Link
    to={to}
    className="p-4 bg-white dark:bg-[#1F2937] rounded-2xl border border-[#CBD5E1] dark:border-slate-800 shadow-sm hover:border-[#4F46E5] transition group flex flex-col justify-between"
  >
    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-[#3B82F6] flex items-center justify-center mb-3 group-hover:scale-105 transition">
      {icon}
    </div>
    <div>
      <span className="font-bold text-sm text-[#1F2937] dark:text-[#F8FAFC] block">{title}</span>
      {subtitle && <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">{subtitle}</span>}
    </div>
  </Link>
);

export const QuickActions: React.FC = () => {
  return (
    <section aria-label="Quick Navigation">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Action to="/student/courses" icon={<BookOpen className="w-5 h-5" />} title="My Courses" subtitle="View enrolled" />
        <Action to="/student/ai-tutor" icon={<Bot className="w-5 h-5" />} title="AI Tutor" subtitle="Ask Vidya" />
        <Action to="/student/quizzes" icon={<HelpCircle className="w-5 h-5" />} title="Quizzes" subtitle="Practice tests" />
        <Action to="/student/resources" icon={<FolderOpen className="w-5 h-5" />} title="Resources" subtitle="PDFs & Transcripts" />
      </div>
    </section>
  );
};

export default QuickActions;
