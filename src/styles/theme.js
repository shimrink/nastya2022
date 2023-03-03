export const commonTheme = {
	colors: {
		white: '#FFF',
		balck: '#1E1E1E',
	},

	// in px
	// fontSizes: {
	// 	title: {hugeDesk: 96, desk: 96, tabletA: 76, tabletP: 76, mobile: 48 },
	// 	text: {hugeDesk: 18, desk: 18, tabletA: 16, tabletP: 16, mobile: 16 },
	// 	tag: {hugeDesk: 16, desk: 16, tabletA: 16, tabletP: 16, mobile: 14 },
	// },

	// in px
	// indents: {
	// 	hugeDesk: 40,
	// 	desk: 40,
	// 	tabletA: 24,
	// 	tabletP: 24,
	// 	mobile: 24
	// },

	// Grid width on 1680+ screen in px
	gridWidth: 1520,

	// in s
	durations: {
		short: 0.3,
		middle: 0.6,
		long: 1,
	},

	easings: {
		out: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
	},
}

export const lightTheme = {
	bg: '#FFF',
	text: '#1E1E1E',
	subText: 'rgba(30, 30, 30, 0.5)',
}

export const darkTheme = {
	bg: '#1E1E1E',
	text: '#FFF',
	subText: 'rgba(255, 255, 255, 0.5)',
}

export const accentTheme = [
	{name: 'purple', color: {dark: '#BCAED5',
									light: 'rgba(188, 174, 213, 0.5)',
									gradDark: '#6D6679',
									gradLight: '#DDD6EA'}
	},
	{name: 'blue', color: {dark: '#6997CC',
									light: 'rgba(105, 159, 204, 0.5)',
									gradDark: '#435E75',
									gradLight: '#B4CFE5'}
	},
	{name: 'green', color: {dark: '#087C7C',
									light: 'rgba(8, 124, 124, 0.5)',
									gradDark: '#134D4D',
									gradLight: '#83BDBD'}
	},
	{name: 'orange', color: {dark: '#E39D58',
									light: 'rgba(227, 157, 88, 0.5)',
									gradDark: '#805D3B',
									gradLight: '#F1CEAB'}
	}
]