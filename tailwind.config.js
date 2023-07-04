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
        progress: "#595460",
        hover: "#282230",
        bgIcon: "#2f2739",
      },
      backgroundColor: {
        "overlay-40%": "rgba(0,0,0,0.4)",
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
        "rotate-center": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
        "rotate-center-pause": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
            "border-radius": "99999px",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
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
        "rotate-center": "rotate-center 7s linear infinite",
        "rotate-center-pause": "rotate-center-pause 1s linear 1 both",
      },
    },
  },
  plugins: [],
};
