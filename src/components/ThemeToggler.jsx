import React from 'react'
import styled from 'styled-components';

const Svg = styled.svg`
	width: 28px;
	height: auto;
	fill: none;
	cursor: pointer;
	justify-self: end;
`

const Rect = styled.rect`
	width: 19px;
	height: 19px;
	fill: ${ ({filled}) => filled };
	stroke: ${ ({stroked}) => stroked };
`

const ThemeToggler = ({ toggleTheme }) => {
	return <Svg onClick={toggleTheme} viewBox="0 0 28 21" xmlns="http://www.w3.org/2000/svg">
		<Rect filled={({theme}) => theme.bg} stroked={({theme}) => theme.text} x="8.5" y="1.21484" rx="9.5"/>
		<Rect filled={({theme}) => theme.text} stroked={({theme}) => theme.bg} x="0.5" y="1.21484" rx="9.5"/>
	</Svg>
}

export default ThemeToggler;