/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f0f23',
        'dark-card': '#1a1a2e',
        'dark-border': '#16213e',
        'accent-blue': '#3b82f6',
        'accent-purple': '#8b5cf6',
      }
    },
  },
  plugins: [],
}
