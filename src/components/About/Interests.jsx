import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'
import { state } from '../../store'
import SectionTitle from '../common/SectionTitle'
import Interest from './Interest'

const Wrap = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({ m }) =>
			m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
	margin-top: ${({ m }) =>
		m.isHugeDesk || m.isDesk
			? 'clamp(472px, 35.105vw, 640px)'
			: m.isTabletA || m.isTabletP
			? 'clamp(444px, 52.205vw, 466px)'
			: 'clamp(208px, 57.64vw, 276px)'};
	margin-bottom: ${({ m }) =>
		m.isHugeDesk
			? '80px'
			: m.isDesk
			? '164px'
			: m.isTabletA
			? '88px'
			: m.isTabletP
			? '208px'
			: 'clamp(4px, 10vw, 96px)'};
`
const Content = styled.div`
	grid-row: 2/3;
	grid-column: ${({ m }) => (m.isHugeDesk ? '2/3' : '1/4')};
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: ${({ m }) =>
		m.isMobile ? 'clamp(24px, 7.5vw, 40px)' : m.isTabletP ? '40px' : '24px'};
	padding: ${({ m }) =>
		m.isHugeDesk
			? '0'
			: m.isDesk
			? '0 80px'
			: m.isMobile
			? '0 clamp(24px, 7.5vw, 40px)'
			: '0 40px'};
`
const Gif = styled.img`
	grid-row: 1/3;
	grid-column: ${({ m }) => (m.isMobile || m.isTabletP ? '1/7' : '2/6')};
	width: 100%;
	opacity: ${({ active }) => (active ? 1 : 0)};
	transition: opacity ${commonTheme.durations.short}s;
`
const Toggles = styled.div`
	grid-row: 1/2;
	grid-column: 7/13;
	display: flex;
	flex-direction: column;
`
const TextContainer = styled.div`
	grid-row: ${({ m }) => (m.isMobile ? '3/4' : '2/3')};
	grid-column: ${({ m }) => (m.isMobile ? '1/13' : '7/13')};
	display: grid;
	align-items: ${({ m }) => (m.isMobile ? 'start' : 'end')};
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 24px;
	margin-top: ${({ m }) => (m.isMobile ? 48 : 0)}px;
`
const Text = styled.div`
	grid-row: 1/2;
	grid-column: ${({ m }) =>
		m.isHugeDesk ? '1/5' : m.isDesk || m.isTabletA ? '1/6' : '1/7'};
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
	white-space: pre-line;
	opacity: ${({ active }) => (active ? 1 : 0)};
	transition: opacity ${commonTheme.durations.short}s;
`
const Interests = () => {
	const media = useContext(MediaContext)
	const [disableActive, setDisableActive] = useState(false)
	const [interestActive, setInterestActive] = useState([
		{ name: 'pets', active: true },
		{ name: 'colors', active: false },
		{ name: 'games', active: false },
		{ name: 'handiwork', active: false },
	])

	return (
		<Wrap m={media}>
			<SectionTitle mbTabletA='48px' mbTabletP='48px'>
				Мои интересы
			</SectionTitle>
			<Content m={media}>
				{state.gifs.map((g, i) => (
					<Gif
						key={g.alt}
						m={media}
						active={interestActive[i].active}
						src={g.url}
						alt={g.alt}
					/>
				))}
				<Toggles m={media}>
					{state.gifs.map((g, i) => (
						<Interest
							key={g.alt}
							g={g}
							i={i}
							interestActive={interestActive}
							setInterestActive={setInterestActive}
							disableActive={disableActive}
							setDisableActive={setDisableActive}
						/>
					))}
				</Toggles>
				<TextContainer m={media}>
					{state.gifs.map((g, i) => (
						<Text key={i} active={interestActive[i].active} m={media}>
							{g.text}
						</Text>
					))}
				</TextContainer>
			</Content>
		</Wrap>
	)
}

export default Interests
