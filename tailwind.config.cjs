/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      navy: "#1C315E",
      hijau: "#227C70",
      mint: "#88A47C",
      putih: "#E6E2C3",
      black: "#000000",
      grey: "#666666",
      white: "#ffffff",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
