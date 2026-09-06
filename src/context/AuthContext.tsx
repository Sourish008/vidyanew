import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_STUDENT, DEMO_TEACHER } from '../services/seedData';
import * as authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loginAsStudent: () => void;
  loginAsTeacher: (teacherId: string, pass: string) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: 'student' | 'teacher') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vidya_user');
    return saved ? JSON.parse(saved) : DEMO_STUDENT; // Default to Alex for quick evaluation
  });

  const [token, setToken] = React.useState<string | null>(() => {
    return localStorage.getItem('vidya_token');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('vidya_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vidya_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('vidya_token', token);
    else localStorage.removeItem('vidya_token');
  }, [token]);

  // On mount, attempt to hydrate user from backend if token exists
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (token) {
        try {
          const remoteUser = await authService.getCurrentUser(token);
          if (mounted && remoteUser) setUser(remoteUser);
        } catch (e) {
          // ignore
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const loginAsStudent = () => {
    setUser(DEMO_STUDENT);
  };

  const loginAsTeacher = async (teacherId: string, pass: string): Promise<boolean> => {
    try {
      const result = await authService.teacherLogin(teacherId, pass);
      if (result && result.user) {
        setUser(result.user as User);
        setToken(result.token || null);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const switchDemoRole = (targetRole: 'student' | 'teacher') => {
    if (targetRole === 'student') setUser(DEMO_STUDENT);
    else setUser(DEMO_TEACHER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        loginAsStudent,
        loginAsTeacher,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
