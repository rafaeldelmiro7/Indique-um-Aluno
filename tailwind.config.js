/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdaff",
          300: "#8ec3ff",
          400: "#59a3ff",
          500: "#2f7ffb",
          600: "#1a5ff0",
          700: "#154bd6",
          800: "#183fac",
          900: "#193887",
        },
      },
    },
  },
  plugins: [],
};
