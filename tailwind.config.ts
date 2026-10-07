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
        // Premium White Restaurant App palette (customer-facing redesign).
        // Admin dashboard keeps the carbon/cream/gold palette above untouched.
        ivory: {
          DEFAULT: "#FBFAF8",
          soft: "#F6F3ED",
          deep: "#F0EBE1",
        },
        graphite: {
          DEFAULT: "#1C1B19",
          soft: "#403C36",
          mute: "#8A8378",
        },
        champagne: {
          DEFAULT: "#C9A96A",
          soft: "#E3D4B4",
          line: "#DED0B2",
        },
        stone: {
          line: "#E7E2D8",
          soft: "#F1ECE2",
        },
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
        silk: "0 2px 10px -4px rgba(28,27,25,0.08), 0 16px 40px -20px rgba(28,27,25,0.12)",
        silkLg: "0 24px 70px -30px rgba(28,27,25,0.22)",
        champagneGlow: "0 0 0 1px rgba(201,169,106,0.4), 0 10px 30px -12px rgba(201,169,106,0.35)",
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
        floatSoft: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.5s linear infinite",
        floatSoft: "floatSoft 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
