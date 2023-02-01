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
		position: relative;
		font-family: ${ ({mobile}) => mobile ? 'AccentFontT' : 'AccentFontM' }, sans-serif;
		font-size: ${ ({mobile}) => mobile ? 'clamp(48px, 15.415vw, 76px)' : commonTheme.fontSizes.text.desktop + 'px' };
		margin-right: ${ ({mobile}) => mobile ? 0 : 24 }px;
		color: ${ ({theme, mobile, inside}) => mobile || inside ? commonTheme.colors.primary : theme.text };
		text-transform: ${ ({mobile}) => mobile ? 'uppercase' : 'none' };
		white-space: nowrap;
		transition: color ${commonTheme.durations.short}ms;
	}
	a:last-child {
		margin-right: 0;
	}
	a.navItemActive {
		font-family: 'AccentFontSBI', sans-serif;
		color: ${ ({accentColor, inside}) => inside ? commonTheme.colors.primary : accentColor.dark };
	}
	a.navItemMobileActive {
		font-family: 'AccentFontI', sans-serif;
	}
	a:after {
		display: block;
		position: absolute;
		left: auto;
		right: 0;
		width: 0;
		height: 1px;
		background-color: ${ ({theme, mobile, inside}) => mobile || inside ? commonTheme.colors.primary : theme.text };
		content: "";
		transition: width 0.2s cubic-bezier(0, 0, .40, 1);
	}
	a.navItemActive:after {
		background-color: ${ ({accentColor, inside}) => inside ? commonTheme.colors.primary : accentColor.dark };
	}
	a:hover:after {
		width: 100%;
		left: 0;
		right: auto;
	}
`
const Navigation = ({ inside, mobile, closeMenu, accentColor }) => {
	return <Nav mobile={mobile} accentColor={accentColor} inside={inside}>
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