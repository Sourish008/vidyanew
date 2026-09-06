import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ttsService } from '../../services/ttsService';
import {
  Sparkles,
  Check,
  Volume2,
  Type,
  Keyboard,
  Eye,
  HelpCircle,
  Subtitles,
  Mic,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const AccessibilityAssessmentPage: React.FC = () => {
  const { profile, updateProfile } = useAccessibility();
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    profile.preferredSupport || ['Audio Reader (TTS)', 'Captions', 'voice']
  );

  const options = [
    {
      id: 'tts',
      label: 'Do you prefer listening over reading?',
      desc: 'Enables Web Speech Audio Reader (TTS) with real-time text highlighting.',
      icon: Volume2,
    },
    {
      id: 'captions',
      label: 'Would captions & transcripts help?',
      desc: 'Enables video subtitles and accessible audio transcripts.',
      icon: Subtitles,
    },
    {
      id: 'large_text',
      label: 'Do you prefer larger text display?',
      desc: 'Scales application text size to Large (130%) dynamically.',
      icon: Type,
    },
    {
      id: 'keyboard',
      label: 'Do you prefer keyboard navigation?',
      desc: 'Enables 2px offset visible focus ring and keyboard shortcuts.',
      icon: Keyboard,
    },
    {
      id: 'dyslexia',
      label: 'Would dyslexia-friendly font & spacing help?',
      desc: 'Applies OpenDyslexic font and increased line spacing.',
      icon: Eye,
    },
    {
      id: 'simplify',
      label: 'Would simplified explanations help?',
      desc: 'Activates AI Simplification to lower text grade level.',
      icon: HelpCircle,
    },
    {
      id: 'voice',
      label: 'Would voice navigation controls & Voice Guide help?',
      desc: 'Activates Voice Guide Mode: AI voice guides you on every screen and listens for spoken commands.',
      icon: Mic,
    },
    {
      id: 'math',
      label: 'Would spoken math equations help?',
      desc: 'Generates spoken mathematical formula breakdowns.',
      icon: Sparkles,
    },
  ];

  const toggleOption = (id: string) => {
    const updated = selectedOptions.includes(id)
      ? selectedOptions.filter((item) => item !== id)
      : [...selectedOptions, id];

    setSelectedOptions(updated);

    const liveUpdates: any = {};
    if (updated.includes('large_text')) liveUpdates.textSize = 'large';
    else liveUpdates.textSize = 'medium';

    if (updated.includes('dyslexia')) liveUpdates.dyslexiaMode = true;
    else liveUpdates.dyslexiaMode = false;

    if (updated.includes('tts')) liveUpdates.textToSpeech = true;
    if (updated.includes('voice')) liveUpdates.voiceNavigation = true;
    else liveUpdates.voiceNavigation = false;

    if (updated.includes('captions')) liveUpdates.captions = true;

    updateProfile(liveUpdates);
  };

  const handleSave = () => {
    const isVoice = selectedOptions.includes('voice');

    const updates: any = {
      assessmentCompleted: true,
      assessmentSkipped: false,
      preferredSupport: selectedOptions,
      voiceNavigation: isVoice,
    };

    if (selectedOptions.includes('tts')) updates.textToSpeech = true;
    if (selectedOptions.includes('captions')) updates.captions = true;
    if (selectedOptions.includes('large_text')) updates.textSize = 'large';
    if (selectedOptions.includes('dyslexia')) updates.dyslexiaMode = true;
    if (selectedOptions.includes('math')) updates.spokenMath = true;

    updateProfile(updates);

    if (isVoice) {
      // Speak welcome guidance when Voice Navigation Guide Mode is activated
      ttsService.speak(
        'Voice Navigation Guide Mode activated. Welcome to Vidya! I will guide you on every screen. You can speak commands anytime or say Open courses.',
        1.0
      );
    }

    navigate('/student');
  };

  const handleSkip = () => {
    updateProfile({
      assessmentCompleted: true,
      assessmentSkipped: true,
    });
    navigate('/student');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8 animate-fadeIn">
        {/* Test Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-extrabold border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-4 h-4" />
            <span>Step 2 of 2 • First-Login Accessibility Test</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Let's personalize Vidya for you
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Select your preferences below. Choosing <strong>Voice Navigation</strong> will activate <strong>Voice Guide Mode</strong> to guide you spoken on every screen!
          </p>
        </div>

        {/* 8-Question Assessment Test Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[26rem] overflow-y-auto p-1">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedOptions.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleOption(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-indigo-50/90 dark:bg-indigo-950/70 border-indigo-500 text-indigo-950 dark:text-indigo-200 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-400 dark:border-slate-600'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm leading-snug">{opt.label}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Adaptation Notice */}
        <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl text-xs text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 flex items-center gap-2 font-medium">
          <Compass className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Selecting <strong>Voice Navigation Controls</strong> activates Voice Guide Mode across all screens until disabled in settings.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleSkip}
            className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
          >
            Skip for now
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition text-sm"
          >
            <span>Personalize Vidya & Start Guide Mode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
