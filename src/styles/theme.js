export const commonTheme = {
	colors: {
		primary: '#fff',
		secondary: '#777',
		tertiary: '#c0c0c0',
	},

	media: {
		tabletAlbum: '(max-width 1279px)',
		tabletPortrait: '(max-width: 999px)',
		phone: '(max-width: 767px)',
	},

	// in px
	fontSizes: {
		title: { desk: 124, tablet: 76, phone: 48 },
		text: { desk: 18, tablet: 16, phone: 12 },
	},

	// in ms
	durations: {
		ms300: 1000,
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
	{name: 'purple', color: '#c2a6cd'},
	{name: 'blue', color: '#718ec4'},
	{name: 'green', color: '#46bbb1'},
	{name: 'orange', color: '#ffb4a2'},
]