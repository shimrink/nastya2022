import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import ThemeToggler from './ThemeToggler';
import AccentColorToggler from './AccentColorToggler';
import Navigation from './Navigation';
import Logo from './Logo';
import { AccentColorContext, MediaContext } from '../../App';

const HeaderWrapper = styled.div`
	width: 100vw;
	font-family: 'WinterR', sans-serif;
	overflow: hidden;
	touch-action: none;
	z-index: 2147000001;
`
const Hat = styled.header`
	position: fixed;
	width: 100vw;
	display: grid;
	grid-template-columns: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 'repeat(12, 1fr)' : '1fr' };
	grid-column-gap: 24px;
	align-items: center;
	padding: ${({media}) => media === 'hugeDesk' || media === 'desk'
									? '40px 40px 0 40px'
									: media === 'tabletA' || media === 'tabletP'
									? '24px 40px 0 40px'
									: '24px 24px 0 24px'
	};
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
	cursor: pointer;
`
const MenuMobile = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	background-color: ${ props => props.accentColor };
	color: ${commonTheme.colors.primary};
	width: 100vw;
	height: 100vh;
	padding: 24px;
	transform: translateX(100%);
	transition: transform ${commonTheme.durations.short}ms;
	z-index: 2147000002;
`
const HatMobile = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	display: flex;
	justify-content: space-between;
`
const Close = styled.div`
	span {
		cursor: pointer;
	}
`
const Social = styled.div`
	grid-row: 3/4;
	grid-column: 1/2;
	display: flex;
	align-items: flex-end;
	justify-content: ${ ({media}) => media === 'mobile' ? 'space-between' : 'center' };
	width: 100%;
	height: 100%;
	a {
		font-size: ${ ({media}) => media === 'mobile' ? 'clamp(14px, 3.855vw, 16px)' : commonTheme.fontSizes.text.tabletA + 'px' };
		color: ${commonTheme.colors.primary};
		margin: ${ ({media}) => media === 'mobile' ? '0' : '0 12px' };
	}
`
const Header = ({ toggleTheme, accentColorToggler }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const menuMobileRef = useRef()

	const openMenu = () => {
		menuMobileRef.current.style.transform = 'translateX(0)'
	}
	
	const closeMenu = () => {
		menuMobileRef.current.style.transform = 'translateX(100%)'
	}

	useEffect(() => {
		const el = document.querySelector('.header-container')
		const onWheel = e => {
			e.preventDefault()
		}
		el.addEventListener('wheel', onWheel)
		return () => el.removeEventListener('wheel', onWheel)
	})

	return <HeaderWrapper className='header-container'>
		<Hat media={media}>
			<Logo accentColor={accentColor} media={media} />
			<TogglersAndNav media={media}>
				<ThemeTogglerContainer onClick={media === 'hugeDesk' || media === 'desk' ? ()=>{} : toggleTheme} media={media}>
					<ThemeToggler toggleTheme={toggleTheme} />
				</ThemeTogglerContainer>
				<AccentColorTogglerContainer media={media}>
					<AccentColorToggler toggleAccentColor={accentColorToggler} />
				</AccentColorTogglerContainer>
				{
					media === 'hugeDesk' || media === 'desk'
					? <Navigation accentColor={accentColor} />
					: <Burger onClick={openMenu}>Меню</Burger>
				}
			</TogglersAndNav>
		</Hat>
		{media !== 'hugeDesk' && media !== 'desk' &&
		<MenuMobile ref={menuMobileRef} accentColor={accentColor.dark}>
			<HatMobile>
				<Logo mobile closeMenu={closeMenu} accentColor={accentColor} media={media} />
				<Close>
					<span onClick={closeMenu}>Закрыть</span>
				</Close>
			</HatMobile>
			<Navigation mobile closeMenu={closeMenu} accentColor={accentColor} />
			<Social media={media}>
				<a href="https://vk.com/asyadulova" target="_blank" rel="noreferrer">Vk</a>
				<a href="https://t.me/asyadulova" target="_blank" rel="noreferrer">Telegramm</a>
				<a href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">Ig</a>
				<a href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">Behance</a>
				<a href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">Tilda experts</a>
			</Social>
		</MenuMobile>}
	</HeaderWrapper>
}

export default Header;