import { commonTheme } from "./theme";

export const pageVariants = {
	in: {
		opacity: 1
	},
	out: {
		opacity: 0
	}
}

export const pageTransition = {
	duration: commonTheme.durations.short / 1000,
	transition: 'linear'
}