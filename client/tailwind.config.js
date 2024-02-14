/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg': 'var(--background)',
        'bg-secondary': 'var(--foreground)',
        'text-1': 'var(--primary)',
        'text-2': 'var(--secondary)',
        'border': 'var(--border)',
        'input': 'var(--input)',
        'accent': 'var(--accent)',
        'card': 'var(--card)',
      },
    },
  },
  plugins: [],
};
