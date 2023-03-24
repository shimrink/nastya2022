import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import LetterByLetter from '../common/LetterByLetter';

const Wrap = styled.div`
	display: grid;
	font-size: ${({m}) => m.isMobile ? 'clamp(26px, 7.08vw, 48px)' : 'clamp(48px, 3.85vw, 76px)'};
	text-transform: uppercase;
`
const Title = styled.div`
	position: relative;
	grid-row: ${({i}) => `${i}/${i + 1}`};
	grid-column: 1/2;
	padding: ${({m}) => m.isMobile ? '12px 0' : m.isHugeDesk || m.isDesk ? '24px 0' : '10px 0'};
	z-index: 1;
	&:first-child {
		padding-top: 0;
	}
`
const TitleArea = styled.div`
	position: relative;
	grid-row: ${({i}) => `${i}/${i + 1}`};
	grid-column: 1/2;
	padding: ${({m}) => m.isMobile ? '12px 0' : m.isHugeDesk || m.isDesk ? '24px 0' : '10px 0'};
	z-index: 2;
	&:first-child {
		padding-top: 0;
	}
`
const Interest = ({ g, i, interestActive, setInterestActive, disableActive, setDisableActive }) => {

	const media = useContext(MediaContext)

	const switchGif = (i) => {
		setDisableActive(true)
		setInterestActive([
			{name: 'pets', active: i === 0},
			{name: 'colors', active: i === 1},
			{name: 'games', active: i === 2},
			{name: 'handiwork', active: i === 3},
		])
		setTimeout(() => { setDisableActive(false) }, 300)
	}

	return <Wrap m={media}>
		<Title i={i + 1} m={media}>
			<LetterByLetter wavy
								active={interestActive[i].active}
								topFont='AccentFontT'
								bottomFont='AccentFontM'>
				{g.title}
			</LetterByLetter>
		</Title>
		<TitleArea i={i + 1} m={media} onMouseOver={() => { if (!disableActive) switchGif(i) }} />
	</Wrap>
}

export default Interest;