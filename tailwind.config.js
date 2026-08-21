/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        burtons: 'burtons',
      },
      colors: {
        surface: {
          DEFAULT: 'var(--bg)',
          elevated: 'var(--bg-elev)',
        },
        content: {
          DEFAULT: 'var(--fg)',
          muted: 'var(--fg-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          warm: 'var(--accent-warm)',
          'warm-soft': 'var(--accent-warm-soft)',
          'warm-border': 'var(--accent-warm-border)',
        },
        divider: 'var(--border)',
        link: {
          DEFAULT: 'var(--link)',
          hover: 'var(--link-hover)',
        },
      },
      maxWidth: {
        measure: 'var(--measure-narrow)',
        'measure-wide': 'var(--measure-wide)',
        'measure-page': 'var(--measure-page)',
      },
      zIndex: {
        nav: '100',
        modal: '200',
        toast: '300',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'clip-reveal': {
          from: { clipPath: 'inset(0 0 100% 0)' },
          to: { clipPath: 'inset(0 0 0% 0)' },
        },
      },
      animation: {
        'clip-reveal': 'clip-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
