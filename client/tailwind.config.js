/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  './index.html',
	  './src/**/*.{js,ts,jsx,tsx,css}', // Include src, including src/Components/magicui
	  './components/**/*.{js,ts,jsx,tsx}', // Include Shadcn/UI components
	  './lib/**/*.{js,ts,jsx,tsx}' // Include utilities
	],
	theme: {
	  extend: {
		scrollbar: ['rounded'],
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: 'hsl(var(--card))',
		  'card-foreground': 'hsl(var(--card-foreground))',
		  popover: 'hsl(var(--popover))',
		  'popover-foreground': 'hsl(var(--popover-foreground))',
		  primary: 'hsl(var(--primary))',
		  'primary-foreground': 'hsl(var(--primary-foreground))',
		  secondary: 'hsl(var(--secondary))',
		  'secondary-foreground': 'hsl(var(--secondary-foreground))',
		  muted: 'hsl(var(--muted))',
		  'muted-foreground': 'hsl(var(--muted-foreground))',
		  accent: 'hsl(var(--accent))',
		  'accent-foreground': 'hsl(var(--accent-foreground))',
		  destructive: 'hsl(var(--destructive))',
		  'destructive-foreground': 'hsl(var(--destructive-foreground))',
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		fontFamily: {
		  sans: ['Inter', 'sans-serif'],
		},
	  },
	},
	plugins: [
	  require('tailwindcss-animate','tailwind-scrollbar'),
	],
  };