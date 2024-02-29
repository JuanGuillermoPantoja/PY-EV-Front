import { url } from "inspector";

import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gradient-orange': 'linear-gradient(to right, #ff9800,#bb4c02)',
        'gradient-top-amber': 'linear-gradient(to bottom, #e27100 ,#bb4c02)'
      }),
      
      colors:{
        primary: "#333333",
        textBlack: "#1A1515",
        acent: "#ff9800",
        gold: "#AB6A09",

      },
      boxShadow:{
        complete: "0 0 10px",
      },
      
    },
  },
  plugins: [animations],
};
