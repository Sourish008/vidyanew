import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';
import { DEMO_TEACHER, DEMO_STUDENT, SEEDED_COURSES } from './src/services/seedData';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    // Add lightweight dev middleware to mock a minimal backend for auth and teacher APIs
    middlewareMode: false,
    // Use configure to add simple endpoints
    configureServer(server) {
      // Lightweight JSON body parser for dev endpoints
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
          let data = '';
          req.on('data', (chunk) => (data += chunk));
          req.on('end', () => {
            try {
              (req as any).body = data ? JSON.parse(data) : {};
            } catch (e) {
              (req as any).body = {};
            }
            next();
          });
          return;
        }
        next();
      });

      server.middlewares.use((req, res, next) => {
        // Mock /api/auth/teacher-login
        if (req.url === '/api/auth/teacher-login' && req.method === 'POST') {
          const body = (req as any).body || {};
          const { teacherId, password } = body;
          // Very small mock: validate teacherId exactly matches demo teacher.
          if (teacherId && teacherId.toUpperCase() === DEMO_TEACHER.teacherId) {
            const token = 'demo-teacher-token';
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ user: DEMO_TEACHER, token }));
            return;
          }
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'INVALID_CREDENTIALS' }));
          return;
        }

        // Mock /api/me
        if (req.url === '/api/me' && req.method === 'GET') {
          const auth = req.headers['authorization'];
          if (auth === 'Bearer demo-teacher-token') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ user: DEMO_TEACHER }));
            return;
          }
          // default: return demo student for unauthenticated demo
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ user: DEMO_STUDENT }));
          return;
        }

        // Mock teacher courses endpoint that enforces teacher token
        if (req.url === '/api/teacher/courses' && req.method === 'GET') {
          const auth = req.headers['authorization'];
          if (auth !== 'Bearer demo-teacher-token') {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'FORBIDDEN' }));
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ data: SEEDED_COURSES.filter((c) => c.teacherId === DEMO_TEACHER.id) }));
          return;
        }

        next();
      });
    },
  },
});
