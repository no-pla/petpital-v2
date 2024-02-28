import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#15b5bf",
      },
      boxShadow: {
        header: "0 4px 4px 0 rgba(0,0,0,0.1)",
        noReview: "0 1px 10px 0 rgba(0,0,0,0.1)",
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
