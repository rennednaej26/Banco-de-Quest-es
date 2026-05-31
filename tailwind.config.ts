import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101216",
        paper: "#f7f8f5",
        line: "#d9ddd3",
        moss: "#49624a",
        coral: "#db6b57",
        steel: "#4e6f8f",
        saffron: "#d89b35"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(16, 18, 22, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
