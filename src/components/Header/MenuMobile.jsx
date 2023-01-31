import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import Navigation from './Navigation';
import Logo from './Logo';
import { AccentColorContext, MediaContext } from '../../AppWrap';

const MenuMobileWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: grid;
	background-color: ${ ({accentColor}) => accentColor.dark };
	color: ${commonTheme.colors.primary};
	width: 100%;
	height: 100vh;
	font-family: 'AccentFontM', sans-serif;
	touch-action: none;
	padding: ${({media}) => media === 'mobile' ? '24px' : '24px 40px'};
	transform: translateX(100%);
	transition: transform ${commonTheme.durations.short}ms;
	z-index: 2147000003;
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
const MenuMobile = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	useEffect(() => {
		const el = document.querySelector('.menuMobile')
		const onWheel = e => {
			e.preventDefault()
		}
		el.addEventListener('wheel', onWheel)
		return () => el.removeEventListener('wheel', onWheel)
	})

	const closeMenu =() => {
		document.querySelector('.menuMobile').style.transform = 'translateX(100%)'
	}

	return <MenuMobileWrapper accentColor={accentColor} media={media} className='menuMobile'>
		<HatMobile>
			<Logo mobile closeMenu={closeMenu} />
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
	</MenuMobileWrapper>
}

export default MenuMobile;