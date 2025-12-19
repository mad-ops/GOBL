/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gobl: {
          bg: '#ffffff', // Light
          surface: '#e2e8f0', // Slate-200
          primary: '#16a34a', // Green-600 (darker for contrast on light)
          warning: '#ca8a04', // Yellow-600
          error: '#ef4444',
          text: '#0f172a', // Slate-900
          muted: '#94a3b8', // Slate-400
        }
      },
      animation: {
        'pop': 'pop 0.1s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        }
      }
    },
  },
  plugins: [],
}
