import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../AppWrap'
import { commonTheme } from '../styles/theme'

import long from '../assets/images/cases/pride/long.webp'

const Main = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
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
const FullWidthImg = styled.img`
	width: 100%;
`
const Pride = ({ c }) => {
	const media = useContext(MediaContext)

	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone m={media}>
				<Title>Что сделано?</Title>
				<Text m={media}>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Изображение во всю ширину экрана */}
			<FullWidthImg src={long} alt='case' />
		</Main>
	)
}

export default Pride
