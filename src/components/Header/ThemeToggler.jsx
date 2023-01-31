import React from 'react'
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';

const ThemeCircle = styled.div`
	width: 20px;
	height: 20px;
	background-color: ${ ({theme}) => theme.text };
	border: none;
	outline: 1px solid;
	border-radius: 50%;
	outline-color: ${({theme, inside}) => inside ? commonTheme.colors.primary : theme.text};
	justify-self: end;
	cursor: pointer;
	transition: outline-color ${commonTheme.durations.short}ms;
`
const ThemeToggler = ({ toggleTheme, inside }) => {
	return <ThemeCircle onClick={toggleTheme} inside={inside} />
}

export default ThemeToggler;