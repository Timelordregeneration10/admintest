import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "streamer-color": "linear-gradient(90deg, #03a9f4, #f441a5, #03a9f4)",
      },
      keyframes: {
        streamer: {
          "100%": {
            backgroundPosition: "-400%",
          },
        },
        brand: {
          "0%, 100%": {
            textShadow: "2px 2px 4px violet, -2px -2px 4px #91bef0",
          },
          "50%": {
            textShadow: "2px 2px 10px violet, -2px -2px 10px #91bef0",
          },
        },
        bluradd: {
          "0%": {
            filter: "blur(30px)",
          },

          "100%": {
            filter: "blur(300px)",
          },
        },
        pinkspread: {
          "0%": {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            backgroundColor: "rgba(20,20,20,0.6)",
          },

          "25%": {
            clipPath: "polygon(0 0, 30% 0, 60% 0, 40% 40%, 0 60%, 0 30%)",
            backgroundColor: "rgba(20,20,20,0.8)",
          },

          "50%": {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 40% 40%, 0 100%, 0 100%)",
            backgroundColor: "rgba(20,20,20,1)",
          },

          "75%": {
            clipPath:
              "polygon(0 0, 100% 0, 100% 30%, 70% 70%, 30% 100%, 0 100%)",
            backgroundColor: "rgba(20,20,20,0.8)",
          },

          "100%": {
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%, 0 100%)",
            backgroundColor: "rgba(20,20,20,0.6)",
          },
        },
        bluespread: {
          "0%": {
            clipPath: "polygon(0 0, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)",
            backgroundColor: "rgba(60,60,60,1)",
          },

          "25%": {
            clipPath:
              "polygon(40% 40%, 60% 0, 100% 0, 100% 100%, 0 100%, 0 60%)",
            backgroundColor: "rgba(60,60,60,1)",
          },

          "50%": {
            clipPath:
              "polygon(40% 40%, 100% 0, 100% 0, 100% 100%, 0 100%, 0 100%)",
            backgroundColor: "rgba(60,60,60,1)",
          },

          "75%": {
            clipPath:
              "polygon(70% 70%, 100% 30%, 100% 65%, 100% 100%, 65% 100%, 30% 100%)",
            backgroundColor: "rgba(60,60,60,1)",
          },

          "100%": {
            clipPath:
              "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            backgroundColor: "rgba(60,60,60,1)",
          },
        },
      },
      animation: {
        streamer: "streamer 5s infinite linear",
        brand: "brand 2s infinite linear",
        bluradd: "bluradd 11s infinite linear alternate",
        pinkspread: "pinkspread 11s infinite linear alternate",
        bluespread: "bluespread 11s infinite linear alternate",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
