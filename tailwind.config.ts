import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        graphite: "#111317",
        titanium: "#aeb6c2",
        frost: "#f7f8fb",
        electric: "#45a3ff",
      },
      boxShadow: {
        glow: "0 0 70px rgba(69, 163, 255, 0.28)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 80px rgba(0,0,0,0.34)",
      },
      fontFamily: {
        display: [
          "var(--font-sf)",
          "SF Pro Display",
          "Inter",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
