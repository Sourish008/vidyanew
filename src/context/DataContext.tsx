import React, { createContext, useContext, useState, useEffect } from 'react';
import {
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
import {
  SEEDED_COURSES,
  SEEDED_QUIZZES,
  SEEDED_QUIZ_ATTEMPTS,
  SEEDED_MATERIALS,
  SEEDED_PROCESSING_JOBS,
  SEEDED_SAVED_NOTES,
  SEEDED_NOTIFICATIONS,
  INITIAL_SHARED_ACCOMMODATIONS,
  SEEDED_CLASSES,
  SEEDED_ASSIGNMENTS,
} from '../services/seedData';

interface DataContextType {
  courses: Course[];
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  materials: ResourceItem[];
  processingJobs: ProcessingJob[];
  notes: SavedNote[];
  notifications: NotificationItem[];
  sharedAccommodations: SharedAccommodation[];
  classes: ClassRoster[];
  assignments: Assignment[];
  // Actions
  saveNote: (title: string, content: string, sourceType: SavedNote['sourceType']) => void;
  deleteNote: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id'>) => QuizAttempt;
  addMaterial: (material: ResourceItem, job?: ProcessingJob) => void;
  updateProcessingJob: (jobId: string, updates: Partial<ProcessingJob>) => void;
  approveMaterialContent: (resourceId: string, updatedContent: any) => void;
  updateSharedAccommodation: (studentId: string, enabled: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('vidya_courses');
    return saved ? JSON.parse(saved) : SEEDED_COURSES;
  });

  const [quizzes] = useState<Quiz[]>(SEEDED_QUIZZES);

  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('vidya_quiz_attempts');
    return saved ? JSON.parse(saved) : SEEDED_QUIZ_ATTEMPTS;
  });

  const [materials, setMaterials] = useState<ResourceItem[]>(() => {
    const saved = localStorage.getItem('vidya_materials');
    return saved ? JSON.parse(saved) : SEEDED_MATERIALS;
  });

  const [processingJobs, setProcessingJobs] = useState<ProcessingJob[]>(() => {
    const saved = localStorage.getItem('vidya_processing_jobs');
    return saved ? JSON.parse(saved) : SEEDED_PROCESSING_JOBS;
  });

  const [notes, setNotes] = useState<SavedNote[]>(() => {
    const saved = localStorage.getItem('vidya_saved_notes');
    return saved ? JSON.parse(saved) : SEEDED_SAVED_NOTES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('vidya_notifications');
    return saved ? JSON.parse(saved) : SEEDED_NOTIFICATIONS;
  });

  const [sharedAccommodations, setSharedAccommodations] = useState<SharedAccommodation[]>(
    INITIAL_SHARED_ACCOMMODATIONS
  );

  const [classes] = useState<ClassRoster[]>(SEEDED_CLASSES);
  const [assignments] = useState<Assignment[]>(SEEDED_ASSIGNMENTS);

  useEffect(() => {
    localStorage.setItem('vidya_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('vidya_quiz_attempts', JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem('vidya_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('vidya_processing_jobs', JSON.stringify(processingJobs));
  }, [processingJobs]);

  useEffect(() => {
    localStorage.setItem('vidya_saved_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('vidya_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const saveNote = (title: string, content: string, sourceType: SavedNote['sourceType']) => {
    const newNote: SavedNote = {
      id: `note_${Date.now()}`,
      studentId: 'user_student_1',
      title,
      content,
      sourceType,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const submitQuizAttempt = (attemptData: Omit<QuizAttempt, 'id'>): QuizAttempt => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `att_${Date.now()}`,
    };
    setAttempts((prev) => [newAttempt, ...prev]);
    return newAttempt;
  };

  const addMaterial = (material: ResourceItem, job?: ProcessingJob) => {
    setMaterials((prev) => [material, ...prev]);
    if (job) setProcessingJobs((prev) => [job, ...prev]);
  };

  const updateProcessingJob = (jobId: string, updates: Partial<ProcessingJob>) => {
    setProcessingJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, ...updates } : j)));
  };

  const approveMaterialContent = (resourceId: string, updatedContent: any) => {
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === resourceId
          ? {
              ...m,
              accessibilityStatus: 'approved',
              generatedContent: { ...updatedContent, teacherApproved: true },
            }
          : m
      )
    );
    setProcessingJobs((prev) =>
      prev.map((j) =>
        j.resourceId === resourceId
          ? {
              ...j,
              status: 'approved',
              progress: 100,
              currentStep: 'Approved & Published to Course Resources',
              generatedContent: { ...updatedContent, teacherApproved: true },
            }
          : j
      )
    );
  };

  const updateSharedAccommodation = (studentId: string, enabled: boolean) => {
    setSharedAccommodations((prev) =>
      prev.map((sa) => (sa.studentId === studentId ? { ...sa, enabled } : sa))
    );
  };

  return (
    <DataContext.Provider
      value={{
        courses,
        quizzes,
        attempts,
        materials,
        processingJobs,
        notes,
        notifications,
        sharedAccommodations,
        classes,
        assignments,
        saveNote,
        deleteNote,
        markNotificationRead,
        markAllNotificationsRead,
        submitQuizAttempt,
        addMaterial,
        updateProcessingJob,
        approveMaterialContent,
        updateSharedAccommodation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
