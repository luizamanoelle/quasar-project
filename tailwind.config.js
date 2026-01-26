/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['body--dark'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      accent: 'var(--accent)',

      dark: 'var(--dark)',

      positive: 'var(--positive)',
      negative: 'var(--negative)',
      info: 'var(--info)',
      warning: 'var(--warning)',

      'dark-page': '#121212',
    },
  },
  plugins: [],
};
