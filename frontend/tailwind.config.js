/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B0F14",
          900: "#10151C",
          800: "#161D27",
          700: "#212A37",
          600: "#2E3A4A",
          500: "#465268",
          400: "#6B7A90",
          300: "#98A5B8",
          200: "#C7D0DC",
          100: "#E6EAF0",
        },
        amber: {
          500: "#E0A039",
          400: "#EAB65D",
        },
        moss: {
          500: "#5C8D6B",
        },
        clay: {
          500: "#C1673F",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
