/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "rgba(0, 175, 255, 0.4)",
        "placeholder-color": "#A5A5A5",
        "border-color": "#DCDCDC",
        "white-color": "#ffffff",
        "hover-color": "rgba(0, 175, 255, 0.6)",
      },
    },
  },
  plugins: [],
};
