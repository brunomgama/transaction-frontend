import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        'light': '#EEEEEE',
        'over-light': '#D6D6D6',
        'selected-light': '#F08A5D',

        'dark': '#222831',
        'over-dark': '#393E46',
        'selected-dark': '#B4846C',

        'credit': '#508D4E',
        'debit': '#E76F51',

        'paid': '#508D4E',
        'pending': '#E76F51',
      },
      textColor: {
        'light': '#222831',
        'dark': '#EEEEEE',
      },
      borderColor: {
        'light': '#222831',
        'dark': '#EEEEEE',
      },
      ringColor: {
        'selected-light': '#B4846C',
        'selected-dark': '#F08A5D',
      },
      ringOffsetColor: {
        'dark': '#222831',
      },
      ringWidth: {
        DEFAULT: '2px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
