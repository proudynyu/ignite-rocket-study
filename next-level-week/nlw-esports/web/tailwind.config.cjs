/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"]
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 42.08%, #43E7AD 55.94%, #E1D55D 35.57%)', 
        'game-gradient': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 67.08%)'
      }
    }
  },
  plugins: [],
};
