/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: '#180D3E',
        deepIndigo: '#4023A4',
      },
    },
  },
  plugins: [],
}

