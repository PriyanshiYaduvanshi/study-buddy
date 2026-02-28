/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Fraunces', 'serif'],
      },
      colors: {
        cream: {
          50: '#fdfcf8',
          100: '#faf7f0',
          200: '#f4ede0',
        },
        ink: {
          900: '#1a1714',
          700: '#3d3830',
          500: '#6b6459',
          300: '#a89e93',
          100: '#d4cdc6',
        },
        amber: {
          accent: '#d97706',
          light: '#fef3c7',
          mid: '#fbbf24',
        },
        sage: {
          accent: '#4a7c59',
          light: '#f0f7f2',
        },
        rose: {
          accent: '#be4b6f',
          light: '#fdf2f5',
        },
        sky: {
          accent: '#2563eb',
          light: '#eff6ff',
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(26,23,20,0.06), 0 4px 12px rgba(26,23,20,0.04)',
        'card-hover': '0 4px 12px rgba(26,23,20,0.1), 0 8px 24px rgba(26,23,20,0.06)',
        'sidebar': '1px 0 0 rgba(26,23,20,0.07)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-dot': 'pulseDot 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseDot: { '0%,80%,100%': { transform: 'scale(0)' }, '40%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
