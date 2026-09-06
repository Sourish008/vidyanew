import { DEMO_STUDENT, DEMO_TEACHER } from './seedData';

export async function teacherLogin(teacherId: string, password: string) {
  try {
    const res = await fetch('/api/auth/teacher-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacherId, password }),
    });

    if (res.ok) {
      return res.json();
    }

    const body = await res.json().catch(() => ({}));
    if (res.status === 404) {
      throw new Error(body?.error || 'Login failed');
    }

    throw new Error(body?.error || 'Login failed');
  } catch (error) {
    const normalizedId = teacherId.trim().toUpperCase();
    const isDemoTeacher = normalizedId === DEMO_TEACHER.teacherId?.toUpperCase() && Boolean(password);

    if (isDemoTeacher) {
      return { user: DEMO_TEACHER, token: 'demo-teacher-token' };
    }

    throw error instanceof Error ? error : new Error('Login failed');
  }
}

export async function getCurrentUser(token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch('/api/me', { headers });
    if (!res.ok) {
      return token === 'demo-teacher-token' ? DEMO_TEACHER : DEMO_STUDENT;
    }

    const body = await res.json();
    return body.user ?? (token === 'demo-teacher-token' ? DEMO_TEACHER : DEMO_STUDENT);
  } catch (error) {
    return token === 'demo-teacher-token' ? DEMO_TEACHER : DEMO_STUDENT;
  }
}
