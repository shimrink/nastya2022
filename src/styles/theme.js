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
		title: {hugeDesk: 96, desk: 96, tabletA: 76, tabletP: 76, mobile: 48 },
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
	{name: 'purple', color: {dark: '#BCAED5', light: 'rgba(188, 174, 213, 0.5)'}},
	{name: 'blue', color: {dark: '#6997CC', light: 'rgba(105, 159, 204, 0.5)'}},
	{name: 'green', color: {dark: '#087C7C', light: 'rgba(8, 124, 124, 0.5)'}},
	{name: 'orange', color: {dark: '#E39D58', light: 'rgba(227, 157, 88, 0.5)'}},
]