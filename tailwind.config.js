/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        floatAndZoom: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-0.5rem) scale(1.05)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        extend: {
  keyframes: {
    floatAndZoom: {
      '0%, 100%': { transform: 'translateY(0) scale(1)' },
      '50%': { transform: 'translateY(-0.5rem) scale(1.05)' },
    },
  },
  animation: {
    float: 'floatAndZoom 3s ease-in-out infinite',
    spinSlower: 'spin 12s linear infinite',
    spinSlow: 'spin 6s linear infinite',
  },
},

      },
      animation: {
        float: 'floatAndZoom 3s ease-in-out infinite',
        'spin-slow': 'spinSlow 10s linear infinite',
        'spin-slower': 'spinSlow 20s linear infinite',
      },
    },
  },
  plugins: [],
};
