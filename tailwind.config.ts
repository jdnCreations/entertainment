import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "darkest-blue": "#10141e",
      red: "#FC4747",
      "light-blue": "#5a698f",
      "dark-blue": "#161d2f",
      white: "#ffffff",
    },
    fontSize: {
      "heading-l": "2rem",
      "heading-m": "1.5rem",
      "heading-s": "1.5rem",
      "heading-xs": "1.125rem",
      "body-m": "0.9375rem",
      "body-s": "0.8125rem",
    },
    fontWeight: {
      light: "300",
      medium: "500",
    },
  },
  plugins: [],
} satisfies Config;
