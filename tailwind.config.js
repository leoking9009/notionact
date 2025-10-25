/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        notion: {
          gray: '#37352F',
          lightgray: '#F7F6F3',
          brown: '#9F6B53',
          orange: '#D9730D',
          yellow: '#CB912F',
          green: '#448361',
          blue: '#337EA9',
          purple: '#9065B0',
          pink: '#C14C8A',
          red: '#D44C47',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [],
}
