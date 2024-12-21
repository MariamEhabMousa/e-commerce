/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: {
          50: "#85d685",
          100: "#6cce6c",
          200: "#54c654",
          300: "#3bbd3b",
          400: "#23b523",
          500: "#0aad0a",
          600: "#099c09",
          700: "#088a08",
          800: "#077907",
          900: "#066806",
          950: "#055705",
        }
      },
      fontFamily: {
        cairo: 'Cairo Variable',
      },
      screens: {
        "2xl": "1320px"
      }
    },
  },
  plugins: [],
}

