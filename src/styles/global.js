import { createGlobalStyle } from "styled-components";
import { commonTheme, lightTheme } from "./theme";

export default createGlobalStyle`
::-webkit-scrollbar {
	display: none;
}

html {
	font-size: ${commonTheme.fontSizes.text.desk}px;
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
	font-family: 'BaseFont', sans-serif;
	overflow-x: hidden;
	background-color: ${ ({theme}) => theme.bg };
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
	color: ${commonTheme.colors.primary};
	line-height: 110%;
}
h3 {
	font-family: ${({theme}) => theme.text === lightTheme.text ? 'AccentFontT' : 'AccentFontR'} , sans-serif;
	font-weight: ${({theme}) => theme.text === lightTheme.text ? 100 : 400};
}

p {
	margin: 0;
}

picture {
	line-height: 0;
}

a {
	color: ${ ({theme}) => theme.text };
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
	background-color: ${ ({theme}) => theme.text };
	content: "";
	transition: width 0.2s cubic-bezier(0, 0, .40, 1);
}
.linkUnderLine:hover:after {
	width: 100%;
	left: 0;
	right: auto;
}
`