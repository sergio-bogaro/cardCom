/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      },
      colors: {
        'slate' : {
          850: '#1B2636'
        }
      },
      transitionProperty: {
        'height': 'max-height'
      }
    },
  },
  plugins: [require('tailwind-scrollbar'),
],
}
