import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';

const Nav = styled.nav`
	grid-row: ${ ({mobile}) => mobile ? '2/3' : '1/2' };
	grid-column: ${ ({mobile}) => mobile ? '1/2' : '4/8' };
	display: flex;
	flex-direction: ${ ({mobile}) => mobile ? 'column' : 'row' };
	align-items: center;
	justify-self: ${ ({mobile}) => mobile ? 'center' : 'end' };
	justify-content: center;
	a {
		font-family: ${ ({mobile}) => mobile ? 'AccentFontT' : 'AccentFontM' }, sans-serif;
		font-size: ${ ({mobile}) => mobile ? 'clamp(48px, 15.415vw, 76px)' : commonTheme.fontSizes.text.desktop + 'px' };
		line-height: ${ ({mobile}) => mobile ? 1.15 : 0.8 };
		margin-right: ${ ({mobile}) => mobile ? 0 : 24 }px;
		color: ${ ({theme, mobile}) => mobile ? commonTheme.colors.primary : theme.text };
		text-transform: ${ ({mobile}) => mobile ? 'uppercase' : 'none' };
		white-space: nowrap;
	}
	a:last-child {
		margin-right: 0;
	}
	a.navItemActive {
		font-family: 'AccentFontSBI', sans-serif;
		color: ${ ({accentColor}) => accentColor.dark };
		border-bottom: 1px solid;
	}
	a.navItemMobileActive {
		font-family: 'AccentFontI', sans-serif;
	}
`
const Navigation = ({ mobile, closeMenu, accentColor }) => {
	return <Nav mobile={mobile} accentColor={accentColor}>
		<NavLink to='/portfolio' onClick={closeMenu}
		className={navData => navData.isActive && !mobile ? 'navItemActive' : navData.isActive && mobile ? 'navItemMobileActive' : ''}>
			Все кейсы
		</NavLink>
		<NavLink to='/about' onClick={closeMenu}
		className={navData => navData.isActive && !mobile ? 'navItemActive' : navData.isActive && mobile ? 'navItemMobileActive' : ''}>
			Обо мне
		</NavLink>
		<NavLink to='/services' onClick={closeMenu}
		className={navData => navData.isActive && !mobile ? 'navItemActive' : navData.isActive && mobile ? 'navItemMobileActive' : ''}>
			Услуги
		</NavLink>
		<NavLink to='/contacts' onClick={closeMenu}
		className={navData => navData.isActive && !mobile ? 'navItemActive' : navData.isActive && mobile ? 'navItemMobileActive' : ''}>
			Контакты
		</NavLink>
	</Nav>
}

export default Navigation;