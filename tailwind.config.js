/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
      extend: {
        keyframes: {
          scanDown: {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(250%)' }
          },
          scanUp: {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-250%)' }
          },
          scanVertical: {
            '0%': { transform: 'translateY(10%)' },
            '50%': { transform: 'translateY(90%)' },
            '100%': { transform: 'translateY(10%)' }
          },
          progress: {
            '0%': { width: '0%' },
            '100%': { width: '100%' }
          },
          'fade-in': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
          }
        },
        animation: {
          'fade-in': 'fade-in 0.3s ease-in-out'
        }
      },
    },
    plugins: [],
}