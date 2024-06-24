/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-500": "#3658f9",
        "primary-600": "#1c3fb7",
        secondary: "#293968",
        third: "#b1b6c8",
        fourth: "#D8D8DA",
        fifth: "#3658f9"
      }
    }
  },
  plugins: []
};
