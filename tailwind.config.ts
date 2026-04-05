import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },

      colors: {
        /* ========= BASE BACKGROUND SYSTEM ========= */
        cream: {
          50: '#FFFCF8',
          100: '#FEFAF4',
          200: '#FBF4E6',
          300: '#F8EBD7',
          400: '#F5E1C7',
          500: '#F1D6B5',
          600: '#E3C39E',
          700: '#CDA882',
          800: '#A98A67',
          900: '#7F6A4F',
          DEFAULT: '#FEFAF4',
          dark: '#F5EDD8',
        },

        /* ========= DARK TEXT / PREMIUM CONTRAST ========= */
        bark: {
          50: '#EEE9E4',
          100: '#D7CEC4',
          200: '#B8AA99',
          300: '#998675',
          400: '#7A6455',
          500: '#5C3D11',
          600: '#4A310E',
          700: '#38250B',
          800: '#261807',
          900: '#1C1207',
          DEFAULT: '#1C1207',
          light: '#5C3D11',
        },

        /* ========= PRIMARY BRAND (NATURE GREEN) ========= */
        forest: {
          50: '#EEF6EA',
          100: '#D6EAD0',
          200: '#B7D8AD',
          300: '#97C589',
          400: '#78B266',
          500: '#4A7C26',
          600: '#3E6820',
          700: '#2D5016',
          800: '#203A10',
          900: '#15260A',
          DEFAULT: '#2D5016',
          light: '#4A7C26',
        },

        /* ========= LUXURY ACCENT (GOLD) ========= */
        gold: {
          50: '#FFF8E1',
          100: '#FDEFC2',
          200: '#FBE39A',
          300: '#F8D871',
          400: '#F4C84A',
          500: '#D4A017',
          600: '#B98913',
          700: '#9E7310',
          800: '#7C590C',
          900: '#5C4209',
          DEFAULT: '#D4A017',
          light: '#EFC84A',
        },

        /* ========= CTA / HIGHLIGHT ========= */
        terra: {
          50: '#FDF0EA',
          100: '#F9D4C6',
          200: '#F4B79F',
          300: '#EE9A78',
          400: '#E8835A',
          500: '#C4622D',
          600: '#A55225',
          700: '#86421E',
          800: '#673216',
          900: '#47220F',
          DEFAULT: '#C4622D',
          light: '#E8835A',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-in': 'slideIn 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
