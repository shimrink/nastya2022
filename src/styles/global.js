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
	font-family: 'IBMPlexSans';
	src: url(/fonts/IBMPlexSans-Regular.ttf) format('truetype');
	font-weight: normal;
	font-display: swap;
}
@font-face {
	font-family: 'WinterR';
	src: url(/fonts/WinterSansTrial-Regular.otf) format('opentype');
	font-weight: normal;
	font-display: swap;
}
@font-face {
	font-family: 'WinterI';
	src: url(/fonts/WinterSansTrial-Italic.otf) format('opentype');
	font-weight: normal;
	font-display: swap;
}
@font-face {
	font-family: 'WinterEL';
	src: url(/fonts/WinterSansTrial-ExtraLight.otf) format('opentype');
	font-weight: 200;
	font-display: swap;
}
@font-face {
	font-family: 'WinterELI';
	src: url(/fonts/WinterSansTrial-ExtraLightItalic.otf) format('opentype');
	font-weight: 200;
	font-display: swap;
}
@font-face {
	font-family: 'WinterEB';
	src: url(/fonts/WinterSansTrial-ExtraBold.otf) format('opentype');
	font-weight: 800;
	font-display: swap;
}
@font-face {
	font-family: 'WinterEBI';
	src: url(/fonts/WinterSansTrial-ExtraBoldItalic.otf) format('opentype');
	font-weight: 800;
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
	font-family: 'IBMPlexSans', sans-serif;
	overflow-x: hidden;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#root {
	height: 100%;
}

h1, h2, h3, h4, h5, h6 {
	margin: 0;
	letter-spacing: -0.02em;
}

h2 {
	font-family: 'WinterEL', sans-serif;
	color: ${commonTheme.colors.primary};
	font-weight: 200;
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