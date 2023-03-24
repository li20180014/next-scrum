/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: {
        '1/5': '20%',
        '1/2': '50%',
      },
      maxWidth: {
        calcSidebar: 'calc(100vw - 256px)',
        calcSidebarXl: 'calc(100vw - 384px)',
      },
      fontSize: {
        xxs: '0.8rem',
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#5e548e',
          700: '#231942',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
