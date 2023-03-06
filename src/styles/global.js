import { createGlobalStyle } from "styled-components";
import { commonTheme, lightTheme } from "./theme";

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
}
h2 {
	color: ${commonTheme.colors.white};
	line-height: 110%;
}
h3 {
	font-family: ${({theme}) => theme.mode.text === lightTheme.text ? 'AccentFontT' : 'AccentFontR'}, sans-serif;
	font-weight: ${({theme}) => theme.mode.text === lightTheme.text ? 100 : 400};
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
.linkUnderLine {
	position: relative;
}
.linkUnderLine:after {
	display: block;
	position: absolute;
	left: auto;
	right: 0;
	width: 0;
	height: 1px;
	background-color: ${ ({theme}) => theme.ac.dark };
	content: "";
	transition: width 0.2s cubic-bezier(0, 0, .40, 1);
}
.linkUnderLine:hover:after {
	width: 100%;
	left: 0;
	right: auto;
}

._anim-show-left {
	transform: translateX(-100%) scaleX(100%);
	opacity: 0;
	transition: transform ${commonTheme.durations.middle}s ${commonTheme.easings.outPower3},
					opacity ${commonTheme.durations.middle}s ${commonTheme.easings.outPower3};
}
._anim-show-opacity {
	opacity: 0;
	transition: opacity ${commonTheme.durations.short}s ${commonTheme.easings.outPower3};
}
`