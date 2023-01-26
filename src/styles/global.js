import { createGlobalStyle } from "styled-components";
import { commonTheme } from "./theme";
// import IBMPlexSans from '../assets/fonts/IBMPlexSans-Regular.ttf';
// import winterR from '../assets/fonts/WinterSansTrial-Regular.otf';
// import winterI from '../assets/fonts/WinterSansTrial-Italic.otf';
// import winterEL from '../assets/fonts/WinterSansTrial-ExtraLight.otf';
// import winterELI from '../assets/fonts/WinterSansTrial-ExtraLightItalic.otf';
// import winterEB from '../assets/fonts/WinterSansTrial-ExtraBold.otf';
// import winterEBI from '../assets/fonts/WinterSansTrial-ExtraBoldItalic.otf';

export default createGlobalStyle`
@font-face {
	font-family: 'BaseFont';
	src: url(/fonts/IBMPlexSans-Regular.ttf) format('truetype');
	font-weight: normal;
	font-display: swap;
}
@font-face {
	font-family: 'AccentFontR';
	src: url(/fonts/PPNeueMontreal-Book.otf) format('opentype');
	font-weight: normal;
	font-display: swap;
}
@font-face {
	font-family: 'AccentFontI';
	src: url(/fonts/PPNeueMontreal-Italic.otf) format('opentype');
	font-weight: normal;
	font-display: swap;
}
@font-face {
	font-family: 'AccentFontT';
	src: url(/fonts/PPNeueMontreal-Thin.otf) format('opentype');
	font-weight: 100;
	font-display: swap;
}
@font-face {
	font-family: 'AccentFontM';
	src: url(/fonts/PPNeueMontreal-Medium.otf) format('opentype');
	font-weight: 500;
	font-display: swap;
}
@font-face {
	font-family: 'AccentFontSBI';
	src: url(/fonts/PPNeueMontreal-SemiBoldItalic.otf) format('opentype');
	font-weight: 600;
	font-display: swap;
}
@font-face {
	font-family: 'AccentFontB';
	src: url(/fonts/PPNeueMontreal-Bold.otf) format('opentype');
	font-weight: 700;
	font-display: swap;
}

/* ::-webkit-scrollbar {
	display: none;
} */

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
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#root {
	height: 100%;
}

h1, h2, h3, h4, h5, h6 {
	font-family: 'AccentFontT', sans-serif;
	font-weight: 100;
	margin: 0;
}

h2 {
	color: ${commonTheme.colors.primary};
	line-height: 110%;
}

p {
	margin: 0;
}

a {
	color: ${ ({theme}) => theme.text };
	text-decoration: none;
}

picture {
	line-height: 0;
}
`