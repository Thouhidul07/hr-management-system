/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple:    '#543884', // Deep Purple — sidebar, nav
          medium:    '#9A77CF', // Medium Purple — active/hover
          pink:      '#EC4176', // Paradise Pink — action buttons
          orange:    '#FFA45E', // Sandy Orange — pending/warning
          midnight:  '#262254', // Midnight Blue — high-hierarchy text
          bg:        '#F9FAFB', // Light background
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'brand-sm':  '0 4px 12px rgba(84,56,132,0.18)',
        'brand-md':  '0 8px 24px rgba(84,56,132,0.22)',
        'brand-lg':  '0 16px 40px rgba(84,56,132,0.25)',
        'pink-sm':   '0 4px 12px rgba(236,65,118,0.22)',
      },
      animation: {
        'fade-in':      'fadeIn 0.3s ease',
        'slide-down':   'slideDown 0.25s ease',
        'pulse-soft':   'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: 0, transform: 'translateY(-8px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%':       { opacity: 0.6 },
        },
      },
    },
  },
  plugins: [],
};
