/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./dashboard/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
      animation: {
        "ping-slow": "ping-slow 2s infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-stroke": {
          "-webkit-text-stroke-width": "1px",
        },
        ".text-stroke-white": {
          "-webkit-text-stroke-color": "#ffffff",
        },
        ".text-fill-white": {
          "-webkit-text-fill-color": "#ffffff",
        },
        ".text-fill-transparent": {
          "-webkit-text-fill-color": "transparent",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
