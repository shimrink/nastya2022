import { createGlobalStyle } from "styled-components";
import { commonTheme } from "./theme";

export default createGlobalStyle`
::-webkit-scrollbar {
	display: none;
}

html {
	font-size: 18px;
	height: 100%;
	margin: 0;
	user-select: none;
	-webkit-user-drag: none;
}

*, *:before, *:after {
	box-sizing: border-box;
	-webkit-tap-highlight-color: transparent;
}

body {
	margin: 0;
	height: 100%;
	background-color: ${ ({theme}) => theme.mode.bg };
	font-family: 'BaseFont', sans-serif;
	overflow-x: hidden;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#root {
	height: 100%;
}

h1, h2, h3, h4, h5, h6 {
	font-family: 'AccentFontT' , sans-serif;
	font-weight: 100;
	margin: 0;
	line-height: 110%;
}
h2 {
	color: ${commonTheme.colors.white};
}

p {
	margin: 0;
}

picture {
	line-height: 0;
}

a {
	color: ${ ({theme}) => theme.mode.text };
	text-decoration: none;
}

._anim-show-left {
	transform: translateX(-100%) scaleX(100%);
	opacity: 0;
	transition: transform ${commonTheme.durations.middle}s ${commonTheme.easings.outPower3},
					opacity ${commonTheme.durations.middle}s ${commonTheme.easings.outPower3},
					background-color ${commonTheme.durations.short}s ${commonTheme.easings.outPower3},
					color ${commonTheme.durations.short}s ${commonTheme.easings.outPower3};
}
._anim-show-opacity {
	opacity: 0;
	transition: opacity ${commonTheme.durations.middle}s ${commonTheme.easings.outPower3},
					background-color ${commonTheme.durations.short}s ${commonTheme.easings.outPower3},
					color ${commonTheme.durations.short}s ${commonTheme.easings.outPower3};
}
`