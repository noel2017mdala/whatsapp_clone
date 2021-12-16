module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    screens: {
      sm: "60px",
      // => @media (min-width: 576px) { ... }

      md: "640px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        main: "#00BFA5",
        mainHover: "#089985",
        darkMain: "#131C21",
        darkSecondary: "#262D31",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
