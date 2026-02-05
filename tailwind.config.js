/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* DARK (DEFAULT – DO NOT TOUCH) */
        bg: "#0B1020",
        surface: "#121933",
        card: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.12)",

        /* LIGHT */
        lightBg: "#F7F8FC",
        lightSurface: "#FFFFFF",
        lightCard: "#F1F3F9",
        lightBorder: "#E2E6F0",
        lightText: "#0F172A",
        lightMuted: "#64748B",

        /* ACCENT */
        primary: "#7C7CFF",
        accent: "#9F7AEA",
      },
    },
  },
  plugins: [],
};
