export const commonTheme = {
	colors: {
		primary: '#FFF',
		secondary: '#777',
		tertiary: '#E6E6E6',
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
	bg: '#FFF',
	text: '#1E1E1E',
}

export const darkTheme = {
	bg: '#1E1E1E',
	text: '#FFF',
}

export const accentTheme = [
	{name: 'purple', color: {dark: '#BCAED5', light: '#E7E1F8'}},
	{name: 'blue', color: {dark: '#6997CC', light: '#C0D8F4'}},
	{name: 'green', color: {dark: '#087C7C', light: '#C6F4F4'}},
	{name: 'orange', color: {dark: '#E39D58', light: '#F9ECE4'}},
]