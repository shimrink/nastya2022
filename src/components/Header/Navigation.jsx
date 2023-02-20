import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AccentColorContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
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
		color: ${ ({theme, mobile}) => mobile ? commonTheme.colors.primary : theme.text };
		text-transform: ${({mobile}) => mobile ? 'uppercase' : 'none'};
		white-space: nowrap;
		transition: color ${commonTheme.durations.short}s;
	}
	a:last-child {
		margin-right: 0;
	}
	a.navItemActive {
		color: ${ ({ac}) => ac.dark };
	}
`
const linksData = [
	{name: 'Все кейсы', path: '/portfolio'},
	{name: 'Обо мне', path: '/about'},
	{name: 'Услуги', path: '/services'},
	{name: 'Контакты', path: '/contacts'},
]

const Navigation = ({ mobile, closeMenu, pageTransition }) => {

	const accentColor = useContext(AccentColorContext)
	const {pathname} = useLocation()
	// Замена на useRef([])?
	const [portfolioActive, setPortfolioActive] = useState(false)
	const [aboutActive, setAboutActive] = useState(false)
	const [servicesActive, setServicesActive] = useState(false)
	const [contactsActive, setContactsActive] = useState(false)

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
		if (pathname === '/') activateLink(linksData.length)
	}, [pathname])

	return <Nav mobile={mobile} ac={accentColor}>
		{linksData.map((l, i) => (
			<NavLink key={i} to={l.path} onClick={e=>clickHandler(e, l.path, i)} className={ navData => navData.isActive && !mobile ? 'navItem navItemActive' : 'navItem' }>
				<LetterByLetter titleItem={mobile} active={ i === 0 ? portfolioActive
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