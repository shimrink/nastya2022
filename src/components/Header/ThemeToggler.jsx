import React from 'react'
import styled from 'styled-components';

const ThemeCircle = styled.div`
	width: 22px;
	height: 22px;
	background-color: ${ ({theme}) => theme.text };
	border: none;
	border-radius: 50%;
	justify-self: end;
	cursor: pointer;
`
const ThemeToggler = ({ toggleTheme }) => {
	return <ThemeCircle onClick={toggleTheme} />
}

export default ThemeToggler;