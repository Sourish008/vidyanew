import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { VoiceCommandModal } from '../accessibility/VoiceCommandModal';
import { ReadingToolbar } from '../accessibility/ReadingToolbar';
import {
  VoiceNavigationGuideOverlay,
  getPageVoiceGuidance,
} from '../accessibility/VoiceNavigationGuideOverlay';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ttsService } from '../../services/ttsService';

interface ShellProps {
  children: React.ReactNode;
  title?: string;
}

export const Shell: React.FC<ShellProps> = ({ children, title }) => {
  const { profile } = useAccessibility();
  const location = useLocation();

  // Spoken Navigation Guidance on page change when Voice Navigation Guide Mode is active
  useEffect(() => {
    if (profile.voiceNavigation) {
      const guidance = getPageVoiceGuidance(location.pathname);
      // Brief delay to allow DOM hydration before speaking guidance
      const timer = setTimeout(() => {
        ttsService.speak(guidance.guidanceText, profile.readingSpeed || 1.0);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, profile.voiceNavigation]);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors relative overflow-x-hidden">
      {/* Sidebar Navigation for Desktop */}
      <Sidebar />

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        <Header title={title} />
        
        {/* Voice Navigation Guide Overlay Bar when active */}
        <VoiceNavigationGuideOverlay />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 animate-fadeIn pt-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Accessibility Overlays & Utilities */}
      <VoiceCommandModal />
      <ReadingToolbar />
    </div>
  );
};
