import React from 'react';
import styled from 'styled-components';
import AccentColorToggler from './AccentColorToggler';
import ThemeToggler from './ThemeToggler';

const Foot = styled.footer`
	position: fixed;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 24px;
	padding: 40px;
	z-index: 50;
`

const Footer = ({ themeToggler, accentColorToggler }) => {
	return <Foot>
		<ThemeToggler toggleTheme={themeToggler} />
		<AccentColorToggler toggleAccentColor={accentColorToggler} />
	</Foot>
}

export default Footer;