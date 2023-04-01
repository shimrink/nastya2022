import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../AppWrap'
import { commonTheme } from '../styles/theme'
import tablet from '../assets/images/devices/tablet.png'
import smartphone from '../assets/images/devices/iphone14.png'

import list1 from '../assets/images/cases/professiiBudushego/1.webp'
import list2 from '../assets/images/cases/professiiBudushego/2.webp'
import list3 from '../assets/images/cases/professiiBudushego/3.webp'
import list4 from '../assets/images/cases/professiiBudushego/4.webp'
import t1 from '../assets/images/cases/professiiBudushego/t1.webp'
import s1 from '../assets/images/cases/professiiBudushego/s1.webp'
import s2 from '../assets/images/cases/professiiBudushego/s2.webp'
import s3 from '../assets/images/cases/professiiBudushego/s3.webp'

const Main = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`
const TwoImg = styled.div`
	display: grid;
	grid-template-columns: ${({ m }) => (m.isMobile ? '1fr' : '1fr 1fr')};
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
`
const Img = styled.img`
	grid-row: ${({ m, gr }) => (m.isMobile ? 'auto' : gr)};
	grid-column: ${({ m, gc }) => (m.isMobile ? 'auto' : gc)};
	width: 100%;
`
const WhatsDone = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
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
`
const Title = styled.h2`
	grid-row: 1/2;
	grid-column: 1/7;
	color: ${({ theme }) => theme.mode.text};
	font-size: 48px;
`
const Text = styled.p`
	grid-row: 1/2;
	grid-column: 7/13;
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
const ProfessiiBudushego = ({ c }) => {
	const media = useContext(MediaContext)

	return (
		<Main>
			{/* Два изображения */}
			<TwoImg m={media}>
				<Img m={media} gr='auto' gc='auto' src={list1} alt='Листовка' />
				<Img m={media} gr='auto' gc='auto' src={list2} alt='Листовка' />
			</TwoImg>

			{/* Что сделано? */}
			<WhatsDone m={media}>
				<Title>Что сделано?</Title>
				<Text m={media}>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Планшет */}
			<Device m={media}>
				<img src={t1} alt='vk tablet' className='case caseTablet' />
				<img src={tablet} alt='tablet' />
			</Device>

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

			{/* Два изображения */}
			<TwoImg m={media}>
				<Img m={media} gr='1/3' gc='1/2' src={list4} alt='Листовка' />
				<Img m={media} gr='2/4' gc='2/3' src={list3} alt='Листовка' />
			</TwoImg>
		</Main>
	)
}

export default ProfessiiBudushego