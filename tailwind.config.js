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
        // Primary accent: warm amber/copper — distinctive, premium
        primary: {
          DEFAULT: '#E8A045',
          hover: '#D4892E',
          light: '#F0BC74',
          dark: '#B8722A',
        },
        // Surface/structural tokens
        surface: {
          DEFAULT: '#161412',
          '50': '#F9F8F6',
          '100': '#ECE9E4',
          '200': '#D8D3CB',
          '300': '#B8B0A6',
          '400': '#8C8278',
          '500': '#635C54',
          '600': '#4A4440',
          '700': '#332E2B',
          '800': '#221E1C',
          '900': '#161412',
          '950': '#0D0B0A',
        },
        secondary: {
          DEFAULT: '#8C7D6F',
          hover: '#7A6D63',
          light: '#A09080',
          dark: '#5C5249',
        },
        accent1: {
          DEFAULT: '#E8A045',
          light: '#F0BC74',
          dark: '#B8722A',
        },
        accent2: {
          DEFAULT: '#C4936A',
          light: '#D4AE90',
          dark: '#9A7252',
        },
        bgLight: '#F5F4F2',
        bgDark: '#0D0B0A',
        textLight: '#1A1714',
        textDark: '#E8E4DE',
        borderLight: '#D0C9C0',
        borderDark: '#38322B',
      },
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        heading: ['"Bricolage Grotesque"', 'Manrope', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-sm': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
        'soft': '0 8px 30px -4px rgba(0,0,0,0.12), 0 2px 6px -1px rgba(0,0,0,0.04)',
        'soft-xl': '0 20px 50px -8px rgba(0,0,0,0.22)',
        'glow-primary': '0 0 40px rgba(232, 160, 69, 0.3)',
        'glow-secondary': '0 0 25px rgba(160, 144, 128, 0.25)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': 'left center' },
          '50%': { 'background-position': 'right center' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        reveal: {
          from: { opacity: 0, transform: 'translateY(32px) scale(0.98)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
