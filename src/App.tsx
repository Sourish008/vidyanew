import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { DataProvider } from './context/DataContext';

import { LandingPage } from './pages/LandingPage';
import { StudentLogin } from './pages/StudentLogin';
import { TeacherLogin } from './pages/TeacherLogin';
import { AccessRestrictedPage } from './pages/AccessRestrictedPage';

// Student Pages
import { AccessibilityAssessmentPage } from './pages/student/AccessibilityAssessmentPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentCoursesPage } from './pages/student/StudentCoursesPage';
import { CourseDetailPage } from './pages/student/CourseDetailPage';
import { LessonPage } from './pages/student/LessonPage';
import { QuizListPage } from './pages/student/QuizListPage';
import { QuizPlayerPage } from './pages/student/QuizPlayerPage';
import { QuizResultsPage } from './pages/student/QuizResultsPage';
import { AITutorPage } from './pages/student/AITutorPage';
import { SavedNotesPage } from './pages/student/SavedNotesPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentAccessibilitySettingsPage } from './pages/student/StudentAccessibilitySettingsPage';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherCoursesPage } from './pages/teacher/TeacherCoursesPage';
import { MaterialsUploadPage } from './pages/teacher/MaterialsUploadPage';
import { MaterialProcessingPage } from './pages/teacher/MaterialProcessingPage';
import { MaterialReviewPage } from './pages/teacher/MaterialReviewPage';
import { TeacherStudentsPage } from './pages/teacher/TeacherStudentsPage';
import { TeacherAssignmentsPage } from './pages/teacher/TeacherAssignmentsPage';
import { TeacherAnalyticsPage } from './pages/teacher/TeacherAnalyticsPage';

// Strict Role Protection Guards
const RequireStudentRole: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role !== 'student') return <AccessRestrictedPage />;
  return <>{children}</>;
};

const RequireTeacherRole: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/teacher-login" replace />;
  if (role !== 'teacher') return <AccessRestrictedPage />;
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<StudentLogin />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />

      {/* Student Protected Routes */}
      <Route
        path="/student/assessment"
        element={
          <RequireStudentRole>
            <AccessibilityAssessmentPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student"
        element={
          <RequireStudentRole>
            <StudentDashboard />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/courses"
        element={
          <RequireStudentRole>
            <StudentCoursesPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/courses/:courseId"
        element={
          <RequireStudentRole>
            <CourseDetailPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/courses/:courseId/lessons/:lessonId"
        element={
          <RequireStudentRole>
            <LessonPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/quizzes"
        element={
          <RequireStudentRole>
            <QuizListPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/quizzes/:quizId/take"
        element={
          <RequireStudentRole>
            <QuizPlayerPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/quizzes/:quizId/results"
        element={
          <RequireStudentRole>
            <QuizResultsPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/ai-tutor"
        element={
          <RequireStudentRole>
            <AITutorPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/notes"
        element={
          <RequireStudentRole>
            <SavedNotesPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/resources"
        element={
          <RequireStudentRole>
            <StudentCoursesPage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/profile"
        element={
          <RequireStudentRole>
            <StudentProfilePage />
          </RequireStudentRole>
        }
      />
      <Route
        path="/student/profile/accessibility"
        element={
          <RequireStudentRole>
            <StudentAccessibilitySettingsPage />
          </RequireStudentRole>
        }
      />

      {/* Teacher Protected Routes */}
      <Route
        path="/teacher"
        element={
          <RequireTeacherRole>
            <TeacherDashboard />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/courses"
        element={
          <RequireTeacherRole>
            <TeacherCoursesPage />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/materials"
        element={
          <RequireTeacherRole>
            <TeacherDashboard />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/materials/upload"
        element={
          <RequireTeacherRole>
            <MaterialsUploadPage />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/materials/:resourceId/processing"
        element={
          <RequireTeacherRole>
            <MaterialProcessingPage />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/materials/:resourceId/review"
        element={
          <RequireTeacherRole>
            <MaterialReviewPage />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/students"
        element={
          <RequireTeacherRole>
            <TeacherStudentsPage />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/assignments"
        element={
          <RequireTeacherRole>
            <TeacherAssignmentsPage />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/analytics"
        element={
          <RequireTeacherRole>
            <TeacherAnalyticsPage />
          </RequireTeacherRole>
        }
      />
      <Route
        path="/teacher/profile"
        element={
          <RequireTeacherRole>
            <StudentProfilePage />
          </RequireTeacherRole>
        }
      />

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<AccessRestrictedPage />} />
    </Routes>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <DataProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </AccessibilityProvider>
    </AuthProvider>
  );
}

export default App;
