/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary_pale': '#4f77aa',
        'neutral_grey': '#a2acbd',
        'accent_blue': '#0099c5',
        //dark mode
        'primary_pale_dark':'#3e4756',
        'neutral_blue_dark':'#324865',

      }
    },
  },
  plugins: [],
}
