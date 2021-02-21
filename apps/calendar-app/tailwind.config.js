module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: 'Teko, sans-serif',
        serif: 'Barlow Condensed, sans-serif',
        mono: 'IBM Plex Mono, monospace'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
