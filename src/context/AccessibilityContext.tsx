import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AccessibilityProfile, TextSize, ContrastMode, ColorBlindTheme } from '../types';
import { INITIAL_ACCESSIBILITY_PROFILE } from '../services/seedData';
import { ttsService, WordHighlightRange } from '../services/ttsService';

interface AccessibilityContextType {
  profile: AccessibilityProfile;
  updateProfile: (updates: Partial<AccessibilityProfile>) => void;
  resetProfile: () => void;
  // TTS State
  isReading: boolean;
  setIsReading: (reading: boolean) => void;
  activeReadingText: string | null;
  setActiveReadingText: (text: string | null) => void;
  activeTargetLabel: string | null;
  setActiveTargetLabel: (label: string | null) => void;
  speakSpecificTarget: (
    text: string,
    targetLabel: string,
    onWordBoundary?: (range: WordHighlightRange) => void,
    onEnd?: () => void
  ) => void;
  // Voice Command Modal
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  // Assessment state
  showAssessmentModal: boolean;
  setShowAssessmentModal: (show: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<AccessibilityProfile>(() => {
    const saved = localStorage.getItem('vidya_accessibility_profile');
    return saved ? JSON.parse(saved) : INITIAL_ACCESSIBILITY_PROFILE;
  });

  const [isReading, setIsReading] = useState(false);
  const [activeReadingText, setActiveReadingText] = useState<string | null>(null);
  const [activeTargetLabel, setActiveTargetLabel] = useState<string | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const hoverSpeakTimerRef = useRef<number | null>(null);
  const lastHoverSpokenRef = useRef<string>('');

  useEffect(() => {
    localStorage.setItem('vidya_accessibility_profile', JSON.stringify(profile));

    const root = document.documentElement;

    root.classList.remove('text-scale-small', 'text-scale-large');
    if (profile.textSize === 'small') root.classList.add('text-scale-small');
    if (profile.textSize === 'large') root.classList.add('text-scale-large');

    root.classList.remove('contrast-high');
    if (profile.contrastMode === 'high') root.classList.add('contrast-high');

    root.classList.remove('theme-protanopia', 'theme-deuteranopia', 'theme-tritanopia');
    if (profile.colorBlindTheme !== 'none') {
      root.classList.add(`theme-${profile.colorBlindTheme}`);
    }

    if (profile.dyslexiaMode) root.classList.add('dyslexic-mode');
    else root.classList.remove('dyslexic-mode');

    if (profile.reducedMotion) root.classList.add('reduce-motion');
    else root.classList.remove('reduce-motion');
  }, [profile]);

  const updateProfile = (updates: Partial<AccessibilityProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const resetProfile = () => {
    setProfile(INITIAL_ACCESSIBILITY_PROFILE);
  };

  useEffect(() => {
    if (!profile.textToSpeech || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (hoverSpeakTimerRef.current) {
        window.clearTimeout(hoverSpeakTimerRef.current);
        hoverSpeakTimerRef.current = null;
      }
      return;
    }

    const getHoverSpeechText = (element: HTMLElement): string | null => {
      if (!element || element.closest('[data-no-hover-speech="true"]')) return null;

      const ariaLabel = element.getAttribute('aria-label')?.trim();
      const title = element.getAttribute('title')?.trim();
      const text = (element.textContent || ariaLabel || title || '').replace(/\s+/g, ' ').trim();

      if (!text || text.length < 2) return null;
      if (['input', 'textarea', 'select', 'option'].includes(element.tagName.toLowerCase())) return null;

      return text;
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const hoverText = getHoverSpeechText(target);
      if (!hoverText) return;

      if (hoverSpeakTimerRef.current) window.clearTimeout(hoverSpeakTimerRef.current);

      hoverSpeakTimerRef.current = window.setTimeout(() => {
        const latestText = getHoverSpeechText(target);
        if (!latestText) return;

        const normalized = latestText.replace(/\s+/g, ' ').trim();
        if (!normalized || normalized === lastHoverSpokenRef.current) return;

        lastHoverSpokenRef.current = normalized;
        ttsService.speak(normalized, profile.readingSpeed || 1.0);
      }, 220);
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      if (hoverSpeakTimerRef.current) {
        window.clearTimeout(hoverSpeakTimerRef.current);
        hoverSpeakTimerRef.current = null;
      }
    };
  }, [profile.textToSpeech, profile.readingSpeed]);

  const speakSpecificTarget = (
    text: string,
    targetLabel: string,
    onWordBoundary?: (range: WordHighlightRange) => void,
    onEnd?: () => void
  ) => {
    setIsReading(true);
    setActiveReadingText(text);
    setActiveTargetLabel(targetLabel);

    ttsService.speak(
      text,
      profile.readingSpeed || 1.0,
      onWordBoundary,
      () => {
        setIsReading(false);
        setActiveTargetLabel(null);
        if (onEnd) onEnd();
      }
    );
  };

  return (
    <AccessibilityContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        isReading,
        setIsReading,
        activeReadingText,
        setActiveReadingText,
        activeTargetLabel,
        setActiveTargetLabel,
        speakSpecificTarget,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        showAssessmentModal,
        setShowAssessmentModal,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
