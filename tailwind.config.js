import { url } from "inspector";

import animations from "@midudev/tailwind-animations";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "gradient-orange": "linear-gradient(to right, #ff9800,#bb4c02)",
        "gradient-top-amber": "linear-gradient(to bottom, #e27100 ,#bb4c02)",
        "bg-linear-trhee-color":  'linear-gradient(90deg, #ff9800 19%, #e27100 47%, #983a08 82%, #481700 97%)',
      }),
      dropShadow: {
        complete: "0 0 10px rgba(0, 0, 0, 1)",
      },
      colors: {
        primary: "#333333",
        textBlack: "#1A1515",
        acent: "#ff9800",
        gold: "#AB6A09",
        gradientOrange: "linear-gradient(to right, #ff9800,#bb4c02)",
      },
      boxShadow: {
        complete: "0 0 10px",
      },
    },
  },
  plugins: [animations],
};
