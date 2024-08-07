/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whiteCustom: "#f6f6f6",
        black: "#000000",
        blackTransparent60: "rgba(0, 0, 0, 0.6)",
        peach: "#f9e6c5",
        rose: "#ffc6c6",
        skyBlue: "#b5c8d1",
      },
      fontFamily: {
        karla: ["karla", "Montserrat"],
      },
    },
  },
  plugins: [],
};
