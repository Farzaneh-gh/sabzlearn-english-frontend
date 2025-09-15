/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "home-desktop": "url('/src/assets/images/background_landing.jfif')",
        "category-item1":
          "linear-gradient(270deg, rgba(0, 0, 0, 0.6) 33.85%, rgba(0, 0, 0, 0.1) 100%), url('/src/assets/images/categories/category-right.jpg')",
        "category-item2":
          "linear-gradient(270deg, rgba(0, 0, 0, 0.6) 33.85%, rgba(0, 0, 0, 0.1) 100%), url('/src/assets/images/categories/category-left.jpg')",
      },
    },
  },
  plugins: [],
};
