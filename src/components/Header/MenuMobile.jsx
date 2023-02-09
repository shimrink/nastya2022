import React, { forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import Navigation from './Navigation';

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${commonTheme.colors.primary};
	width: 100%;
	height: 110%;
	touch-action: none;
	transform: translateY(-110%);
	z-index: 2147000003;
`
const Content = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	font-family: 'AccentFontM', sans-serif;
	padding: ${({media}) => media === 'mobile' ? '24px clamp(24px, 7.5vw, 40px)' : '24px 40px'};
	background-color: ${ ({accentColor}) => accentColor.dark };
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
const RoundedDiv = styled.div`
	width: 120vw;
	height: 10%;
	background-color: ${ ({accentColor}) => accentColor.dark };
	border-radius: 50% / 0 0 100% 100%;
	margin-top: -4px;
`
const MenuMobile = forwardRef(({ closeMenu }, ref) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	useEffect(() => {
		const el = ref.current
		const onWheel = e => {
			e.preventDefault()
		}
		el.addEventListener('wheel', onWheel)
		return () => el.removeEventListener('wheel', onWheel)
	})

	return <Wrapper ref={ref}>
		<Content accentColor={accentColor} media={media}>
			<Navigation mobile closeMenu={closeMenu} accentColor={accentColor} />
			<Social media={media}>
				<a href="https://vk.com/asyadulova" target="_blank" rel="noreferrer">Vk</a>
				<a href="https://t.me/asyadulova" target="_blank" rel="noreferrer">Telegramm</a>
				<a href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">Ig</a>
				<a href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">Behance</a>
				<a href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">Tilda experts</a>
			</Social>
		</Content>
		<RoundedDiv className='roundedDivRef' accentColor={accentColor} />
	</Wrapper>
})

export default MenuMobile;