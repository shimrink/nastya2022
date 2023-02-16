import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { AccentColorContext, MediaContext } from '../../AppWrap';
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
	z-index: 2147000002;
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
	color: ${ ({theme, inside}) => inside ? commonTheme.colors.primary : theme.text };
	cursor: pointer;
	z-index: 2147000004;
	transition: color ${commonTheme.durations.short}s;
`
const Header = ({ isTopBlock, aboutPageScroll, topBlockH, pageTransition, themeToggler, accentColorToggler }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const [inside, setInside] = useState(false)
	const [isMenuMobileOpen, setMenuMobileOpen] = useState(false)
	const headerRef = useRef()
	const menuMobileRef = useRef()

	// Header color change
	useEffect(() => {
		setInside(isTopBlock)
		if (isTopBlock) {
			const onScroll = () => {
				let halfHeaderHeight = media.isHugeDesk || media.isDesk ? 57.25 : 40
				setInside(!(topBlockH - halfHeaderHeight < window.scrollY))
			}
			window.addEventListener('scroll', onScroll)

			return () => window.removeEventListener('scroll', onScroll)
		}
	}, [media, isTopBlock, topBlockH])

	// For About-page
	useEffect(() => {
		setInside(aboutPageScroll)
	}, [aboutPageScroll])

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
			yPercent: 110,
			duration: commonTheme.durations.short,
			ease: 'linear'
		})
		gsap.to(document.querySelector('.roundedDivRef'), {
			height: '10%',
			duration: commonTheme.durations.short,
			ease: 'linear'
		})
		setMenuMobileOpen(true)
	}

	const closeMenu = () => {
		gsap.to(menuMobileRef.current, {
			yPercent: 0,
			duration: commonTheme.durations.short,
			ease: 'linear'
		})
		gsap.to(document.querySelector('.roundedDivRef'), {
			height: 0,
			duration: commonTheme.durations.short,
			ease: 'linear'
		})
		setMenuMobileOpen(false)
	}

	return <Wrapper m={media} ref={headerRef}>
		<Logo inside={isMenuMobileOpen ? true : inside} closeMenu={closeMenu} pageTransition={pageTransition} />
		<TogglersAndNav m={media}>
			<ThemeTogglerContainer onClick={media.isHugeDesk || media.isDesk ? ()=>{} : themeToggler} m={media}>
				<ThemeToggler toggleTheme={themeToggler} inside={inside} />
			</ThemeTogglerContainer>
			<AccentColorTogglerContainer m={media}>
				<AccentColorToggler toggleAccentColor={accentColorToggler} inside={inside} />
			</AccentColorTogglerContainer>
			{media.isHugeDesk || media.isDesk
				? <Navigation pageTransition={pageTransition} inside={inside} accentColor={accentColor} />
				: isMenuMobileOpen
				? <Burger onClick={closeMenu} inside={true}>Закрыть</Burger>
				: <Burger onClick={openMenu} inside={inside}>Меню</Burger>
			}
		</TogglersAndNav>
		{(!media.isHugeDesk && !media.isDesk) && <MenuMobile ref={menuMobileRef} closeMenu={closeMenu} />}
	</Wrapper>
}

export default Header;