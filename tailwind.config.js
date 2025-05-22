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
        primary: '#FF3F56',
        secondary: '#2B3AED',
        accent: '#FFE03D',
        muted: '#F3F3F3',
      },
      boxShadow: {
        brutal: '5px 5px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
  safelist: ['shadow-brutal', 'shadow-brutal-lg', 'shadow-brutal-xl'],
}
