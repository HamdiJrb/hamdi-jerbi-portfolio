/** @type {import('tailwindcss').Config} */
// Themed tokens: values live in globals.css (:root = light, .dark = dark)
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary accent: sage. Themed so it stays legible on both grounds.
        primary: {
          DEFAULT: token('sage'),
          hover: token('sage-hover'),
          light: token('sage-light'),
          dark: token('sage-dark'),
        },
        // Text/icon colour that sits on a primary-filled surface
        'on-primary': token('on-primary'),

        // Olive surface scale (light end → dark end)
        surface: {
          DEFAULT: '#22251E',
          '50': '#EEEEE5',
          '100': '#DADBCD',
          '200': '#C4C6B4',
          '300': '#A9AB97',
          '400': '#86897A',
          '500': '#64685A',
          '600': '#4A4E42',
          '700': '#3A3E33',
          '800': '#2C3028',
          '850': '#272A22',
          '900': '#22251E',
          '950': '#161813',
        },
        // Muted greys re-tuned toward olive so secondary text matches the palette
        slate: {
          '50': '#F3F3EC',
          '100': '#E6E6DC',
          '200': '#D2D2C3',
          '300': '#C2BFAC',
          '400': '#A9A693',
          '500': '#7F7D6C',
          '600': '#55594C',
          '700': '#3F4338',
          '800': '#2C3028',
          '900': '#1C1F19',
          '950': '#141611',
        },
        secondary: {
          DEFAULT: '#7F7D6C',
          hover: '#64685A',
          light: '#A9A693',
          dark: '#4A4E42',
        },
        accent1: {
          DEFAULT: token('sage'),
          light: token('sage-light'),
          dark: token('sage-dark'),
        },
        accent2: {
          DEFAULT: '#A9A693',
          light: '#C2BFAC',
          dark: '#7F7D6C',
        },
        bgLight: '#E4E4D8',
        bgDark: '#1A1C17',
        textLight: '#1C1F19',
        textDark: '#EAE3D2',
        borderLight: '#C4C6B4',
        borderDark: '#3A3E33',

        // Semantic tokens used by the hero
        ground: token('ground'),
        fg: token('fg'),
        muted: token('muted'),
        line: token('line'),
        sage: token('sage'),
        moss: token('moss'),
        backdrop: token('backdrop'),
        'on-moss': token('on-moss'),
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
        'glow-primary': '0 0 40px rgba(138, 150, 120, 0.3)',
        'glow-secondary': '0 0 25px rgba(169, 166, 147, 0.25)',
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
