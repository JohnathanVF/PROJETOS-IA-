/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gamer: {
          bg: '#0a0d14',
          surface: '#111726',
          card: '#161f36',
          cardBorder: '#233054',
          accent: '#7c3aed', // Purple neon
          accentHover: '#9061f9',
          cyan: '#06b6d4', // Cyan neon
          neonGreen: '#10b981',
          danger: '#ef4444',
          muted: '#94a3b8',
        }
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(124, 58, 237, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
}
