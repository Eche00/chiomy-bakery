/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],

  theme: {
    extend: {},
    screens: {
      sm: "900px", // desktop view
      md: "750px", // tablet view
    },
  },
  plugins: [flowbite.plugin()],
};
