import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
  ],
  theme: {
    fontSize: {
      "poppins-22.4-normal": [
        "13px",
        {
          letterSpacing: "normal",
          fontWeight: "400",
        },
      ],
      "d-large": [
        "57px",
        {
          lineHeight: "64px",
          letterSpacing: "-0.25px",
          fontWeight: "400",
        },
      ],
      "d-medium": [
        "45px",
        {
          lineHeight: "52px",
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],
      "d-small": [
        "36px",
        {
          lineHeight: "44px",
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],
      "h-large": [
        "32px",
        {
          lineHeight: "40px",
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],
      "h-medium": [
        "28px",
        {
          lineHeight: "36px",
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],
      "h-small": [
        "24px",
        {
          lineHeight: "32px",
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],
      "t-large": [
        "22px",
        {
          lineHeight: "28px",
          letterSpacing: "0px",
          fontWeight: "400",
        },
      ],
      "t-medium": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0.15px",
          fontWeight: "500",
        },
      ],
      "t-small": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0.1px",
          fontWeight: "500",
        },
      ],
      "b-large": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0.5px",
          fontWeight: "400",
        },
      ],
      "b-medium": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0.25px",
          fontWeight: "400",
        },
      ],
      "b-small": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0.4px",
          fontWeight: "400",
        },
      ],
      "l-large": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0.1px",
          fontWeight: "500",
        },
      ],
      "l-medium": [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: "0.5px",
          fontWeight: "500",
        },
      ],
      "l-small": [
        "11px",
        {
          lineHeight: "16px",
          letterSpacing: "0.5px",
          fontWeight: "500",
        },
      ],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#28a9df",
      },
    },
  },
  plugins: [nextui()],
};
export default config;
