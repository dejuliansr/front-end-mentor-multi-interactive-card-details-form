/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'body': ['"Hanken Grotesk"'],
      },
      backgroundImage: {
        'bg-card-back': "url('/images/bg-card-back.png')",
        'bg-card-front': "url('/images/bg-card-front.png')",
        'bg-main-desktop': "url('/images/bg-main-desktop.png')",
        'bg-main-monile': "url('/images/bg-main-mobile.png')",
        'Linear-gradient': 'hsl(249, 99%, 64%) to hsl(278, 94%, 30%)'
      },
      colors: {
        'White': 'hsl(0, 0%, 100%)',
        'Light-grayish-violet': 'hsl(270, 3%, 87%)',
        'Dark-grayish-violet': 'hsl(279, 6%, 55%)',
        'Very-dark-violet': 'hsl(278, 68%, 11%)',
        'Red-error': 'hsl(0, 100%, 66%)',
      }
    },
  },
  plugins: [],
}