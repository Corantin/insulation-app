// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0e0e11", // dark background
          soft: "#1a1a1f",
          strong: "#000000",
        },
        surface: {
          DEFAULT: "#1d1f23", // main card surfaces
          muted: "#2a2c31",
          hover: "#2f3237",
        },
        border: "#3b3e45",
        accent: {
          DEFAULT: "#7dd3fc", // sky-blue highlight
          muted: "#60a5fa",
          subtle: "#bae6fd",
        },
        text: {
          base: "#e4e4e7",
          muted: "#a1a1aa",
          subtle: "#71717a",
          inverted: "#0e0e11",
        },
        success: "#22c55e",
        warning: "#facc15",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 4px rgba(0, 0, 0, 0.2)",
        deep: "0 2px 10px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
