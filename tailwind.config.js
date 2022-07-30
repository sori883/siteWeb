module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
   extends: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  daisyui: {
    themes: ['dracula'],
  },
}
