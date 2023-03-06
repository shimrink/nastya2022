import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import ThemeToggler from './ThemeToggler';
import AccentColorToggler from './AccentColorToggler';
import Navigation from './Navigation';
import Logo from './Logo';
import MenuMobile from './MenuMobile';

const Wrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: grid;
	grid-template-columns: ${({m}) => m.isHugeDesk || m.isDesk ? 'repeat(12, 1fr)' : '1fr'};
	grid-column-gap: 24px;
	align-items: center;
	font-family: 'AccentFontM', sans-serif;
	touch-action: none;
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin-top: ${({m}) => m.isHugeDesk || m.isDesk ? 40 : 24}px;
	z-index: 5;
`
const TogglersAndNav = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk || m.isDesk ? '6/13' : '1/2'};
	display: grid;
	grid-template-columns: ${({m}) => m.isHugeDesk || m.isDesk ? 'repeat(7, 1fr)' : 'auto'};
	grid-column-gap: ${({m}) => m.isHugeDesk || m.isDesk ? 24 : 0}px;
	align-items: center;
	justify-self: ${({m}) => m.isHugeDesk || m.isDesk ? 'auto' : 'end'};
`
const ThemeTogglerContainer = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk || m.isDesk ? '1/2' : '2/3'};
	display: flex;
	justify-content: flex-end;
	margin-right: ${({m}) => m.isHugeDesk || m.isDesk ? 0 : 18}px;
	padding: ${({m}) => m.isHugeDesk || m.isDesk ? 0 : 6}px;
	cursor: ${({m}) => m.isHugeDesk || m.isDesk ? 'auto' : 'pointer'};
`
const AccentColorTogglerContainer = styled.div`
	grid-row: 1/2;
	justify-self: start;
	grid-column: ${({m}) => m.isHugeDesk || m.isDesk ? '2/4' : '1/2'};
`
const Burger = styled.span`
	grid-row: 1/2;
	grid-column: 3/4;
	justify-self: end;
	font-size: 16px;
	color: ${ ({theme, isMenuMobileOpen}) => isMenuMobileOpen ? commonTheme.colors.white : theme.mode.text };
	cursor: pointer;
	z-index: 7;
	transition: color ${commonTheme.durations.short}s;
`
const Header = ({ pageTransition, accentColor, themeToggler, accentColorToggler }) => {

	const media = useContext(MediaContext)
	const [isMenuMobileOpen, setMenuMobileOpen] = useState(false)
	const headerRef = useRef()
	const menuMobileRef = useRef()

	useEffect(() => {
		const el = headerRef.current
		const onWheel = e => {
			e.preventDefault()
		}
		el.addEventListener('wheel', onWheel)

		return () => el.removeEventListener('wheel', onWheel)
	}, [])

	const openMenu = () => {
		gsap.to(menuMobileRef.current, {
			yPercent: 100,
			duration: 0.7,
			ease: 'power4.inOut'
		})
		gsap.to(document.querySelector('.roundedDivRef'), {
			height: '10%',
			duration: 0.7,
			ease: 'power4.inOut'
		})
		setMenuMobileOpen(true)
	}

	const closeMenu = () => {
		gsap.to(menuMobileRef.current, {
			yPercent: 0,
			duration: 0.7,
			ease: 'power4.inOut'
		})
		gsap.to(document.querySelector('.roundedDivRef'), {
			height: 0,
			duration: 0.7,
			ease: 'power4.inOut'
		})
		setMenuMobileOpen(false)
	}

	useEffect(() => {
		if (isMenuMobileOpen) setMenuMobileOpen(!media.isHugeDesk && !media.isDesk)
	}, [media, isMenuMobileOpen])

	return <Wrapper m={media} ref={headerRef}>
		<Logo isMenuMobileOpen={isMenuMobileOpen} closeMenu={closeMenu} pageTransition={pageTransition} />
		<TogglersAndNav m={media}>
			<ThemeTogglerContainer onClick={media.isHugeDesk || media.isDesk ? ()=>{} : themeToggler} m={media}>
				<ThemeToggler toggleTheme={themeToggler} />
			</ThemeTogglerContainer>
			<AccentColorTogglerContainer m={media}>
				<AccentColorToggler accentColor={accentColor} toggleAccentColor={accentColorToggler} />
			</AccentColorTogglerContainer>
			{media.isHugeDesk || media.isDesk
				? <Navigation pageTransition={pageTransition} />
				: isMenuMobileOpen
				? <Burger onClick={closeMenu} isMenuMobileOpen={isMenuMobileOpen}>Закрыть</Burger>
				: <Burger onClick={openMenu} isMenuMobileOpen={isMenuMobileOpen}>Меню</Burger>
			}
		</TogglersAndNav>
		{(!media.isHugeDesk && !media.isDesk) && <MenuMobile ref={menuMobileRef} isMenuMobileOpen={isMenuMobileOpen} closeMenu={closeMenu} />}
	</Wrapper>
}

export default Header;