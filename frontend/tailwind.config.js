/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary': '#0D0842',
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841'
      },
      fontFamily:{
        'primary': ["Afacad Flux", "sans-serif"],
        'secondary': ["Afacad Flux", "sans-serif"]
      },
      backgroundImage: {
        'pattern': "url('/android-chrome-512x512.jpg')", // Update with your image path
      },
      keyframes: {
        'move-diagonal': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '200px 200px' }, // Adjust movement distance as needed
        },
      },
      animation: {
        'move-diagonal': 'move-diagonal 15s linear infinite',
      },
    },
  },
  plugins: [],
}

