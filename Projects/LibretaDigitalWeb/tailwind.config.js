/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "figma-green": "#1B720F",
        "figma-green-card": "#1B720F",
        "figma-blue": "#033F7E",
        "figma-blue-card": "#08509F",
        "figma-blue-button": "#08509F",
        "figma-light-blue-button": "#679BFF",
        "figma-purple": "#8D089F",
        "figma-purple-card": "#8D089F",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
