const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "components/**/*.vue",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
  ],
  theme: {
    fontFamily: {
      mono: ["\"Press Start 2P\"", ...defaultTheme.fontFamily.mono],
      sans: ["Raleway", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      backgroundImage: {
        "sunset-gradient": "linear-gradient(180deg, rgba(222,77,170,1) 0%, rgba(222,77,170,1) 13%, rgba(225,94,153,1) 13%, rgba(225,94,153,1) 26%, rgba(228,111,136,1) 26%, rgba(228,111,136,1) 38%, rgba(231,127,120,1) 38%, rgba(231,127,120,1) 50%, rgba(234,143,104,1) 50%, rgba(234,143,104,1) 63%, rgba(237,161,87,1) 63%, rgba(237,161,87,1) 75%, rgba(240,177,71,1) 75%, rgba(240,177,71,1) 87%, rgba(243,193,56,1) 87%, rgba(246,211,39,1) 100%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
  ],
};
