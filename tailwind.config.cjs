/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.{js,ts}",
    "node_modules/react-daisyui/dist/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      screens: {
        tall: { raw: "(min-height: 755px)" },
      },
      colors: {
        discord: "#7289DA",
        twitter: "#1DA1F2",
        twitch: "#6441A4",
        spotify: "#1DB954",
      },
    },
  },
  plugins: [require("daisyui")],
};
