import {
  User,
  AccessibilityProfile,
  Course,
  Quiz,
  QuizAttempt,
  ResourceItem,
  ProcessingJob,
  SavedNote,
  NotificationItem,
  SharedAccommodation,
  ClassRoster,
  Assignment,
} from '../types';

export const DEMO_STUDENT: User = {
  id: 'user_student_1',
  email: 'alex@vidya.edu',
  role: 'student',
  name: 'Alex Rivera',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  preferredLanguage: 'en',
};

export const DEMO_TEACHER: User = {
  id: 'user_teacher_1',
  email: 'priya.sharma@vidya.edu',
  role: 'teacher',
  name: 'Dr. Priya Sharma',
  teacherId: 'T-1082',
  department: 'Mathematics & Computer Science',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  preferredLanguage: 'en',
};

export const INITIAL_ACCESSIBILITY_PROFILE: AccessibilityProfile = {
  assessmentCompleted: false,
  assessmentSkipped: false,
  textSize: 'medium',
  contrastMode: 'default',
  colorBlindTheme: 'none',
  reducedMotion: false,
  dyslexiaMode: false,
  screenReaderOptimized: true,
  voiceNavigation: false,
  textToSpeech: true,
  readingSpeed: 1.0,
  captions: true,
  spokenMath: true,
  preferredSupport: ['Audio Reader (TTS)', 'Captions', 'Simplified Explanations', 'Spoken Mathematics'],
};

export const INITIAL_SHARED_ACCOMMODATIONS: SharedAccommodation[] = [
  {
    studentId: 'user_student_1',
    studentName: 'Alex Rivera',
    sharedAccommodations: ['Audio Reader (TTS)', 'Captions Enabled', 'Spoken Mathematics'],
    enabled: true,
  },
  {
    studentId: 'user_student_2',
    studentName: 'Rohan Mehta',
    sharedAccommodations: ['Dyslexia Font Mode', 'Extra Time on Quizzes (+15m)'],
    enabled: true,
  },
  {
    studentId: 'user_student_3',
    studentName: 'Ananya Gupta',
    sharedAccommodations: ['High Contrast Theme', 'Screen Reader Structure'],
    enabled: true,
  },
];

export const SEEDED_COURSES: Course[] = [
  {
    id: 'course_math_101',
    teacherId: 'user_teacher_1',
    teacherName: 'Dr. Priya Sharma',
    title: 'Mathematics — Algebra & Polynomial Fundamentals',
    description: 'Master quadratic equations, polynomial functions, and linear algebra through accessible multi-modal lessons.',
    subject: 'Mathematics',
    gradeLevel: 'Class 9-10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    difficulty: 'Intermediate',
    durationMinutes: 180,
    progressPercent: 72,
    accessibilityBadges: ['Audio Enabled', 'MathML Ready', 'Captions', 'Screen Reader'],
    modules: [
      {
        id: 'mod_algebra_1',
        courseId: 'course_math_101',
        title: 'Module 1: Linear Equations & Variables',
        position: 1,
        lessons: [
          {
            id: 'les_math_1',
            moduleId: 'mod_algebra_1',
            courseId: 'course_math_101',
            title: 'Understanding Algebraic Expression Structure',
            contentType: 'math',
            durationMinutes: 15,
            position: 1,
            completed: true,
            content: `Algebraic expressions combine constants, variables, and operational operators (+, -, ×, ÷). When solving a quadratic equation of the form ax² + bx + c = 0, the roots can be calculated using the quadratic formula:

x = (-b ± √(b² - 4ac)) / (2a)

The discriminant Δ = b² - 4ac tells us the nature of roots:
1. Δ > 0: Two distinct real roots.
2. Δ = 0: Two equal real roots.
3. Δ < 0: Complex conjugate roots.`,
            mathMl: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <x>x</x>
  <mo>=</mo>
  <mfrac>
    <mrow>
      <mo>−</mo><mi>b</mi><mo>&#xB1;</mo>
      <msqrt>
        <msup><mi>b</mi><mn>2</mn></msup>
        <mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi>
      </msqrt>
    </mrow>
    <mrow><mn>2</mn><mi>a</mi></mrow>
  </mfrac>
</math>`,
            spokenMath: 'x equals negative b plus or minus the square root of b squared minus 4 a c, all divided by 2 a.',
            simplifiedContent: {
              'Class 8 Level': 'An algebraic equation is like a balanced scale. Variables like x are unknown mystery numbers. To find x, move all numbers without x to the other side step-by-step.',
              'Very Easy': 'Think of x as a mystery box. The formula helps us unpack the box to find the number inside.',
            },
            hindiTranslation: 'बीजगणितीय समीकरण स्थिरांक, चर और गणितीय संक्रियाओं को मिलाते हैं। द्विघात समीकरण ax² + bx + c = 0 के लिए, द्विघात सूत्र x = (-b ± √(b² - 4ac)) / (2a) का उपयोग करके हल प्राप्त किए जाते हैं।',
          },
          {
            id: 'les_math_2',
            moduleId: 'mod_algebra_1',
            courseId: 'course_math_101',
            title: 'Quadratic Equations & Geometric Graph Representation',
            contentType: 'text',
            durationMinutes: 20,
            position: 2,
            completed: true,
            content: 'A quadratic function yields a U-shaped curve called a parabola. The vertex represents the minimum or maximum point of the function. The axis of symmetry passes straight through x = -b / (2a).',
            simplifiedContent: {
              'Class 8 Level': 'When you graph a quadratic equation, it curves like a happy smile (cup) or a hill. The lowest point at the bottom is the vertex.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course_sci_102',
    teacherId: 'user_teacher_1',
    teacherName: 'Dr. Priya Sharma',
    title: 'Science — Physics, Energy & Thermodynamics',
    description: 'Explore kinetic energy, work-energy theorem, and laws of conservation with audio narration and clear visual diagrams.',
    subject: 'Science',
    gradeLevel: 'Class 9',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80',
    difficulty: 'Beginner',
    durationMinutes: 240,
    progressPercent: 48,
    accessibilityBadges: ['Audio Reader', 'Visual Subtitles', 'Dyslexia Friendly'],
    modules: [
      {
        id: 'mod_physics_1',
        courseId: 'course_sci_102',
        title: 'Module 1: Work and Energy Conservation',
        position: 1,
        lessons: [
          {
            id: 'les_sci_1',
            moduleId: 'mod_physics_1',
            courseId: 'course_sci_102',
            title: 'Kinetic Energy vs Potential Energy Principles',
            contentType: 'video',
            durationMinutes: 25,
            position: 1,
            completed: true,
            content: 'Energy cannot be created or destroyed; it transforms from one state into another. Kinetic Energy KE = ½ mv², while Gravitational Potential Energy PE = mgh.',
            transcript: '[00:01] Welcome to Kinetic Energy fundamentals. [00:15] When a basketball is held at height h, it possesses potential energy m-g-h. [00:45] Upon release, gravity accelerates it, turning potential energy into kinetic energy ½ m v².',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
        ],
      },
    ],
  },
  {
    id: 'course_cs_103',
    teacherId: 'user_teacher_1',
    teacherName: 'Dr. Priya Sharma',
    title: 'Computer Science — Algorithms & Web Systems',
    description: 'Understand computational thinking, data structures, and responsive web accessibility engineering.',
    subject: 'Computer Science',
    gradeLevel: 'Class 10-12',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    difficulty: 'Advanced',
    durationMinutes: 300,
    progressPercent: 86,
    accessibilityBadges: ['Screen Reader Optimized', 'Keyboard Ready', 'Code Accessibility'],
    modules: [
      {
        id: 'mod_cs_1',
        courseId: 'course_cs_103',
        title: 'Module 1: Web Accessibility (WCAG 2.2 AA)',
        position: 1,
        lessons: [
          {
            id: 'les_cs_1',
            moduleId: 'mod_cs_1',
            courseId: 'course_cs_103',
            title: 'Accessible ARIA Landmarks & Focus Management',
            contentType: 'text',
            durationMinutes: 30,
            position: 1,
            completed: true,
            content: 'Web Content Accessibility Guidelines (WCAG) require four core principles: Perceivable, Operable, Understandable, and Robust (POUR). Ensure keyboard tab stops follow a logical DOM order and 44x44px minimum target sizes.',
          },
        ],
      },
    ],
  },
  {
    id: 'course_eng_104',
    teacherId: 'user_teacher_1',
    teacherName: 'Dr. Priya Sharma',
    title: 'English — Literary Analysis & Communication',
    description: 'Develop critical reading comprehension, structured essay composition, and assistive voice communication skills.',
    subject: 'English',
    gradeLevel: 'Class 9-10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    difficulty: 'Beginner',
    durationMinutes: 150,
    progressPercent: 30,
    accessibilityBadges: ['Audio Reader', 'High Contrast', 'Text Scalable'],
    modules: [
      {
        id: 'mod_eng_1',
        courseId: 'course_eng_104',
        title: 'Module 1: Rhetorical Devices & Metaphors',
        position: 1,
        lessons: [
          {
            id: 'les_eng_1',
            moduleId: 'mod_eng_1',
            courseId: 'course_eng_104',
            title: 'Metaphors, Similes & Personification in Prose',
            contentType: 'text',
            durationMinutes: 20,
            position: 1,
            completed: false,
            content: 'A metaphor compares two distinct items directly without using "like" or "as", for instance "Time is a thief". A simile uses "like" or "as".',
          },
        ],
      },
    ],
  },
];

export const SEEDED_QUIZZES: Quiz[] = [
  {
    id: 'quiz_algebra_1',
    courseId: 'course_math_101',
    courseTitle: 'Mathematics — Algebra & Polynomial Fundamentals',
    title: 'Algebraic Equation Mastery Assessment',
    description: 'Test your understanding of quadratic formulas, discriminant roots, and coordinate graph representations.',
    timeLimitSeconds: 600,
    questions: [
      {
        id: 'q1',
        questionText: 'What is the quadratic formula used to find the roots of ax² + bx + c = 0?',
        spokenQuestion: 'What is the quadratic formula used to find the roots of a x squared plus b x plus c equals zero?',
        options: [
          'x = (-b ± √(b² - 4ac)) / (2a)',
          'x = (-b ± √(b² + 4ac)) / (2a)',
          'x = (b ± √(b² - 4ac)) / a',
          'x = (-b ± √(4ac)) / (2a)',
        ],
        correctOptionIndex: 0,
        explanation: 'The standard quadratic formula is x = (-b ± √(b² - 4ac)) / (2a). The term b² - 4ac is called the discriminant.',
      },
      {
        id: 'q2',
        questionText: 'If the discriminant Δ = b² - 4ac is equal to zero, what is the nature of the roots?',
        spokenQuestion: 'If the discriminant delta equals b squared minus 4 a c equals zero, what is the nature of the roots?',
        options: [
          'Two distinct real roots',
          'Two equal real roots',
          'No real roots (complex roots)',
          'Infinite roots',
        ],
        correctOptionIndex: 1,
        explanation: 'When Δ = 0, the term under the square root vanishes, leaving a single repeated real root x = -b / (2a).',
      },
      {
        id: 'q3',
        questionText: 'What geometric shape is formed by the graph of a quadratic polynomial function?',
        spokenQuestion: 'What geometric shape is formed by the graph of a quadratic polynomial function?',
        options: ['Straight Line', 'Circle', 'Parabola', 'Hyperbola'],
        correctOptionIndex: 2,
        explanation: 'All quadratic functions graph as symmetric curves known as parabolas.',
      },
    ],
  },
];

export const SEEDED_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att_1',
    quizId: 'quiz_algebra_1',
    quizTitle: 'Algebraic Equation Mastery Assessment',
    studentId: 'user_student_1',
    scorePercent: 84,
    answers: [0, 1, 2],
    startedAt: '2026-09-05T10:00:00Z',
    completedAt: '2026-09-05T10:07:30Z',
    aiAnalysis: {
      overallSummary: 'Great performance! You demonstrated strong conceptual understanding of quadratic roots and discriminant values.',
      weakTopics: ['Discriminant Boundary Cases (Δ < 0)'],
      strengths: ['Quadratic Formula Application', 'Parabola Graph Recognition'],
      recommendedRevision: 'Review Chapter 4.2 on Discriminant Δ < 0 complex conjugate root properties.',
    },
  },
];

export const SEEDED_MATERIALS: ResourceItem[] = [
  {
    id: 'res_101',
    courseId: 'course_math_101',
    courseTitle: 'Mathematics — Algebra',
    title: 'Chapter 4 — Quadratic Formula & Discriminant Proof Sheet.pdf',
    resourceType: 'pdf',
    fileSizeBytes: 2450000,
    accessibilityStatus: 'ready_for_review',
    uploadedAt: '2026-09-06T09:15:00Z',
    processingJobId: 'job_101',
    generatedContent: {
      imageDescription: 'Diagram displaying a parabola curve y = x² - 4x + 3 intersecting the x-axis at coordinate points (1,0) and (3,0). The vertex is located at (2,-1).',
      mathMl: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#x2213;</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>`,
      spokenMath: 'x equals minus b plus or minus square root of b squared minus 4 a c over 2 a.',
      screenReaderStructure: 'Heading 1: Quadratic Proof. Section 1: Discriminant definition. Section 2: Worked example for roots 1 and 3.',
      transcript: 'Full OCR Text Extracted: A quadratic equation is an equation of degree 2.',
      confidence: 0.94,
      teacherApproved: false,
    },
  },
  {
    id: 'res_102',
    courseId: 'course_sci_102',
    courseTitle: 'Science — Physics',
    title: 'Energy Conservation Kinetic Energy Demonstration Video.mp4',
    resourceType: 'video',
    fileSizeBytes: 18500000,
    accessibilityStatus: 'approved',
    uploadedAt: '2026-09-04T14:20:00Z',
    processingJobId: 'job_102',
    generatedContent: {
      transcript: '[00:00] Physics demonstration: Potential energy transforming to kinetic energy. [00:30] Height h = 5 meters.',
      confidence: 0.98,
      teacherApproved: true,
    },
  },
];

export const SEEDED_PROCESSING_JOBS: ProcessingJob[] = [
  {
    id: 'job_101',
    resourceId: 'res_101',
    resourceTitle: 'Chapter 4 — Quadratic Formula & Discriminant Proof Sheet.pdf',
    resourceType: 'pdf',
    status: 'ready_for_review',
    progress: 90,
    currentStep: 'Waiting for Teacher Review & Approval',
    technicalDetails: {
      extractionEngine: 'Vidya Multimodal PDF Parser v2.4',
      parsedNodes: 142,
      detectedImages: 3,
      detectedEquations: 8,
      modelConfidenceScore: 0.94,
    },
    generatedContent: SEEDED_MATERIALS[0].generatedContent,
    createdAt: '2026-09-06T09:15:00Z',
  },
];

export const SEEDED_SAVED_NOTES: SavedNote[] = [
  {
    id: 'note_1',
    studentId: 'user_student_1',
    title: 'Quadratic Roots Summary & Tip',
    content: 'Formula: x = (-b ± √(b² - 4ac)) / (2a). If discriminant Δ > 0, there are 2 real solutions. Remember to calculate b² - 4ac first before square rooting!',
    sourceType: 'ai_tutor',
    createdAt: '2026-09-05T11:20:00Z',
  },
  {
    id: 'note_2',
    studentId: 'user_student_1',
    title: 'Kinetic Energy Formula Note',
    content: 'Kinetic Energy KE = ½ mv². Doubling the velocity quadruples the kinetic energy!',
    sourceType: 'lesson',
    createdAt: '2026-09-04T15:30:00Z',
  },
];

export const SEEDED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'user_student_1',
    category: 'academic',
    title: 'New Algebra Lesson Unlocked',
    message: 'Dr. Priya Sharma published Chapter 4: Polynomial Functions.',
    read: false,
    createdAt: '2026-09-06T08:00:00Z',
  },
  {
    id: 'notif_2',
    userId: 'user_student_1',
    category: 'ai',
    title: 'Quiz AI Performance Analysis Ready',
    message: 'Your Quiz attempt result (84%) was analyzed with recommended revision steps.',
    read: true,
    createdAt: '2026-09-05T10:10:00Z',
  },
  {
    id: 'notif_3',
    userId: 'user_student_1',
    category: 'accessibility',
    title: 'Accessibility Preferences Synced',
    message: 'Your Audio Reader (TTS) and Spoken Math options are active.',
    read: true,
    createdAt: '2026-09-01T09:00:00Z',
  },
];

export const SEEDED_CLASSES: ClassRoster[] = [
  {
    id: 'class_9a',
    teacherId: 'user_teacher_1',
    name: 'Class 9 — Section A (Mathematics & Physics)',
    grade: 'Class 9',
    studentCount: 32,
    averageProgress: 74,
  },
  {
    id: 'class_10b',
    teacherId: 'user_teacher_1',
    name: 'Class 10 — Section B (Advanced Algebra & Computer Science)',
    grade: 'Class 10',
    studentCount: 28,
    averageProgress: 82,
  },
];

export const SEEDED_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_1',
    courseId: 'course_math_101',
    courseTitle: 'Mathematics — Algebra',
    teacherId: 'user_teacher_1',
    title: 'Quadratic Equation Practice Problem Set #4',
    description: 'Solve problems 1-10 on quadratic roots and sketch the parabola axis of symmetry.',
    dueDate: '2026-09-12T23:59:00Z',
    submissionsCount: 24,
    totalStudents: 32,
    status: 'active',
  },
  {
    id: 'asg_2',
    courseId: 'course_sci_102',
    courseTitle: 'Science — Physics',
    teacherId: 'user_teacher_1',
    title: 'Energy Transformation Experiment Report',
    description: 'Document potential to kinetic energy conversion in pendulums.',
    dueDate: '2026-09-15T23:59:00Z',
    submissionsCount: 18,
    totalStudents: 32,
    status: 'active',
  },
];
