import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { voiceNavigationService, VoiceCommandMatch } from '../../services/voiceNavigationService';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { ttsService } from '../../services/ttsService';

export const VoiceCommandModal: React.FC = () => {
  const { isVoiceModalOpen, setIsVoiceModalOpen } = useAccessibility();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchResult, setMatchResult] = useState<VoiceCommandMatch | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isVoiceModalOpen) {
      startListening();
    } else {
      voiceNavigationService.stop();
      setIsListening(false);
    }
  }, [isVoiceModalOpen]);

  const startListening = () => {
    setTranscript('');
    setMatchResult(null);
    setErrorMsg(null);

    voiceNavigationService.listenOnce(
      (match) => {
        setTranscript(match.rawTranscript);
        setMatchResult(match);

        if (match.actionType === 'navigate' && match.targetPath) {
          setTimeout(() => {
            setIsVoiceModalOpen(false);
            navigate(match.targetPath!);
          }, 1200);
        } else if (match.commandId === 'ACTION_READ') {
          setTimeout(() => {
            setIsVoiceModalOpen(false);
            const mainEl = document.querySelector('main');
            if (mainEl) {
              ttsService.speak(mainEl.textContent || 'Reading page content');
            }
          }, 1200);
        }
      },
      (listening) => setIsListening(listening),
      (err) => {
        setErrorMsg(err);
        setIsListening(false);
      }
    );
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setIsVoiceModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          aria-label="Close Voice Assistant"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vidya Voice Navigation</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {isListening ? 'Listening for command...' : 'Microphone Ready'}
          </h3>

          {/* Animated Microphone Icon */}
          <div className="relative flex items-center justify-center my-6">
            {isListening && (
              <>
                <span className="absolute w-24 h-24 bg-indigo-400/30 rounded-full animate-ping"></span>
                <span className="absolute w-20 h-20 bg-indigo-500/20 rounded-full animate-pulse"></span>
              </>
            )}
            <button
              onClick={startListening}
              className={`relative z-10 p-6 rounded-full transition shadow-lg ${
                isListening
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-200 dark:ring-indigo-900'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-indigo-50'
              }`}
            >
              {isListening ? <Mic className="w-8 h-8 animate-bounce" /> : <MicOff className="w-8 h-8" />}
            </button>
          </div>

          {/* Command Transcript Output */}
          {transcript && (
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Heard: </span>
              <span className="font-semibold text-slate-900 dark:text-white">"{transcript}"</span>
            </div>
          )}

          {/* Match Intent Feedback */}
          {matchResult && (
            <div
              className={`p-3 rounded-xl flex items-center gap-2 text-sm text-left ${
                matchResult.actionType !== 'unknown'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200'
              }`}
            >
              {matchResult.actionType !== 'unknown' ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600" />
              )}
              <div>
                <p className="font-semibold">{matchResult.intentDescription}</p>
              </div>
            </div>
          )}

          {errorMsg && (
            <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg">
              {errorMsg}
            </p>
          )}

          {/* Command Tips */}
          <div className="pt-2 text-left">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Try saying:
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md">
                "Open courses"
              </span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md">
                "Open AI Tutor"
              </span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md">
                "Start quiz"
              </span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md">
                "Read page"
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
