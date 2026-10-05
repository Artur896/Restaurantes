import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: "#15120F",
          soft: "#1E1A16",
          mute: "#2A2521",
        },
        cream: {
          DEFAULT: "#F6F1E7",
          soft: "#EFE7D6",
        },
        sand: "#E3D5B8",
        gold: {
          DEFAULT: "#C6A15B",
          soft: "#D8BE8B",
        },
        wine: {
          DEFAULT: "#6B1E2B",
          deep: "#4A1420",
          light: "#8C2E3D",
        },
        forest: "#1F2E26",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(0,0,0,0.45)",
        glow: "0 0 0 1px rgba(198,161,91,0.25), 0 20px 50px -20px rgba(198,161,91,0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
