/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Pretendard'] },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        clearOut: {
          '0%': { transform: 'scaleX(1)', opacity: 1, height: '20rem' },
          '100%': { transform: 'scaleX(0)', opacity: 0, height: '0rem' },
        },
        clearIn: {
          '0%': { transform: 'scaleY(0)', height: '0rem' },
          '100%': { transform: 'scaleY(1)', height: '20rem' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out forwards',
        clearIn: 'clearIn 0.2s ease-in-out forwards',
        clearOut: 'clearOut 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
