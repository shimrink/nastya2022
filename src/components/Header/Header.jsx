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
	grid-template-columns: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 'repeat(12, 1fr)' : '1fr'};
	grid-column-gap: 24px;
	align-items: center;
	font-family: 'AccentFontM', sans-serif;
	touch-action: none;
	padding: ${({media}) => media === 'mobile' ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin-top: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 40 : 24}px;
	z-index: 2147000002;
`
const TogglersAndNav = styled.div`
	grid-row: 1/2;
	grid-column: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '6/13' : '1/2'};
	display: grid;
	grid-template-columns: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 'repeat(7, 1fr)' : 'auto'};
	grid-column-gap: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 24 : 0}px;
	align-items: center;
	justify-self: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 'auto' : 'end'};
`
const ThemeTogglerContainer = styled.div`
	grid-row: 1/2;
	grid-column: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '1/2' : '2/3'};
	display: flex;
	justify-content: flex-end;
	margin-right: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 0 : 18}px;
	padding: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 0 : 6}px;
	cursor: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 'auto' : 'pointer'};
`
const AccentColorTogglerContainer = styled.div`
	grid-row: 1/2;
	justify-self: start;
	grid-column: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '2/4' : '1/2'};
`
const Burger = styled.span`
	grid-row: 1/2;
	grid-column: 3/4;
	justify-self: end;
	font-size: ${commonTheme.fontSizes.text.mobile}px;
	color: ${({theme, inside}) => inside ? commonTheme.colors.primary : theme.text};
	cursor: pointer;
	z-index: 2147000004;
	transition: color ${commonTheme.durations.short}ms;
`
const Header = ({ pageTransition, isMainPage, themeToggler, accentColorToggler, topBlockH }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const [inside, setInside] = useState(false)
	const [isMenuMobileOpen, setMenuMobileOpen] = useState(false)
	const headerRef = useRef()
	const menuMobileRef = useRef()

	useEffect(() => {
		setInside(!isMainPage)
		if (!isMainPage) {
			const onScroll = () => {
				let halfHeaderHeight = media === 'hugeDesk' || media === 'desk' ? 57.25 : 40
				setInside(!(topBlockH - halfHeaderHeight < window.pageYOffset))
			}
			window.addEventListener('scroll', onScroll)

			return () => window.removeEventListener('scroll', onScroll)
		}
	}, [media, isMainPage, topBlockH])

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
			duration: commonTheme.durations.short / 1000,
			ease: 'linear'
		})
		gsap.to(document.querySelector('.roundedDivRef'), {
			height: '10%',
			duration: commonTheme.durations.short / 1000,
			ease: 'linear'
		})
		setMenuMobileOpen(true)
	}

	const closeMenu = () => {
		gsap.to(menuMobileRef.current, {
			yPercent: 0,
			duration: commonTheme.durations.short / 1000,
			ease: 'linear'
		})
		gsap.to(document.querySelector('.roundedDivRef'), {
			height: 0,
			duration: commonTheme.durations.short / 1000,
			ease: 'linear'
		})
		setMenuMobileOpen(false)
	}

	return <Wrapper media={media} ref={headerRef}>
		<Logo inside={isMenuMobileOpen ? true : inside} closeMenu={closeMenu} pageTransition={pageTransition} />
		<TogglersAndNav media={media}>
			<ThemeTogglerContainer onClick={media === 'hugeDesk' || media === 'desk' ? ()=>{} : themeToggler} media={media}>
				<ThemeToggler toggleTheme={themeToggler} inside={inside} />
			</ThemeTogglerContainer>
			<AccentColorTogglerContainer media={media}>
				<AccentColorToggler toggleAccentColor={accentColorToggler} inside={inside} />
			</AccentColorTogglerContainer>
			{media === 'hugeDesk' || media === 'desk'
				? <Navigation pageTransition={pageTransition} inside={inside} accentColor={accentColor} />
				: isMenuMobileOpen
				? <Burger onClick={closeMenu} inside={true}>Закрыть</Burger>
				: <Burger onClick={openMenu} inside={inside}>Меню</Burger>
			}
		</TogglersAndNav>
		{(media !== 'hugeDesk' && media !== 'desk') && <MenuMobile ref={menuMobileRef} closeMenu={closeMenu} />}
	</Wrapper>
}

export default Header;