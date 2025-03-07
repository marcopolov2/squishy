// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        violet: {
          50: "#faf5ff",
          100: "#f4e8ff",
          200: "#ebd5ff",
          300: "#dbb4fe",
          400: "#c384fc",
          500: "#aa55f7",
          600: "#9333ea",
          700: "#7c22ce",
          800: "#6821a8",
          900: "#541c87",
          950: "#380764",
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
