/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Poppins",
        secondary: "Inter",
      },
      colors: {
        secondaryBlue: "#0E46A3"
      },
      backgroundColor: {
        primary: "#1E0342",
        secondarybg: "#0E46A3",
      },
      boxShadowColor: {
        lightblueshadow: "#E1F7F5",
      },
    },
  },
  plugins: [],
};
