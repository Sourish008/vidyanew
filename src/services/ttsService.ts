// Web Speech API Text-to-Speech Service with Word-by-Word Synchronized Highlighting

export interface WordHighlightRange {
  charIndex: number;
  length: number;
  word: string;
}

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPausedState = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public speak(
    text: string,
    rate = 1.0,
    onWordBoundary?: (range: WordHighlightRange) => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    if (!this.synth) {
      if (onError) onError('Speech synthesis not supported on this browser.');
      return;
    }

    this.stop(); // Stop any currently active speech

    const cleanText = text.replace(/<[^>]*>/g, ''); // Strip HTML tags if any
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = Math.max(0.5, Math.min(rate, 2.0));
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    utterance.onboundary = (event: SpeechSynthesisEvent) => {
      if (event.name === 'word' && onWordBoundary) {
        const charIndex = event.charIndex;
        // Extract spoken word from char index
        const subText = cleanText.substring(charIndex);
        const match = subText.match(/^\S+/);
        const length = match ? match[0].length : 5;
        const word = cleanText.substring(charIndex, charIndex + length);
        onWordBoundary({ charIndex, length, word });
      }
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      this.isPausedState = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      this.isPausedState = false;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.isPausedState = false;
    this.synth.speak(utterance);
  }

  public pause(): void {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPausedState = true;
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPausedState = false;
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
      this.isPausedState = false;
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking && !this.synth.paused : false;
  }

  public isPaused(): boolean {
    return this.synth ? this.synth.paused : false;
  }
}

export const ttsService = new TTSService();
