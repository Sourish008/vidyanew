import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Sparkles, Check, Volume2, Type, Keyboard, Eye, HelpCircle, Subtitles, Mic, ArrowRight } from 'lucide-react';

interface AssessmentModalProps {
  onComplete: () => void;
}

export const AccessibilityAssessmentModal: React.FC<AssessmentModalProps> = ({ onComplete }) => {
  const { profile, updateProfile } = useAccessibility();

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    profile.preferredSupport || ['Audio Reader (TTS)', 'Captions']
  );

  const options = [
    { id: 'tts', label: 'I prefer listening (Audio Reader)', icon: Volume2, key: 'textToSpeech' },
    { id: 'captions', label: 'I want captions & transcripts', icon: Subtitles, key: 'captions' },
    { id: 'large_text', label: 'I prefer larger text', icon: Type, key: 'textSize', value: 'large' },
    { id: 'keyboard', label: 'I prefer keyboard navigation', icon: Keyboard, key: 'screenReaderOptimized' },
    { id: 'dyslexia', label: 'I prefer dyslexia-friendly font & spacing', icon: Eye, key: 'dyslexiaMode' },
    { id: 'simplify', label: 'I want simplified explanations', icon: HelpCircle, key: 'simplify' },
    { id: 'voice', label: 'I want voice navigation controls', icon: Mic, key: 'voiceNavigation' },
    { id: 'math', label: 'I want spoken math equations', icon: Sparkles, key: 'spokenMath' },
  ];

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const updates: any = {
      assessmentCompleted: true,
      assessmentSkipped: false,
      preferredSupport: selectedOptions,
    };

    if (selectedOptions.includes('tts')) updates.textToSpeech = true;
    if (selectedOptions.includes('captions')) updates.captions = true;
    if (selectedOptions.includes('large_text')) updates.textSize = 'large';
    if (selectedOptions.includes('dyslexia')) updates.dyslexiaMode = true;
    if (selectedOptions.includes('voice')) updates.voiceNavigation = true;
    if (selectedOptions.includes('math')) updates.spokenMath = true;

    updateProfile(updates);
    onComplete();
  };

  const handleSkip = () => {
    updateProfile({
      assessmentCompleted: true,
      assessmentSkipped: true,
    });
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to Vidya</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's personalize Vidya for you
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            A quick check helps Vidya adapt UI formatting, audio reading, and learning tools to your preferences.
          </p>
        </div>

        {/* Preference Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-1">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedOptions.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleOption(opt.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-950 dark:text-indigo-200 shadow-sm ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold">{opt.label}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                    isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleSkip}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
          >
            Skip for now
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>Personalize Vidya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
