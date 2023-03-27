/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        '128': '32rem',
      },
      colors: {
        'slate' : {
          850: '#1A2032'
        }
      },
      transitionProperty: {
        'height': 'max-height',
        'width' : 'max-width'
      }
    },
  },
  plugins: [require('tailwind-scrollbar'),
],
}
