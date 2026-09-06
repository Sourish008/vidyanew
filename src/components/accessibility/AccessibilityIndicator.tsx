import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Volume2, Subtitles, Type, Eye, Sparkles } from 'lucide-react';

export const AccessibilityIndicator: React.FC = () => {
  const { profile } = useAccessibility();

  const badges = [];

  if (profile.textToSpeech) {
    badges.push({ label: 'Audio Enabled', icon: Volume2, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' });
  }
  if (profile.captions) {
    badges.push({ label: 'Captions On', icon: Subtitles, color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300' });
  }
  if (profile.textSize === 'large') {
    badges.push({ label: 'Large Text', icon: Type, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' });
  }
  if (profile.dyslexiaMode) {
    badges.push({ label: 'Dyslexia Mode', icon: Eye, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' });
  }
  if (profile.spokenMath) {
    badges.push({ label: 'Spoken Math', icon: Sparkles, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-2 my-2">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Adaptations:</span>
      {badges.map((b, i) => {
        const Icon = b.icon;
        return (
          <RouterLink
            key={i}
            to="/student/profile/accessibility"
            title="Click to manage accessibility settings"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition hover:opacity-80 ${b.color}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{b.label}</span>
          </RouterLink>
        );
      })}
    </div>
  );
};
