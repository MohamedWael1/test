import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: colors.red,
        secondary: colors.zinc,
      },
    },
  },
  plugins: [],
};
export default config;
