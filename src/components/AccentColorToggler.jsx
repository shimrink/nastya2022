import React from 'react'
import styled from 'styled-components';
import { accentTheme } from '../styles/theme';

const Button = styled.button`
	background-color: ${ ({col}) => col };
	border: none;
	height: 100%;
	width: 32px;
	margin-right: 4px;
	:active {
		border: 1px solid #1e1e1e;
	}
`

const AccentColorToggler = ({ toggleAccentColor }) => {
	return <div>
		{accentTheme.map( ac => <Button key={ac.name}
													onClick={ () => {toggleAccentColor(ac.name)} }
													col={ac.color} />)}
	</div>
}

export default AccentColorToggler;