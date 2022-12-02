/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor : {
        grayishBackground : '#f3f4f6',
        royalBlue : '#4f46e5'
      },
      colors: {
        royalBlue : '#4f46e5',
        regalBlue: '#304e73',
      }
    },
  },
  plugins: [],
}
