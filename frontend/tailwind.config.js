/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brasil: {
          green: '#009C3B',
          yellow: '#FFDF00',
          blue: '#002776',
        },
      },
    },
  },
  plugins: [],
}
