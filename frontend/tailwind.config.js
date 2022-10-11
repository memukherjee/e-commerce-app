/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    maxWidth: {
      '1/2': '50%',
      '7/10': '70%',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      pen: ['Sacramento', 'cursive'],
      ink: ['Great Vibes', 'cursive'],
    },
    extend: {
      fontSize: {
        'sm': '.25rem',
        'base': '.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
        '5xl': '5rem',
      },
      colors: {
        'light-black': 'rgba(0, 0, 0, 0.5)',
        'light-white': 'rgba(255, 255, 255, 0.5)',
      },
      spacing: {
        '1/2': '50%',
        '70vh': '70vh',
        '90vh': '90vh',
      }
    },
  },
  plugins: [],
}