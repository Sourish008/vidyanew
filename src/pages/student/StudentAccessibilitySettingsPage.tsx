import React from 'react';
import { Shell } from '../../components/layout/Shell';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useData } from '../../context/DataContext';
import {
  Sliders,
  Type,
  Eye,
  Volume2,
  Mic,
  Subtitles,
  Sparkles,
  RotateCcw,
  Check,
  Shield,
} from 'lucide-react';

export const StudentAccessibilitySettingsPage: React.FC = () => {
  const { profile, updateProfile, resetProfile } = useAccessibility();
  const { sharedAccommodations, updateSharedAccommodation } = useData();

  const alexShare = sharedAccommodations.find((s) => s.studentId === 'user_student_1');

  return (
    <Shell title="Accessibility Preferences">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header summary card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              <span>Personalized Accessibility Hub</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Configure how Vidya adapts visual display, text size, audio narration, and voice navigation.
            </p>
          </div>

          <button
            onClick={resetProfile}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-slate-100 transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset Defaults
          </button>
        </div>

        {/* Section 1: Text & Reading */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-indigo-600" /> Text Scaling & Typography
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Text Size */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Text Scale Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'small', label: 'Small (100%)' },
                  { id: 'medium', label: 'Medium (115%)' },
                  { id: 'large', label: 'Large (130%)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateProfile({ textSize: s.id as any })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                      profile.textSize === s.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dyslexia Mode Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Dyslexia Mode (OpenDyslexic Font & Spacing)
              </label>
              <button
                onClick={() => updateProfile({ dyslexiaMode: !profile.dyslexiaMode })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between border transition ${
                  profile.dyslexiaMode
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>OpenDyslexic Font & Increased Line Spacing</span>
                <span className="text-xs">{profile.dyslexiaMode ? 'Enabled' : 'Disabled'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Visual Themes & Contrast */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-600" /> Visual Themes & Contrast
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Contrast Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Contrast Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateProfile({ contrastMode: 'default' })}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border ${
                    profile.contrastMode === 'default'
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Standard Contrast
                </button>
                <button
                  onClick={() => updateProfile({ contrastMode: 'high' })}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border ${
                    profile.contrastMode === 'high'
                      ? 'bg-slate-950 text-yellow-300 border-yellow-400 font-black'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  High Contrast
                </button>
              </div>
            </div>

            {/* Colorblind Theme */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Colorblind Palette Adaptations
              </label>
              <select
                value={profile.colorBlindTheme}
                onChange={(e) => updateProfile({ colorBlindTheme: e.target.value as any })}
                className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
              >
                <option value="none">Standard Colors (None)</option>
                <option value="protanopia">Protanopia (Red Weakness)</option>
                <option value="deuteranopia">Deuteranopia (Green Weakness)</option>
                <option value="tritanopia">Tritanopia (Blue Weakness)</option>
              </select>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Reduced Motion
              </label>
              <button
                onClick={() => updateProfile({ reducedMotion: !profile.reducedMotion })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between border transition ${
                  profile.reducedMotion
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>Disable non-essential animations & transitions</span>
                <span>{profile.reducedMotion ? 'Enabled' : 'Disabled'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Audio & Voice */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-indigo-600" /> Audio Narration & Voice Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => updateProfile({ textToSpeech: !profile.textToSpeech })}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                profile.textToSpeech
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">Audio Reader (TTS)</span>
              </div>
              <span className="text-xs">{profile.textToSpeech ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => updateProfile({ voiceNavigation: !profile.voiceNavigation })}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                profile.voiceNavigation
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">Voice Command Controls</span>
              </div>
              <span className="text-xs">{profile.voiceNavigation ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => updateProfile({ captions: !profile.captions })}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                profile.captions
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Subtitles className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">Captions & Transcripts</span>
              </div>
              <span className="text-xs">{profile.captions ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => updateProfile({ spokenMath: !profile.spokenMath })}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                profile.spokenMath
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">Spoken Mathematics</span>
              </div>
              <span className="text-xs">{profile.spokenMath ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Section 4: Student Accommodations Privacy Sharing */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Student Accommodation Privacy & Teacher Sharing
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Control whether your teachers receive high-level accommodation summaries (e.g., "Audio Reader Preferred", "Extra Quiz Time Needed"). Your detailed diagnosis and raw profile settings remain private.
          </p>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">
                Share High-Level Accommodation Summary with Teachers
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Shared items: {alexShare?.sharedAccommodations.join(', ') || 'Audio Reader, Captions'}
              </span>
            </div>

            <button
              onClick={() => updateSharedAccommodation('user_student_1', !alexShare?.enabled)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                alexShare?.enabled
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {alexShare?.enabled ? 'Sharing Active' : 'Sharing Disabled'}
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
};
