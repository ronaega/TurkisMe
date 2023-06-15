/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    container: {
      center: true,
      padding: '10px',
    },
    extend: {
      colors: {
        primary: '#3B7321',
        secondary: '#036666',
        gray: '#C7C7C7'
      },
      backgroundImage: {
        heroImg: "url('./assets/heroimg.png')"
      },

    },
  },
  plugins: [],
}

