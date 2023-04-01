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
		outPower3: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
		outPower4: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
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
	{
		name: 'purple',
		color: {
			dark: '#C1A5F3',
			light: 'rgba(193, 165, 243, 0.5)',
			gradDark: '#605279',
			gradLight: '#E0D2F9',
		},
	},
	{
		name: 'blue',
		color: {
			dark: '#6CA4E5',
			light: 'rgba(108, 164, 229, 0.5)',
			gradDark: '#365272',
			gradLight: '#B5D2F2',
		},
	},
	{
		name: 'green',
		color: {
			dark: '#0FB3B3',
			light: 'rgba(15, 179, 179, 0.5)',
			gradDark: '#075A5A',
			gradLight: '#87D9D9',
		},
	},
	{
		name: 'orange',
		color: {
			dark: '#E78C50',
			light: 'rgba(231, 140, 80, 0.5)',
			gradDark: '#744628',
			gradLight: '#F3C6A7',
		},
	},
]
