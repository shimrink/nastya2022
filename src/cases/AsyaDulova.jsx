import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../AppWrap'
import { commonTheme } from '../styles/theme'
import SectionTitle from '../components/common/SectionTitle'
import desk from '../assets/images/devices/desk.png'
import laptop from '../assets/images/devices/laptop.png'
import tablet from '../assets/images/devices/tablet.png'
import smartphone from '../assets/images/devices/iphone14.png'

const Main = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`
const WhatsDone = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-row-gap: 20px;
	grid-column-gap: ${({ m }) =>
		m.isMobile ? 'clamp(24px, 7.5vw, 40px)' : m.isTabletP ? '40px' : '24px'};
	width: ${({ m }) => (m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%')};
	padding: ${({ m }) =>
		m.isHugeDesk
			? '0'
			: m.isDesk
			? '0 80px'
			: m.isMobile
			? '0 clamp(24px, 7.5vw, 40px)'
			: '0 40px'};
	margin: 120px 0;
	transition: color ${commonTheme.durations.short}s;
`
const Title = styled.h2`
	grid-row: 1/2;
	grid-column: ${({ m }) => (m.isMobile ? '1/13' : m.isDesk ? '1/8' : '1/7')};
	color: ${({ theme }) => theme.mode.text};
	font-size: ${({ m }) =>
		m.isHugeDesk || m.isDesk
			? 'clamp(40px, 2.815vw, 48px)'
			: m.isMobile
			? 'clamp(22px, 6.18vw, 30px)'
			: 'clamp(24px, 3.065vw, 30px)'};
	text-transform: uppercase;
`
const Text = styled.p`
	grid-row: ${({ m }) => (m.isMobile ? '2/3' : '1/2')};
	grid-column: ${({ m }) =>
		m.isHugeDesk ? '7/11' : m.isDesk ? '8/13' : m.isMobile ? '1/13' : '7/13'};
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
`
const Device = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	justify-items: center;
	width: ${({ m }) => (m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%')};
	padding: ${({ m }) =>
		m.isHugeDesk
			? '0'
			: m.isDesk
			? '0 80px'
			: m.isMobile
			? '0 clamp(24px, 7.5vw, 40px)'
			: '0 40px'};
	margin: ${({ m }) => (m.isMobile ? '50px 0' : '150px 0')};
	img {
		position: relative;
		grid-row: 1/2;
		grid-column: ${({ m }) => (m.isTabletP || m.isMobile ? '1/13' : '2/12')};
		width: 100%;
		z-index: 2;
	}
	img.case {
		aspect-ratio: 16/10;
		object-fit: cover;
		z-index: 1;
	}
	img.caseDesk {
		width: 99.3%;
		border-radius: 0.625% / 1%;
		margin-top: 0.5%;
	}
	img.caseLaptop {
		width: 74.8%;
		border-radius: 3% / 5% 5% 0 0;
		margin-top: 0.3%;
	}
	img.caseTablet {
		width: 98.5%;
		border-radius: 5% / 8%;
		margin-top: 1%;
	}
	.container {
		grid-row: 1/2;
		grid-column: ${({ m }) => (m.isTabletP || m.isMobile ? '1/13' : '2/12')};
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: ${({ m }) =>
			m.isHugeDesk || m.isDesk ? 80 : m.isMobile ? 20 : 40}px;
		justify-items: center;
		img {
			grid-column: auto;
		}
		img.caseMobile {
			aspect-ratio: 9/19;
			width: 94%;
			border-radius: 12% / 6%;
			margin-top: 1.75%;
		}
	}
`
const SpecialThanks = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	span {
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
		text-transform: uppercase;
		margin-bottom: ${({ m }) =>
			m.isHugeDesk || m.isDesk
				? '24px'
				: m.isMobile
				? 'clamp(6px, 2.085vw, 12px)'
				: '12px'};
	}
	span:last-child {
		margin-bottom: 0;
	}
	.name {
		font-family: 'AccentFontM', sans-serif;
		font-weight: 500;
		font-size: ${({ m }) =>
			m.isMobile ? 'clamp(30px, 9.165vw, 48px)' : '48px'};
		color: ${({ theme }) => theme.ac.dark};
	}
`
const AsyaDulova = ({ c }) => {
	const media = useContext(MediaContext)

	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone m={media}>
				<Title m={media}>Что сделано?</Title>
				<Text m={media}>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Компьютер */}
			<Device m={media}>
				<img src={c.mainImage.asset.url} alt='case' className='case caseDesk' />
				<img src={desk} alt='desktop' />
			</Device>

			{/* Ноутбук */}
			<Device m={media}>
				<img
					src={c.mainImage.asset.url}
					alt='case'
					className='case caseLaptop'
				/>
				<img src={laptop} alt='laptop' />
			</Device>

			{/* Планшет */}
			<Device m={media}>
				<img
					src={c.mainImage.asset.url}
					alt='case'
					className='case caseTablet'
				/>
				<img src={tablet} alt='tablet' />
			</Device>

			{/* Смартфоны */}
			<Device m={media}>
				<div className='container'>
					<img
						src={c.mobileImage.asset.url}
						alt='case'
						className='case caseMobile'
					/>
					<img
						src={c.mobileImage.asset.url}
						alt='case'
						className='case caseMobile'
					/>
					<img
						src={c.mobileImage.asset.url}
						alt='case'
						className='case caseMobile'
					/>
				</div>
				<div className='container'>
					<img src={smartphone} alt='smartphone' />
					<img src={smartphone} alt='smartphone' />
					<img src={smartphone} alt='smartphone' />
				</div>
			</Device>

			{/*
			Заголовок с линией.
			Отступы снизу по умолчанию:
			mbHugeDesk='76px' mbDesk='76px' mbTabletA='76px' mbTabletP='76px' mbMobile='48px'
		*/}
			<SectionTitle
				mbHugeDesk='0px'
				mbDesk='0px'
				mbTabletA='0px'
				mbTabletP='0px'
				mbMobile='0px'
			>
				Текст
			</SectionTitle>

			{/* Особая благодарность */}
			<SpecialThanks m={media}>
				<span>Разработка сайта</span>
				<span className='name'>Impulse</span>
			</SpecialThanks>
		</Main>
	)
}

export default AsyaDulova
