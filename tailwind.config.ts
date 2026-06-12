import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        primary: "#0B1120",
        blue: "#3B82F6",
        purple: "#8B5CF6",
        cyan: "#06B6D4",
        success: "#10B981",
        border: "rgba(148, 163, 184, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(59, 130, 246, 0.24)",
        panel: "0 24px 80px rgba(2, 6, 23, 0.55)"
      },
      backgroundImage: {
        "aurora-grid": "radial-gradient(circle at 20% 20%, rgba(59,130,246,.24), transparent 30%), radial-gradient(circle at 80% 10%, rgba(139,92,246,.18), transparent 28%), linear-gradient(rgba(148,163,184,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: [animate]
};

export default config;
