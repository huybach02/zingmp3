/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        textWhite: "#fff",
        textGrey: "#8b8791",
        primary: "#170f23",
        secondary: "#2a213a",
        third: "#40384e",
        control: "#130c1c",
        select: "#9b4de0",
        rightBar: "#120822",
        premium: "#e5ac1a",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px)",
            transform: "translateX(-500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left2":
          "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [],
};
