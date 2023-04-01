import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../AppWrap'
import { commonTheme } from '../styles/theme'
import tablet from '../assets/images/devices/tablet.png'
import smartphone from '../assets/images/devices/iphone14.png'

import long from '../assets/images/cases/dolgservis/long.webp'
import t1 from '../assets/images/cases/dolgservis/t1.webp'
import s1 from '../assets/images/cases/dolgservis/s1.webp'
import s2 from '../assets/images/cases/dolgservis/s2.webp'
import s3 from '../assets/images/cases/dolgservis/s3.webp'

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
		width: 100%;
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
const ColumnImg = styled.div`
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
		grid-row: 1/2;
		grid-column: ${({ m, gc }) => (m.isTabletP || m.isMobile ? '1/13' : gc)};
		width: 100%;
	}
`
const Dolgservis = ({ c }) => {
	const media = useContext(MediaContext)

	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone m={media}>
				<Title m={media}>Что сделано?</Title>
				<Text m={media}>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Изображение 10/12 колонок */}
			<ColumnImg m={media} gc='2/12'>
				<img src={long} alt='case' />
			</ColumnImg>

			{/* Смартфоны */}
			<Device m={media}>
				<div className='container'>
					<img src={s1} alt='vk' className='case caseMobile' />
					<img src={s2} alt='vk' className='case caseMobile' />
					<img src={s3} alt='vk' className='case caseMobile' />
				</div>
				<div className='container'>
					<img src={smartphone} alt='smartphone' />
					<img src={smartphone} alt='smartphone' />
					<img src={smartphone} alt='smartphone' />
				</div>
			</Device>

			{/* Планшет */}
			<Device m={media}>
				<img src={t1} alt='vk tablet' className='case caseTablet' />
				<img src={tablet} alt='tablet' />
			</Device>
		</Main>
	)
}

export default Dolgservis
