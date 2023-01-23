import React, { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';
import { AccentColorContext, MediaContext } from '../App';
import state from '../store';
import { commonTheme } from '../styles/theme';
import asyaImg from '../assets/images/Asya.png';

const FooterWrapper = styled.footer`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: ${ ({media}) => media === 'hugeDesk' ? state.home.gridWidth + 'px' : '100%' };
	margin-top: ${ ({media}) => media === 'tabletA' || media === 'tabletP' ? 288 : 384 }px;
`
const UpperFooter = styled.div`
	display: grid;
	grid-template-rows: ${({media}) => media === 'mobile' ? 'auto' : '1fr 1fr 1fr' };
	grid-template-columns: ${({media}) => media === 'tabletP' ? 'repeat(4, 1fr)'
								: media === 'mobile' ? '1fr 1fr'
								: 'repeat(12, 1fr)'};
	grid-row-gap: 48px;
	grid-column-gap: 24px;
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16 }px;
	padding: ${({media}) => media === 'hugeDesk' ? '0'
								: media === 'mobile' ? '0 24px'
								: '0 40px'};
`
const TitleWrap = styled.div`
	position: absolute;
	left: 0;
	display: flex;
	align-self: ${ ({media}) => media === 'tabletA' || media === 'tabletP' ? 'flex-start' : 'center' };
	margin-top: ${({media}) => media === 'tabletA' ? '40'
									: media === 'tabletP' ? '96'
									: 'mobile' ? '100'
									: '0'}px;
	overflow: hidden;
	z-index: ${ ({media}) => media === 'mobile' ? 3 : 1 };
	h2 {
		margin-left: 10px;
	}
	h2:last-child {
		margin-left: 0;
	}
`
const Title = styled.h2`
	color: ${ ({theme}) => theme.text };
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 124 : media === 'tabletA' ? 76 : 48 }px;
	text-transform: uppercase;
	white-space: nowrap;
	margin-right: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 30 : 22 }px;
	span {
		font-family: 'WinterR', sans-serif;
		color: ${ ({accentColor}) => accentColor.dark };
	}
`
const Img = styled.img`
	grid-row: ${ ({media}) => media === 'mobile' ? '1/2' : '1/4' };
	grid-column: ${ ({media}) => media === 'tabletA' ? '3/7'
										: media === 'tabletP' ? '1/3'
										: media === 'mobile' ? '1/3'
										: '5/9'};
	width: 100%;
	z-index: 2;
`
const Text = styled.p`
	grid-row: 3/4;
	grid-column: ${ ({media}) => media === 'tabletA' ? '7/11'
										: media === 'tabletP' ? '3/5'
										: media === 'mobile' ? '1/3'
										: '1/5'};
`
const Contacts = styled.div`
	grid-row: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '3/4' : '2/3' };
	grid-column: ${ ({media}) => media === 'hugeDesk' ? '10/12'
										: media === 'desk' ? '9/11'
										: media === 'tabletA' ? '7/9'
										: media === 'tabletP' ? '3/4'
										: '1/2'};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: ${ ({media}) => media === 'tabletP' ? 'center' : 'flex-start' };
`
const Social = styled.div`
	grid-row: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '3/4' : '2/3' };
	grid-column: ${ ({media}) => media === 'hugeDesk' ? '12/13'
										: media === 'desk' ? '11/13'
										: media === 'tabletA' ? '9/13'
										: media === 'tabletP' ? '4/5'
										: '2/3'};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: ${ ({media}) => media === 'tabletP' ? 'center' : 'flex-start' };
`
const DevGrid = styled.div`
	display: grid;
	grid-template-columns: ${({media}) => media === 'tabletP' ? 'repeat(4, 1fr)'
								: media === 'mobile' ? '1fr 1fr'
								: 'repeat(12, 1fr)'};
	grid-column-gap: 24px;
	padding: ${({media}) => media === 'hugeDesk' ? '0 0 40px 0'
								: media === 'desk' ? '0 40px 40px 40px'
								: media === 'mobile' ? '0 24px 24px 24px'
								: '0 40px 24px 40px'};
	margin-top: 158px;
`
const Dev = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'tabletA' ? '7/13'
										: media === 'tabletP' ? '3/5'
										: media === 'mobile' ? '1/3'
										: '9/13'};
	display: flex;
	flex-direction: column;
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 16 : 14 }px;
	color: ${commonTheme.colors.secondary};
`
const UnderFooter = styled.div`
	position: absolute;
	display: ${ ({media}) => media === 'mobile' || media === 'tabletP' ? 'grid' : 'flex' };
	grid-row-gap: 24px;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 16 : 14 }px;
	color: ${commonTheme.colors.secondary};
	padding: ${({media}) => media === 'hugeDesk' ? '0 0 40px 0'
								: media === 'desk' ? '0 40px 40px 40px'
								: media === 'mobile' ? '0 24px 24px 24px'
								: '0 40px 24px 40px'};
`
const Meta = styled.span`
	grid-row: 1/2;
	grid-column: 1/3;
`
const Year = styled.div`
	grid-row: ${ ({media}) => media === 'tabletP' ? '1/2' : '2/3' };
	grid-column: ${ ({media}) => media === 'tabletP' ? '3/5' : '2/3' };
	display: flex;
	flex-direction: column;
	text-align: end;
`
const Footer = () => {

	const {pathname} = useLocation()

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const titleWrapRef = useRef()
	
	useEffect(() => {
		if (titleWrapRef && pathname === '/portfolio') {
			gsap.to(titleWrapRef.current, {
				xPercent: -50,
				duration: 10,
				ease: 'none',
				repeat: -1,
			})
		}
	})

	if (pathname === '/') return null
	return <FooterWrapper media={media}>
		<UpperFooter media={media}>
			<TitleWrap ref={titleWrapRef} media={media}>
				<Title media={media} accentColor={accentColor}>Расскажите <span>о своей задаче</span> ·</Title>
				<Title media={media} accentColor={accentColor}>Расскажите <span>о своей задаче</span> ·</Title>
			</TitleWrap>
			<Text media={media}>Я&nbsp;на&nbsp;связи в&nbsp;рабочее время: отвечу на&nbsp;возникшие вопросы, сориентирую в&nbsp;области онлайн-упаковки бизнеса и пойму, что вам необходимо!</Text>
			<Contacts media={media}>
				<a href="https://vk.com/asyadulova" target="_blank" rel="noreferrer">Vk</a>
				<a href="https://t.me/asyadulova" target="_blank" rel="noreferrer">Telegramm</a>
				<a href="mailto:me@asyadulova.ru?subject=Запись на консультацию">Email</a>
			</Contacts>
			<Social media={media}>
				<a href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">Ig*</a>
				<a href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">Behance</a>
				<a href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">Tilda experts</a>
			</Social>
			<Img media={media} src={asyaImg} alt='Asya'/>
		</UpperFooter>
		<DevGrid media={media}>
			<Dev media={media}>
				<span>Design Asya Dulova</span>
				<span>Development Impvlse</span>
			</Dev>
		</DevGrid>
		<UnderFooter media={media}>
			<Meta>*Meta Platforms Inc. признана экстремистской<br/>организацией и запрещена на территории РФ</Meta>
			<Year media={media}>
				<span>©2023</span>
				<span>ASYADULOVA</span>
			</Year>
		</UnderFooter>
	</FooterWrapper>
}

export default Footer;