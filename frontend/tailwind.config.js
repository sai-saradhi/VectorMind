/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0b1120',
        cyanAccent: '#22d3ee',
      },
      boxShadow: {
        glow: '0 8px 24px rgba(34, 211, 238, 0.15)',
      },
    },
  },
  plugins: [],
};
