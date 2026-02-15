/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vtc-purple': '#392e4e',
        'vtc-neon': '#FF9FFC',
        'vtc-dark': '#0a0a0f',
      },
    },
  },
  plugins: [],
}
