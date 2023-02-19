const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      mono: ["Press Start 2P", ...defaultTheme.fontFamily.mono],
      sans: ["Raleway", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}
