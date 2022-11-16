import { createGlobalStyle } from "styled-components";
import { commonTheme } from "./theme";

export default createGlobalStyle`
html {
	font-size: ${commonTheme.fontSizes.text.desk}px;
	height: 100%;
	margin: 0;
}

body {
	margin: 0;
	height: 100%;
	font-family: 'Inter Tight', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6, p {
	margin: 0;
}

h2 {
	color: ${commonTheme.colors.primary};
	font-weight: 200;
	font-size: ${commonTheme.fontSizes.title.desk}px;
}

a {
	color: ${ ({theme}) => theme.text };
	text-decoration: none;
}

picture {
	line-height: 0;
}

*, *:before, *:after {
	box-sizing: border-box;
}
`