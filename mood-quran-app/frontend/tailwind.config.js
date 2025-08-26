/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#059669',
        accent: '#7c3aed',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        amiri: ['Amiri', 'Times New Roman', 'serif'],
        nastaliq: ['Noto Nastaliq Urdu', 'Arial', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #155e75 100%)',
      },
    },
  },
  plugins: [],
}