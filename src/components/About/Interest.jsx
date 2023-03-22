import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { commonTheme } from '../../styles/theme';
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
	cursor: pointer;
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
	cursor: ${({m, isScrolling}) => (m.isHugeDesk || m.isDesk) && !isScrolling ? 'none' : 'pointer'};
	z-index: 3;
`
const Interest = ({ children, i, wrapperRef, cirlceRef, interestActive, setInterestActive, disableClick, setDisableClick }) => {

	const media = useContext(MediaContext)
	const [isScrolling, setIsScrolling] = useState(false)
	const timeoutID = useRef()

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

	const showCirc = () => {
		if ((media.isHugeDesk || media.isDesk) && !isScrolling) {
			gsap.to(cirlceRef.current, {
				scale: 1,
				duration: commonTheme.durations.short,
				ease: 'power4.out',
			})
		}
	}

	const hideCirc = () => {
		if (media.isHugeDesk || media.isDesk) {
			gsap.to(cirlceRef.current, {
				scale: 0,
				duration: commonTheme.durations.short,
				ease: 'power4.out',
			})
		}
	}

	useEffect(() => {
		if (media.isHugeDesk || media.isDesk) {
			const el = wrapperRef.current
			const moveCirc = e => {
				gsap.to(cirlceRef.current, {
					left: e.pageX,
					top: e.pageY,
					duration: commonTheme.durations.middle,
					ease: 'power4.out',
				})
			}
			el.addEventListener('mousemove', moveCirc)

			return () => el.removeEventListener('mousemove', moveCirc)
		}
	}, [media, wrapperRef, cirlceRef])

	useEffect(() => {
		if (media.isHugeDesk || media.isDesk) {
			const el = wrapperRef.current
			const moveCircH = () => {
				const setTimeoutF = () => {
					setIsScrolling(true)
					timeoutID.current = setTimeout(() => { setIsScrolling(false) }, 600)
				}
				if (!isScrolling) {
					setTimeoutF()
				} else {
					clearTimeout(timeoutID.current)
					setTimeoutF()
				}

				gsap.to(cirlceRef.current, {
					scale: 0,
					duration: commonTheme.durations.short,
					ease: 'power4.out',
				})
			}
			el.addEventListener('wheel', moveCircH)

			return () => el.removeEventListener('wheel', moveCircH)
		}
	}, [media, isScrolling, wrapperRef, cirlceRef])

	return <Wrap>
		<Title i={i} m={media}>
			<LetterByLetter wavy
								active={interestActive[i].active}
								topFont='AccentFontT'
								bottomFont='AccentFontR'>
				{children}
			</LetterByLetter>
		</Title>
		<TitleArea className='interestArea'
						i={i}
						m={media}
						isScrolling={isScrolling}
						onClick={e => { if (!disableClick) switchGif(e, i) }}
						onMouseMove={showCirc}
						onMouseOut={hideCirc} />
	</Wrap>
}

export default Interest;