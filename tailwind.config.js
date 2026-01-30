/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'body--dark'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '600px',
        md: '1024px',
        lg: '1440px',
        xl: '1920px',
      },

      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: 'var(--primary)',

        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        positive: 'var(--positive)',
        negative: 'var(--negative)',
        info: 'var(--info)',
        warning: 'var(--warning)',
      },
    },
  },
  plugins: [],
};
