import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), "prettier-plugin-tailwindcss"],
} satisfies Config;
