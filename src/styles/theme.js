export const commonTheme = {
	colors: {
		primary: '#fff',
		secondary: '#777',
		tertiary: '#e6e6e6',
		quaternary: '#000',
	},

	// in px
	media: {
		desk: 1680,
		tabletA: 1280,
		mobile: 768,
	},

	// in px
	fontSizes: {
		title: {hugeDesk: 124, desk: 124, tabletA: 76, tabletP: 76, mobile: 48 },
		text: {hugeDesk: 18, desk: 18, tabletA: 16, tabletP: 16, mobile: 16 },
		tag: {hugeDesk: 16, desk: 16, tabletA: 16, tabletP: 16, mobile: 14 },
	},

	// in ms
	durations: {
		short: 300,
		middle: 600,
		long: 1000,
	},

	// in px
	indents: {
		hugeDesk: 40,
		desk: 40,
		tabletA: 24,
		tabletP: 24,
		mobile: 24
	},
}

export const lightTheme = {
	bg: '#fff',
	text: '#1e1e1e',
}

export const darkTheme = {
	bg: '#1e1e1e',
	text: '#fff',
}

export const accentTheme = [
	{name: 'purple', color: {dark: '#BCAED5', light: '#E5D5FF'}},
	{name: 'blue', color: {dark: '#6997CC', light: '#C7E1F7'}},
	{name: 'green', color: {dark: '#087C7C', light: '#A8EDED'}},
	{name: 'orange', color: {dark: '#E39D58', light: '#FFC994'}},
]