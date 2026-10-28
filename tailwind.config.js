/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        crimson: ['Crimson Pro', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        fantasy: {
          bg: '#080a0e',
          surface: '#0f1218',
          card: '#141821',
          cardHover: '#1a1f2b',
          border: '#262d3d',
          borderGold: '#524329',
          gold: '#c5a059',
          goldLight: '#e9d192',
          goldDark: '#856731',
          bronze: '#735738',
          crimson: '#881337',
          crimsonDark: '#4c0519',
          amber: '#d97706',
          parchment: '#e2d8c3',
          muted: '#8e887d',
        }
      },
      boxShadow: {
        'glow-gold': '0 0 20px -3px rgba(197, 160, 89, 0.3)',
        'glow-gold-lg': '0 0 35px -5px rgba(197, 160, 89, 0.45)',
        'glow-amber': '0 0 20px -3px rgba(217, 119, 6, 0.35)',
        'glow-crimson': '0 0 20px -3px rgba(136, 19, 55, 0.4)',
        'steam-card': '0 8px 24px -4px rgba(0, 0, 0, 0.75)',
        'vintage-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
