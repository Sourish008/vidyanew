export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatarUrl: string;
  preferredLanguage: 'en' | 'hi';
  teacherId?: string;
  department?: string;
}

export type TextSize = 'small' | 'medium' | 'large';
export type ContrastMode = 'default' | 'high' | 'custom';
export type ColorBlindTheme = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';

export interface AccessibilityProfile {
  assessmentCompleted: boolean;
  assessmentSkipped: boolean;
  textSize: TextSize;
  contrastMode: ContrastMode;
  colorBlindTheme: ColorBlindTheme;
  reducedMotion: boolean;
  dyslexiaMode: boolean;
  screenReaderOptimized: boolean;
  voiceNavigation: boolean;
  textToSpeech: boolean;
  readingSpeed: number; // 0.75 to 2.0
  captions: boolean;
  spokenMath: boolean;
  preferredSupport: string[];
}

export interface SharedAccommodation {
  studentId: string;
  studentName: string;
  sharedAccommodations: string[];
  enabled: boolean;
}

export type ContentType = 'text' | 'video' | 'audio' | 'math' | 'interactive';

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  contentType: ContentType;
  content: string;
  durationMinutes: number;
  position: number;
  completed?: boolean;
  mathMl?: string;
  spokenMath?: string;
  simplifiedContent?: Record<string, string>; // e.g. { 'Class 8': '...', 'Easy': '...' }
  hindiTranslation?: string;
  transcript?: string;
  videoUrl?: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  position: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  subject: string;
  gradeLevel: string;
  thumbnailUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  progressPercent: number;
  accessibilityBadges: string[];
  modules: CourseModule[];
}

export type ResourceType = 'pdf' | 'video' | 'image' | 'doc' | 'presentation' | 'audio';

export interface GeneratedAccessibilityContent {
  imageDescription?: string;
  mathMl?: string;
  spokenMath?: string;
  screenReaderStructure?: string;
  transcript?: string;
  simplifiedText?: string;
  confidence: number;
  teacherApproved: boolean;
}

export type ProcessingStatus =
  | 'queued'
  | 'validating'
  | 'extracting'
  | 'analyzing'
  | 'generating'
  | 'validating_output'
  | 'ready_for_review'
  | 'approved'
  | 'failed';

export interface ResourceItem {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  resourceType: ResourceType;
  fileSizeBytes: number;
  accessibilityStatus: 'pending' | 'processing' | 'ready_for_review' | 'approved';
  uploadedAt: string;
  generatedContent?: GeneratedAccessibilityContent;
  processingJobId?: string;
}

export interface ProcessingJob {
  id: string;
  resourceId: string;
  resourceTitle: string;
  resourceType: ResourceType;
  status: ProcessingStatus;
  progress: number; // 0 to 100
  currentStep: string;
  error?: string;
  technicalDetails: {
    extractionEngine: string;
    parsedNodes: number;
    detectedImages: number;
    detectedEquations: number;
    modelConfidenceScore: number;
  };
  generatedContent?: GeneratedAccessibilityContent;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  spokenQuestion?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  timeLimitSeconds: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  studentId: string;
  scorePercent: number;
  answers: number[];
  startedAt: string;
  completedAt: string;
  aiAnalysis: {
    overallSummary: string;
    weakTopics: string[];
    strengths: string[];
    recommendedRevision: string;
  };
}

export interface SavedNote {
  id: string;
  studentId: string;
  title: string;
  content: string;
  sourceType: 'ai_tutor' | 'lesson' | 'quiz';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  category: 'academic' | 'system' | 'ai' | 'accessibility';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ClassRoster {
  id: string;
  teacherId: string;
  name: string;
  grade: string;
  studentCount: number;
  averageProgress: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  title: string;
  description: string;
  dueDate: string;
  submissionsCount: number;
  totalStudents: number;
  status: 'active' | 'completed' | 'draft';
}
