/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          page: "#0c1016",
          card: "#141a22",
          border: "#253041",
          textPrimary: "#f1f5f9",
          textSecondary: "#94a3b8",
          accent: "#ff3b30",
          accentHover: "#ff5c52",
          danger: "#ef4444",
          success: "#22c55e",
        }
      }
    },
  },
  plugins: [],
};