import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				wallet: {
					light: '#F5F7FA',
					dark: '#1A1F2C',
					accent: '#3B82F6',
					accentLight: '#93C5FD',
					muted: '#8E9196',
					surface: 'rgba(255, 255, 255, 0.8)',
					efficientOutline: '#4ADE80',
					efficientBackground: '#F0FDF4',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom palette from image
				"grape": "#94618E",
				"eggplant": "#49274A",
				"sand": "#F4DECB",
				"shell": "#F8EEE7",
				wallet: {
					light: "#F8EEE7",
					accent: "#94618E",
					accentLight: "#F4DECB",
					surface: "#F4DECB", // softer sand
					muted: "#8E9196",
					efficientOutline: "#22c55e", // Green-500 from Tailwind
					efficientBackground: "#F0FDF4",
					cardShadow: "rgba(147, 97, 142, 0.14)", // grape shadow
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'blur-in': {
					'0%': { filter: 'blur(4px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-up': 'slide-up 0.3s ease-out forwards',
				'fade-in': 'fade-in 0.3s ease-out forwards',
				'pulse-subtle': 'pulse-subtle 2s infinite ease-in-out',
				'scale-in': 'scale-in 0.2s ease-out forwards',
				'blur-in': 'blur-in 0.3s ease-out forwards',
			},
			boxShadow: {
				glass: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
				card: '0 4px 18px 0 var(--wallet-card-shadow, rgba(147,97,142,0.25))',
				cardHover: '0 8px 24px 0 var(--wallet-card-shadow, rgba(147,97,142,0.33))',
				button: '0 2px 5px rgba(148, 97, 142, 0.16)',
				'wallet-elegant': '0 10px 28px -5px rgba(73,39,74,0.13), 0 10px 10px -5px rgba(244,222,203,0.08)'
			},
			backdropFilter: {
				'glass': 'blur(10px)',
			},
			backgroundImage: {
				'wallet-gradient':
					'linear-gradient(135deg, #94618E 0%, #49274A 48%, #F4DECB 99%)', 
				'sand': 'linear-gradient(to bottom, #F8EEE7 0%, #F4DECB 100%)',
			}
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
