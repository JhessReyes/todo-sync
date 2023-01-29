/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				light: {
					primary: '#439A97',
					secondary: '#62B6B7',
					accent: '#CBEDD5',
					neutral: '#97DECE',
					'base-100': '#FCFCFD',
					info: '#93E7FB',
					success: '#81CFD1',
					warning: '#EFD7BB',
					error: '#E58B8B',
					'color-scheme': 'light'
				},

				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=business]'],
					neutral: "#81CFD1",
					'--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
					'--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
					'--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
					'--animation-btn': '0.25s', // duration of animation when you click on button
					'--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
					'--btn-text-case': 'uppercase', // set default text transform for buttons
					'--btn-focus-scale': '0.95', // scale transform of button when you focus on it
					'--border-btn': '1px', // border width of buttons
					'--tab-border': '1px', // border width of tabs
					'--tab-radius': '0.5rem', // border radius of tabs
					'color-scheme': 'dark'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
