/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6',
          indigo: '#4F46E5',
          darkBg: '#111827',
          darkSurface: '#1F2937',
          lightBg: '#F8FAFC',
          lightSurface: '#FFFFFF',
          textPrimary: '#1F2937',
          textSecondary: '#64748B',
          border: '#CBD5E1',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.06)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
