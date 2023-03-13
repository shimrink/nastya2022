import React from 'react'
import styled from 'styled-components';

const ThemeCircle = styled.div`
	width: 20px;
	height: 20px;
	background-color: ${ ({theme}) => theme.mode.text };
	border: none;
	border-radius: 50%;
	justify-self: end;
	cursor: pointer;
`
const ThemeToggler = ({ toggleTheme }) => {
	return <ThemeCircle onClick={toggleTheme} />
}

export default ThemeToggler;