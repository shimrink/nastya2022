import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';

const Nav = styled.nav`
	grid-row: ${({mobile}) => mobile ? '2/3' : '1/2'};
	grid-column: ${({mobile}) => mobile ? '1/2' : '4/8'};
	display: flex;
	flex-direction: ${({mobile}) => mobile ? 'column' : 'row'};
	align-items: center;
	justify-self: ${({mobile}) => mobile ? 'center' : 'end'};
	justify-content: center;
	a {
		font-family: ${({mobile}) => mobile ? 'AccentFontT' : 'AccentFontM'}, sans-serif;
		font-size: ${({mobile}) => mobile ? 'clamp(48px, 15.415vw, 76px)' : '18px'};
		margin-right: ${({mobile}) => mobile ? 0 : 24}px;
		color: ${ ({theme, mobile, inside}) => mobile || inside ? commonTheme.colors.primary : theme.text };
		text-transform: ${({mobile}) => mobile ? 'uppercase' : 'none'};
		white-space: nowrap;
		transition: color ${commonTheme.durations.short}s;
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
		background-color: ${ ({theme, mobile, inside}) => mobile || inside ? commonTheme.colors.primary : theme.text };
	}
	a.navItemActive:after {
		background-color: ${ ({accentColor, inside}) => inside ? commonTheme.colors.primary : accentColor.dark };
	}
`
const Navigation = ({ inside, mobile, closeMenu, accentColor, pageTransition }) => {
	return <Nav mobile={mobile} accentColor={accentColor} inside={inside}>
		<NavLink to='/portfolio' onClick={mobile ? closeMenu : e=>pageTransition(e, '/portfolio')}
					className={navData => navData.isActive && !mobile ? 'navItemActive linkUnderLine linkUnderLineWhite' : navData.isActive && mobile ? 'navItemMobileActive linkUnderLine linkUnderLineWhite' : 'linkUnderLine linkUnderLineWhite'}>
			Все кейсы
		</NavLink>
		<NavLink to='/about' onClick={mobile ? closeMenu : e=>pageTransition(e, '/about')}
					className={navData => navData.isActive && !mobile ? 'navItemActive linkUnderLine linkUnderLineWhite' : navData.isActive && mobile ? 'navItemMobileActive linkUnderLine linkUnderLineWhite' : 'linkUnderLine linkUnderLineWhite'}>
			Обо мне
		</NavLink>
		<NavLink to='/services' onClick={mobile ? closeMenu : e=>pageTransition(e, '/services')}
					className={navData => navData.isActive && !mobile ? 'navItemActive linkUnderLine linkUnderLineWhite' : navData.isActive && mobile ? 'navItemMobileActive linkUnderLine linkUnderLineWhite' : 'linkUnderLine linkUnderLineWhite'}>
			Услуги
		</NavLink>
		<NavLink to='/contacts' onClick={mobile ? closeMenu : e=>pageTransition(e, '/contacts')}
					className={navData => navData.isActive && !mobile ? 'navItemActive linkUnderLine linkUnderLineWhite' : navData.isActive && mobile ? 'navItemMobileActive linkUnderLine linkUnderLineWhite' : 'linkUnderLine linkUnderLineWhite'}>
			Контакты
		</NavLink>
	</Nav>
}

export default Navigation;