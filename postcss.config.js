const tailwindPostcss = require('@tailwindcss/postcss')
const autoprefixer    = require('autoprefixer')

module.exports = {
  plugins: {
    // Tailwind v4 以降はこのキー名で読み込みます
    '@tailwindcss/postcss': {},
    // autoprefixer はそのまま
    autoprefixer: {},
  },
};

