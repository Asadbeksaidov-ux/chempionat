/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcf9',
          100: '#fbf8f1',
          200: '#f5efe0',
          300: '#ede2cb',
          400: '#dfcdad',
          500: '#cbb189',
        },
        forest: {
          50: '#f0f7f2',
          100: '#dceee1',
          200: '#bbdfc6',
          300: '#8ec8a3',
          400: '#5dac7d',
          500: '#3e8f60',
          600: '#2d724b',
          700: '#245b3c',
          800: '#1e4830',
          900: '#193c28',
          950: '#0b2116',
        },
        warmOrange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          500: '#f97316',
          600: '#ea580c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 4px 20px -2px rgba(0, 0, 0, 0.07), 0 2px 8px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(0, 0, 0, 0.09), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
