/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    maxWidth: {
      200: "200px",
      300: "300px",
      450: "450px",
      500: "500px",
      750: "750px",
      1000: "1000px",
      1200: "1200px",
      "1/2": "50%",
      "3/10": "30%",
      "7/10": "70%",
      "100vw": "100vw",
    },
    minHeight: {
      "3/4": "75%",
      500: "500px",
      200: "200px",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      pen: ["Sacramento", "cursive"],
      ink: ["Great Vibes", "cursive"],
    },
    extend: {
      fontSize: {
        sm: ".25rem",
        base: ".75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "4rem",
        "5xl": "5rem",
      },
      spacing: {
        "1/2": "50%",
        "1/20": "5%",
        "70vh": "70vh",
        "40vh": "40vh",
        "90vh": "90vh",
        "100vh": "100vh",
        400: "400px",
      },
      backdropBlur: {
        xs: '1px',
      }
    },
  },
  plugins: [],
};
