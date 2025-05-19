/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          bg: {
            primary: "#1A1D1A",
            surface: "#222524",
          },
          text: {
            primary: "#F1F1F1",
            secondary: "#C9C9C9",
          },
          border: {
            DEFAULT: "#2E2E2E",
          },
          brand: {
            100: "#9BD4B5",
            400: "#51B883",
            600: "#197A4B",
            700: "#1D8B56",
          },
          error: {
            500: "#E65A5A",
          },
          warm: {
            500: "#F0B429",
          },
          link: {
            500: "#3A8DFF",
          },
          semantic: {
            todayBand: "#9BD4B5",
            hoverBg: "#9BD4B5",
            selectedBg: "#9BD4B5",
            overlay: "#1D8B56",
            errorBg: "#E65A5A",
            linkBanner: "#3A8DFF",
            scrim: "#1A1D1A",
          },
          label: {
            gray: "#757575",
            blue: "#3949AB",
            green: "#00897B",
            yellow: "#FFB300",
            orange: "#F4511E",
            purple: "#8E24AA",
          },
        },
      },
    },
    plugins: [],
  };
  