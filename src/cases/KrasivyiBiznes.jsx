import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../AppWrap'
import { commonTheme } from '../styles/theme'

import long from '../assets/images/cases/krasivyiBiznes/long.webp'
import short from '../assets/images/cases/krasivyiBiznes/short.webp'

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
const FullWidthImg = styled.img`
	width: 100%;
`
const KrasivyiBiznes = ({ c }) => {
	const media = useContext(MediaContext)

	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone m={media}>
				<Title m={media}>Что сделано?</Title>
				<Text m={media}>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Изображение во всю ширину экрана */}
			<FullWidthImg src={long} alt='case' />
			<FullWidthImg src={short} alt='case' />
		</Main>
	)
}

export default KrasivyiBiznes
