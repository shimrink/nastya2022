import React from 'react'
import styled from 'styled-components'
import LetterByLetter from '../common/LetterByLetter'

const Wrap = styled.div`
	display: grid;
	font-size: clamp(48px, 3.85vw, 76px);
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.mobile} {
		font-size: clamp(26px, 7.08vw, 48px);
	}
`
const TitleCommon = styled.div`
	position: relative;
	grid-row: ${({ i }) => `${i}/${i + 1}`};
	grid-column: 1/2;
	padding: 24px 0;
	&:first-child {
		padding-top: 0;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding: 10px 0;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 12px 0;
	}
`
const Title = styled(TitleCommon)`
	z-index: 1;
`
const TitleArea = styled(TitleCommon)`
	z-index: 2;
`
const Interest = ({
	g,
	i,
	interestActive,
	setInterestActive,
	disableActive,
	setDisableActive,
}) => {
	const switchGif = (i) => {
		setDisableActive(true)
		setInterestActive([
			{ name: 'pets', active: i === 0 },
			{ name: 'colors', active: i === 1 },
			{ name: 'games', active: i === 2 },
			{ name: 'handiwork', active: i === 3 },
		])
		setTimeout(() => {
			setDisableActive(false)
		}, 300)
	}

	return (
		<Wrap>
			<Title i={i + 1}>
				<LetterByLetter
					wavy
					active={interestActive[i].active}
					topFont='AccentFontT'
					bottomFont='AccentFontM'
				>
					{g.title}
				</LetterByLetter>
			</Title>
			<TitleArea
				i={i + 1}
				onMouseOver={() => {
					if (!disableActive) switchGif(i)
				}}
			/>
		</Wrap>
	)
}

export default Interest
