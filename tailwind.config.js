/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Catalystの色
        // ...他にも色があれば追加
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Catalystのフォント
      },
    },
  },
  plugins: [],
}
