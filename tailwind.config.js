/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
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
      }
    },
  },
  plugins: [],
}
