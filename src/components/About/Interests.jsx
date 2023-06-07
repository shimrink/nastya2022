import React, { useState } from 'react'
import styled from 'styled-components'
import { state } from '../../store'
import SectionTitle from '../common/SectionTitle'
import Interest from './Interest'

const Wrap = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({ theme }) => theme.common.gridWidth}px 1fr;
	margin-top: clamp(472px, 35.105vw, 640px);
	margin-bottom: 80px;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-template-columns: 1fr 1fr 1fr;
		margin-bottom: 164px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin: clamp(444px, 52.205vw, 466px) 0 88px 0;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin: clamp(444px, 52.205vw, 466px) 0 208px 0;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin: clamp(208px, 57.64vw, 276px) 0 clamp(4px, 10vw, 96px) 0;
	}
`
const Content = styled.div`
	grid-row: 2/3;
	grid-column: 2/3;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/4;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column-gap: clamp(24px, 7.5vw, 40px);
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const Gif = styled.img`
	grid-row: 1/3;
	grid-column: 2/6;
	width: 100%;
	opacity: ${({ active }) => (active ? 1 : 0)};
	transition: opacity ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 1/7;
	}
`
const Toggles = styled.div`
	grid-row: 1/2;
	grid-column: 7/13;
	display: flex;
	flex-direction: column;
`
const TextContainer = styled.div`
	grid-row: 2/3;
	grid-column: 7/13;
	display: grid;
	align-items: end;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 24px;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 3/4;
		grid-column: 1/13;
		align-items: start;
		margin-top: 48px;
	}
`
const Text = styled.div`
	grid-row: 1/2;
	grid-column: 1/5;
	font-size: 18px;
	white-space: pre-line;
	opacity: ${({ active }) => (active ? 1 : 0)};
	transition: opacity ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/6;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 1/7;
	}
`
const Interests = () => {
	const [disableActive, setDisableActive] = useState(false)
	const [interestActive, setInterestActive] = useState([
		{ name: 'pets', active: true },
		{ name: 'colors', active: false },
		{ name: 'games', active: false },
		{ name: 'handiwork', active: false },
	])

	return (
		<Wrap>
			<SectionTitle mbTabletA='48px' mbTabletP='48px'>
				Мои интересы
			</SectionTitle>
			<Content>
				{state.gifs.map((g, i) => (
					<Gif
						key={g.alt}
						active={interestActive[i].active}
						src={g.url}
						alt={g.alt}
					/>
				))}
				<Toggles>
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
				<TextContainer>
					{state.gifs.map((g, i) => (
						<Text key={i} active={interestActive[i].active}>
							{g.text}
						</Text>
					))}
				</TextContainer>
			</Content>
		</Wrap>
	)
}

export default Interests
