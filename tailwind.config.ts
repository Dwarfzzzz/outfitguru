import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgb(255, 111, 97)",
          light: "rgb(255, 182, 174)",
          dark: "rgb(204, 89, 78)",
        },
        secondary: {
          DEFAULT: "rgb(186, 201, 186)",
          light: "rgb(218, 227, 218)",
          dark: "rgb(149, 161, 149)",
        },
        cream: {
          DEFAULT: "rgb(255, 248, 240)",
          dark: "rgb(245, 238, 230)",
        },
        charcoal: {
          DEFAULT: "rgb(51, 51, 51)",
          light: "rgb(102, 102, 102)",
        },
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;