/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1E0342",
        secondaryBg: "#0E46A3"
      },
      boxShadow: {
        lightBlueShadow: "#9AC8CD",
      },
      fontFamily: {
        primary: "Poppins",
        secondary: "Inter",
      },
      colors: {
        secondaryBlue: "#0E46A3",
      },
    },
  },
  plugins: [],
};
