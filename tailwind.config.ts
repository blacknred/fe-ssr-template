import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        success: colors.green[700],
        danger: colors.red[600],
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        body: ['Inter', 'sans-serif'],
      },
      filter: ['hover', 'focus'],
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100% ': { opacity: '0.2' },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite',
        spin: 'spin 1s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    plugin(({ matchUtilities, theme }: any) => {
      matchUtilities(
        {
          'animation-delay': (value: string) => ({ 'animation-delay': value }),
        },
        {
          values: theme('transitionDelay'),
        },
      );
    }),
  ],
};
export default config;
