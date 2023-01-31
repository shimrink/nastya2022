import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import ThemeToggler from './ThemeToggler';
import AccentColorToggler from './AccentColorToggler';
import Navigation from './Navigation';
import Logo from './Logo';
import { AccentColorContext, MediaContext } from '../../AppWrap';

const HeaderWrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: grid;
	grid-template-columns: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 'repeat(12, 1fr)' : '1fr' };
	grid-column-gap: 24px;
	align-items: center;
	font-family: 'AccentFontM', sans-serif;
	touch-action: none;
	padding: ${({media}) => media === 'hugeDesk' || media === 'desk'
									? '40px 40px 0 40px'
									: media === 'tabletA' || media === 'tabletP'
									? '24px 40px 0 40px'
									: '24px 24px 0 24px'};
	z-index: 2147000002;
`
const TogglersAndNav = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '6/13' : '1/2' };
	display: grid;
	grid-template-columns: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 'repeat(7, 1fr)' : 'auto' };
	grid-column-gap: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 24 : 0 }px;
	align-items: center;
	justify-self: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 'auto' : 'end' };
`
const ThemeTogglerContainer = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '1/2' : '2/3' };
	display: flex;
	justify-content: flex-end;
	margin-right: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 0 : 18 }px;
	padding: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 0 : 6 }px;
	cursor: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 'auto' : 'pointer' };
`
const AccentColorTogglerContainer = styled.div`
	grid-row: 1/2;
	justify-self: start;
	grid-column: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '2/4' : '1/2' };
`
const Burger = styled.span`
	grid-row: 1/2;
	grid-column: 3/4;
	justify-self: end;
	font-size: ${commonTheme.fontSizes.text.mobile}px;
	color: ${({theme, inside}) => inside ? commonTheme.colors.primary : theme.text};
	cursor: pointer;
	transition: color ${commonTheme.durations.short}ms;
`
const Header = ({ isMainPage, themeToggler, accentColorToggler, topBlockH }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const [inside, setInside] = useState(false)

	// Сделать запуск функций только если есть document.getElementById('topBlock')

	useEffect(() => {
		setInside(!isMainPage)
	}, [isMainPage])

	useEffect(() => {
		if (!isMainPage) {
			const onScroll = () => {
				let halfHeaderHeight = media === 'hugeDesk' || media === 'desk' ? 57.25 : 40
				if (topBlockH - halfHeaderHeight < window.pageYOffset) {
					setInside(false)
				} else {
					setInside(true)
				}
			}
			window.addEventListener('scroll', onScroll)
			return () => window.removeEventListener('scroll', onScroll)
		}
	})

	useEffect(() => {
		const el = document.querySelector('.headerContainer')
		const onWheel = e => {
			e.preventDefault()
		}
		el.addEventListener('wheel', onWheel)
		return () => el.removeEventListener('wheel', onWheel)
	})

	const openMenu = () => {
		document.querySelector('.menuMobile').style.transform = 'translateX(0)'
	}

	return <HeaderWrapper media={media} className='headerContainer'>
		<Logo inside={inside} />
		<TogglersAndNav media={media}>
			<ThemeTogglerContainer onClick={media === 'hugeDesk' || media === 'desk' ? ()=>{} : themeToggler} media={media}>
				<ThemeToggler toggleTheme={themeToggler} inside={inside} />
			</ThemeTogglerContainer>
			<AccentColorTogglerContainer media={media}>
				<AccentColorToggler toggleAccentColor={accentColorToggler} inside={inside} />
			</AccentColorTogglerContainer>
			{media === 'hugeDesk' || media === 'desk'
				? <Navigation inside={inside} accentColor={accentColor} />
				: <Burger onClick={openMenu} inside={inside}>Меню</Burger>}
		</TogglersAndNav>
	</HeaderWrapper>
}

export default Header;