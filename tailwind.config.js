// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust paths based on your project structure
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // If you're still using pages
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Example color customization (blue)
        secondary: "#9333EA", // Example color customization (purple)
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Example custom font family
      },
    },
  },
  plugins: [],
};
