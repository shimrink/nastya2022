import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import { state } from '../../store';
import LetterByLetter from '../common/LetterByLetter';

const Nav = styled.nav`
	grid-row: ${({mobile}) => mobile ? '2/3' : '1/2'};
	grid-column: ${({mobile}) => mobile ? '1/2' : '4/8'};
	display: flex;
	flex-direction: ${({mobile}) => mobile ? 'column' : 'row'};
	align-items: center;
	justify-self: ${({mobile}) => mobile ? 'center' : 'end'};
	justify-content: center;
	a {
		font-size: ${({mobile}) => mobile ? 'clamp(48px, 15.415vw, 76px)' : '18px'};
		margin-right: ${({mobile}) => mobile ? 0 : 24}px;
		margin-bottom: ${({m}) => m.isMobile ? 24
										: m.isTabletA || m.isTabletP ? 28
										: 0}px;
		color: ${ ({theme, mobile}) => mobile ? commonTheme.colors.white : theme.mode.text };
		text-transform: ${({mobile}) => mobile ? 'uppercase' : 'none'};
		white-space: nowrap;
		transition: color ${commonTheme.durations.short}s;
	}
	a:last-child {
		margin: 0;
	}
	a.navItemActive {
		color: ${ ({theme}) => theme.ac.dark };
	}
`
const Navigation = ({ mobile, isMenuMobileOpen, closeMenu, pageTransition }) => {

	const media = useContext(MediaContext)
	const {pathname} = useLocation()
	// Замена на useRef([]) или className
	const [portfolioActive, setPortfolioActive] = useState(pathname === '/portfolio')
	const [aboutActive, setAboutActive] = useState(pathname === '/about')
	const [servicesActive, setServicesActive] = useState(pathname === '/services')
	const [contactsActive, setContactsActive] = useState(pathname === '/contacts')

	const activateLink = (num) => {
		setPortfolioActive(num === 0)
		setAboutActive(num === 1)
		setServicesActive(num === 2)
		setContactsActive(num === 3)
	}

	const switchPage = (e, path) => {
		if (mobile) closeMenu()
		else pageTransition(e, path)
	}

	const clickHandler = (e, path, num) => {
		activateLink(num)
		switchPage(e, path)
	}

	useEffect(() => {
		if (pathname !== '/portfolio'
		 && pathname !== '/about'
		 && pathname !== '/services'
		 && pathname !== '/contacts') activateLink(state.navLinksData.length)
	}, [pathname])

	return <Nav mobile={mobile} m={media}>
		{state.navLinksData.map((l, i) => (
			<NavLink key={i} to={l.path} onClick={e=>clickHandler(e, l.path, i)} className={ navData => navData.isActive && !mobile ? 'navItem navItemActive' : 'navItem' }>
				<LetterByLetter mobile={mobile}
									wavy
									regular={!mobile}
									isMenuMobileOpen={isMenuMobileOpen}
									showAnim={mobile}
									titleSize={mobile}
									active={i === 0 ? portfolioActive
											: i === 1 ? aboutActive
											: i === 2 ? servicesActive
											: contactsActive}>
					{l.name}
				</LetterByLetter>
			</NavLink>
		))}
	</Nav>
}

export default Navigation;