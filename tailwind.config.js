/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-red': '#781b2b',
        'theme-purple': '#241e4e',
        'theme-yellow': '#f5a549',
        'theme-khaki': '#2e382e',
        'theme-pearl': '#0d1f22',
      },

    },
  },
  plugins: [],
}