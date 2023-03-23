import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import LetterByLetter from '../common/LetterByLetter';

const Wrap = styled.div`
	display: grid;
	width: 100%;
`
const Title = styled.div`
	position: relative;
	grid-row: ${({i}) => `${i + 1}/${i + 2}`};
	grid-column: 1/2;
	font-size: ${({m}) => m.isMobile ? 'clamp(26px, 7.08vw, 48px)' : 'clamp(48px, 3.85vw, 76px)'};
	text-transform: uppercase;
	z-index: 1;
	&.active {
		font-family: 'AccentFontM';
		font-weight: 500;
		color: ${ ({theme}) => theme.ac.dark };
	}
`
const TitleArea = styled.div`
	position: relative;
	grid-row: ${({i}) => `${i + 1}/${i + 2}`};
	grid-column: 1/2;
	width: 100%;
	z-index: 2;
`
const Interest = ({ children, i, interestActive, setInterestActive, disableClick, setDisableClick }) => {

	const media = useContext(MediaContext)

	const switchGif = (e, i) => {
		setDisableClick(true)
		setTimeout(() => { setDisableClick(false) }, 300)
		const titleAreasArr = document.querySelectorAll('.interestArea')
		const textsArr = document.querySelectorAll('.text')

		setInterestActive([
			{name: 'pets', active: i === 0},
			{name: 'colors', active: i === 1},
			{name: 'games', active: i === 2},
			{name: 'handiwork', active: i === 3},
		])

		for (let index = 0; index < titleAreasArr.length; index++) {
			textsArr[index].classList.remove('activeOpacity')
			if (e.target !== titleAreasArr[index]) {
				setTimeout(() => { textsArr[index].classList.add('deactiveHeight') }, 300)
			} else {
				textsArr[index].classList.remove('deactiveHeight')
				textsArr[index].classList.add('activeOpacity')
			}
		}
	}

	return <Wrap>
		<Title i={i} m={media}>
			<LetterByLetter wavy
								active={interestActive[i].active}
								topFont='AccentFontT'
								bottomFont='AccentFontM'>
				{children}
			</LetterByLetter>
		</Title>
		<TitleArea className='interestArea'
						i={i}
						m={media}
						onMouseOver={e => { if (!disableClick) switchGif(e, i) }} />
	</Wrap>
}

export default Interest;