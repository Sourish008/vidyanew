import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLocation, Link } from 'react-router-dom';
import { ttsService } from '../../services/ttsService';
import { Mic, Volume2, X, Sparkles, Navigation, Shield, Compass } from 'lucide-react';

export interface VoiceGuidePageInfo {
  locationName: string;
  guidanceText: string;
  suggestedCommands: string[];
}

export const getPageVoiceGuidance = (pathname: string): VoiceGuidePageInfo => {
  if (pathname.includes('/lessons/')) {
    return {
      locationName: 'Lesson Content Player',
      guidanceText: 'You are on the Lesson Page. Say "Read page" to listen to content, "Simplify" to lower grade level, or "Ask AI Tutor" for help.',
      suggestedCommands: ['Read page', 'Simplify', 'Ask AI Tutor', 'Go back'],
    };
  }
  if (pathname.includes('/courses/')) {
    return {
      locationName: 'Course Syllabus',
      guidanceText: 'You are on the Course Details page. Say "Start lesson" to begin learning or "Go back" to view all courses.',
      suggestedCommands: ['Start lesson', 'Go back', 'AI Tutor'],
    };
  }
  if (pathname.includes('/courses')) {
    return {
      locationName: 'My Courses Library',
      guidanceText: 'You are on My Courses. 4 enrolled courses are available. Say "Open Mathematics", "Open Physics", or "Go to Dashboard".',
      suggestedCommands: ['Open Mathematics', 'Open Physics', 'Dashboard'],
    };
  }
  if (pathname.includes('/quizzes/')) {
    return {
      locationName: 'Quiz Assessment',
      guidanceText: 'You are on the Quiz page. Say "Option 1", "Option 2", "Listen Question", or "Submit assessment".',
      suggestedCommands: ['Listen Question', 'Next Question', 'Submit'],
    };
  }
  if (pathname.includes('/quizzes')) {
    return {
      locationName: 'Quizzes & Practice',
      guidanceText: 'You are on Quizzes. Say "Start quiz" to begin practice test or "Go to AI Tutor".',
      suggestedCommands: ['Start quiz', 'Dashboard', 'AI Tutor'],
    };
  }
  if (pathname.includes('/ai-tutor')) {
    return {
      locationName: 'AI Tutor Workspace',
      guidanceText: 'You are in the AI Tutor Workspace. Speak your question or say "Explain quadratic formula" or "Solve physics problem".',
      suggestedCommands: ['Explain quadratic formula', 'Solve physics problem', 'Simplify'],
    };
  }
  if (pathname.includes('/accessibility')) {
    return {
      locationName: 'Accessibility Preferences',
      guidanceText: 'You are on Accessibility Preferences. Say "Turn off voice guide" to disable voice navigation or "High contrast" to toggle theme.',
      suggestedCommands: ['Turn off voice guide', 'High contrast', 'Dashboard'],
    };
  }

  return {
    locationName: 'Student Dashboard',
    guidanceText: 'Welcome to your Student Dashboard. Say "Open courses", "Open AI Tutor", "Start quiz", or "Read page" to navigate.',
    suggestedCommands: ['Open courses', 'Open AI Tutor', 'Start quiz', 'Read page'],
  };
};

export const VoiceNavigationGuideOverlay: React.FC = () => {
  const { profile, updateProfile, setIsVoiceModalOpen } = useAccessibility();
  const location = useLocation();

  if (!profile.voiceNavigation) return null;

  const info = getPageVoiceGuidance(location.pathname);

  const handleSpeakGuidance = () => {
    ttsService.speak(info.guidanceText, profile.readingSpeed || 1.0);
  };

  const handleDisableVoiceGuide = () => {
    ttsService.speak('Voice Navigation Guide Mode disabled.', profile.readingSpeed || 1.0);
    updateProfile({ voiceNavigation: false });
  };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-3xl bg-indigo-950/95 text-white p-3.5 rounded-2xl shadow-2xl backdrop-blur-md border border-indigo-700 animate-slideDown flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Left: Guide Badge & Context */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-md animate-pulse">
          <Compass className="w-5 h-5 text-white" />
        </div>

        <div className="space-y-0.5 text-left">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-indigo-500/40 text-indigo-200 rounded text-[10px] font-extrabold uppercase tracking-wider">
              🎙️ Voice Navigation Guide (ACTIVE)
            </span>
            <span className="text-[10px] text-amber-300 font-bold">
              📍 {info.locationName}
            </span>
          </div>

          <p className="text-xs text-indigo-100 font-medium line-clamp-1">
            {info.guidanceText}
          </p>
        </div>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Speak Guidance Button */}
        <button
          onClick={handleSpeakGuidance}
          className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-indigo-100 rounded-xl text-xs font-bold flex items-center gap-1 transition"
          title="Repeat spoken page guidance"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">Guide Voice</span>
        </button>

        {/* Instant Voice Input Trigger */}
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
        >
          <Mic className="w-3.5 h-3.5 animate-bounce" />
          <span>Speak Command</span>
        </button>

        {/* Turn Off Guide Mode */}
        <button
          onClick={handleDisableVoiceGuide}
          className="p-1.5 text-indigo-300 hover:text-white hover:bg-indigo-900 rounded-lg transition"
          title="Disable Voice Navigation Guide Mode in settings"
          aria-label="Disable Voice Navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
