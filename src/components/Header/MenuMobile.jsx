import React, { forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import LetterByLetter from '../common/LetterByLetter';
import Navigation from './Navigation';

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${commonTheme.colors.white};
	width: 100%;
	height: 110%;
	touch-action: none;
	transform: translateY(-100%);
	z-index: 7;
`
const Content = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	font-family: 'AccentFontM', sans-serif;
	padding: ${({m}) => m.isMobile ? '24px clamp(24px, 7.5vw, 40px)' : '24px 40px'};
	background-color: ${ ({theme}) => theme.ac.dark };
`
const Social = styled.div`
	grid-row: 3/4;
	grid-column: 1/2;
	display: flex;
	align-items: flex-end;
	justify-content: ${({m}) => m.isMobile ? 'space-between' : 'center'};
	width: 100%;
	height: 100%;
	a {
		font-size: ${({m}) => m.isMobile ? 'clamp(14px, 3.855vw, 16px)' : '16px'};
		color: ${commonTheme.colors.white};
		margin: ${({m}) => m.isMobile ? '0' : '0 12px'};
	}
`
const RoundedDiv = styled.div`
	width: 120vw;
	height: 10%;
	background-color: ${ ({theme}) => theme.ac.dark };
	border-radius: 50% / 0 0 100% 100%;
	margin-top: -4px;
`
const MenuMobile = forwardRef(({ isMenuMobileOpen, closeMenu }, ref) => {

	const media = useContext(MediaContext)

	useEffect(() => {
		const el = ref.current
		const onWheel = e => {
			e.preventDefault()
		}
		el.addEventListener('wheel', onWheel)
		return () => el.removeEventListener('wheel', onWheel)
	})

	return <Wrapper ref={ref}>
		<Content m={media}>
			<Navigation mobile isMenuMobileOpen={isMenuMobileOpen} closeMenu={closeMenu} />
			<Social m={media}>
				<a href="https://vk.com/asyadulova" target="_blank" rel="noreferrer">
					<LetterByLetter wavy whiteCol>Vk</LetterByLetter>
				</a>
				<a href="https://t.me/asyadulova" target="_blank" rel="noreferrer">
					<LetterByLetter wavy whiteCol>Telegramm</LetterByLetter>
				</a>
				<a href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">
					<LetterByLetter wavy whiteCol>Ig</LetterByLetter>
				</a>
				<a href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">
					<LetterByLetter wavy whiteCol>Behance</LetterByLetter>
				</a>
				<a href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">
					<LetterByLetter wavy whiteCol>Tilda experts</LetterByLetter>
				</a>
			</Social>
		</Content>
		<RoundedDiv className='roundedDivRef' />
	</Wrapper>
})

export default MenuMobile;