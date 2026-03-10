/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a3c2e',
          light: '#2d6b4f',
          50: '#f0f7f3',
          100: '#d8ede2',
          200: '#b4dac6',
          900: '#0d1e17',
        },
        blue: {
          brand: '#2a7fbf',
          light: '#4fa3e0',
          pale: '#f0f7ff',
        },
        gold: {
          DEFAULT: '#e8b94f',
          light: '#f5d88a',
          dark: '#c9922a',
        },
        surface: '#f7faf8',
        muted: '#6b7f74',
        border: '#e2ece6',
        foreground: '#0f1a14',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.06)',
        'medium': '0 8px 40px rgba(0,0,0,0.1)',
        'strong': '0 20px 60px rgba(0,0,0,0.15)',
        'green': '0 12px 40px rgba(26, 60, 46, 0.25)',
        'green-lg': '0 20px 60px rgba(26, 60, 46, 0.35)',
        'blue': '0 12px 40px rgba(42, 127, 191, 0.25)',
        'gold': '0 12px 40px rgba(232, 185, 79, 0.3)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};