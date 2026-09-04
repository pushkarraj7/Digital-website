/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070B",
        deep: "#0A0F1C",
        surface: "#0D1526",
        brand: {
          DEFAULT: "#0C2959",
          light: "#163A73",
          dark: "#081A3D",
        },
        electric: "#4E86FF",
        ion: "#7FB4FF",
        ink: "#F3F5F9",
        mist: "#8C95A8",
        haze: "#5A6478",
        line: "rgba(243,245,249,0.08)",
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        body: ['"Inter"', "sans-serif"],
      },
      fontSize: {
        huge: [
          "clamp(3rem, 9vw, 9rem)",
          { lineHeight: "0.94", letterSpacing: "-0.03em" },
        ],
        "display-1": [
          "clamp(2.25rem, 5vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em" },
        ],
        "display-2": [
          "clamp(1.75rem, 3.4vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.015em" },
        ],
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
