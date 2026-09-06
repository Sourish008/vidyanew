// Speech Recognition Voice Navigation Intent Parser Service

export interface VoiceCommandMatch {
  rawTranscript: string;
  commandId: string;
  intentDescription: string;
  actionType: 'navigate' | 'action' | 'unknown';
  targetPath?: string;
}

export class VoiceNavigationService {
  private recognition: any = null;
  private isListeningState = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public listenOnce(
    onResult: (match: VoiceCommandMatch) => void,
    onListeningChange?: (isListening: boolean) => void,
    onError?: (error: string) => void
  ): void {
    if (!this.recognition) {
      if (onError) onError('Speech Recognition is not supported in this browser.');
      return;
    }

    this.recognition.onstart = () => {
      this.isListeningState = true;
      if (onListeningChange) onListeningChange(true);
    };

    this.recognition.onend = () => {
      this.isListeningState = false;
      if (onListeningChange) onListeningChange(false);
    };

    this.recognition.onerror = (e: any) => {
      this.isListeningState = false;
      if (onListeningChange) onListeningChange(false);
      if (onError) onError(e.error || 'Voice command error');
    };

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('')
        .trim();

      const match = this.parseIntent(transcript);
      onResult(match);
    };

    try {
      this.recognition.start();
    } catch (err) {
      if (onError) onError('Voice input active or permission denied.');
    }
  }

  public stop(): void {
    if (this.recognition && this.isListeningState) {
      this.recognition.stop();
      this.isListeningState = false;
    }
  }

  public parseIntent(transcript: string): VoiceCommandMatch {
    const text = transcript.toLowerCase();

    if (text.includes('course') || text.includes('my courses')) {
      return {
        rawTranscript: transcript,
        commandId: 'NAV_COURSES',
        intentDescription: 'Opening My Courses',
        actionType: 'navigate',
        targetPath: '/student/courses',
      };
    }
    if (text.includes('ai tutor') || text.includes('tutor') || text.includes('ask ai')) {
      return {
        rawTranscript: transcript,
        commandId: 'NAV_AI_TUTOR',
        intentDescription: 'Opening AI Tutor Workspace',
        actionType: 'navigate',
        targetPath: '/student/ai-tutor',
      };
    }
    if (text.includes('quiz') || text.includes('quizzes') || text.includes('start quiz')) {
      return {
        rawTranscript: transcript,
        commandId: 'NAV_QUIZZES',
        intentDescription: 'Opening Quizzes & Assessments',
        actionType: 'navigate',
        targetPath: '/student/quizzes',
      };
    }
    if (text.includes('resource') || text.includes('resources') || text.includes('study material')) {
      return {
        rawTranscript: transcript,
        commandId: 'NAV_RESOURCES',
        intentDescription: 'Opening Learning Resources',
        actionType: 'navigate',
        targetPath: '/student/resources',
      };
    }
    if (text.includes('note') || text.includes('saved notes')) {
      return {
        rawTranscript: transcript,
        commandId: 'NAV_NOTES',
        intentDescription: 'Opening Saved Study Notes',
        actionType: 'navigate',
        targetPath: '/student/notes',
      };
    }
    if (text.includes('dashboard') || text.includes('home')) {
      return {
        rawTranscript: transcript,
        commandId: 'NAV_DASHBOARD',
        intentDescription: 'Navigating to Student Dashboard',
        actionType: 'navigate',
        targetPath: '/student',
      };
    }
    if (text.includes('accessibility') || text.includes('setting') || text.includes('settings')) {
      return {
        rawTranscript: transcript,
        commandId: 'NAV_ACCESSIBILITY',
        intentDescription: 'Opening Accessibility Settings',
        actionType: 'navigate',
        targetPath: '/student/profile/accessibility',
      };
    }
    if (text.includes('read page') || text.includes('listen') || text.includes('read text')) {
      return {
        rawTranscript: transcript,
        commandId: 'ACTION_READ',
        intentDescription: 'Triggering Text-to-Speech Page Reader',
        actionType: 'action',
      };
    }
    if (text.includes('stop reading') || text.includes('stop audio')) {
      return {
        rawTranscript: transcript,
        commandId: 'ACTION_STOP_READING',
        intentDescription: 'Stopping Audio Reader',
        actionType: 'action',
      };
    }

    return {
      rawTranscript: transcript,
      commandId: 'UNKNOWN',
      intentDescription: "Command not recognized. Say 'Open courses' or 'Open AI Tutor'",
      actionType: 'unknown',
    };
  }
}

export const voiceNavigationService = new VoiceNavigationService();
