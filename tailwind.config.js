/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#d5d5d5',
        'vietnam-green': '#2a9d8f',
        'book-purple': '#a78bfa',
        'pen-green': '#34d399',
        'book2-blue': '#60a5fa',
      },
    },
  },
  plugins: [],
}