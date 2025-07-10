/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
          dark: '#020617'
        },
        secondary: {
          DEFAULT: '#1e293b',
          light: '#334155',
          dark: '#0f172a'
        },
        accent: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb'
        },
        highlight: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed'
        },
        // Light theme colors
        'light-primary': {
          DEFAULT: '#f8f9fa',
          light: '#ffffff',
          dark: '#e9ecef'
        },
        'light-secondary': {
          DEFAULT: '#e9ecef',
          light: '#f8f9fa',
          dark: '#dee2e6'
        },
        'light-accent': {
          DEFAULT: '#4361ee',
          light: '#4895ef',
          dark: '#3a0ca3'
        },
        'light-highlight': {
          DEFAULT: '#f72585',
          light: '#ff4d6d',
          dark: '#c9184a'
        }
      },
    },
  },
  plugins: [],
};