import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';

const Wrap = styled.div`
	display: grid;
	width: 100%;
`
const Title = styled.h3`
	position: relative;
	grid-row: ${({i}) => `${i + 1}/${i + 2}`};
	grid-column: 1/2;
	font-size: ${({m}) => m.isMobile ? 'clamp(26px, 7.08vw, 48px)' : 'clamp(48px, 3.85vw, 76px)'};
	text-transform: uppercase;
	cursor: pointer;
	z-index: 1;
	transition: color ${commonTheme.durations.short}s;
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
const Interest = ({ children, i, mainRef, wrapperRef, cirlceRef }) => {

	const media = useContext(MediaContext)
	const [isScrolling, setIsScrolling] = useState(false)
	const timeoutID = useRef()

	const switchGif = e => {
		const titleAreasArr = document.querySelectorAll('.interestArea')
		const titlesArr = document.querySelectorAll('.interest')
		const gifsArr = document.querySelectorAll('.gif')
		const textsArr = document.querySelectorAll('.text')
		for (let i = 0; i < titleAreasArr.length; i++) {
			titlesArr[i].classList.remove('active')
			gifsArr[i].classList.remove('active')
			textsArr[i].classList.remove('active')
			if (e.target === titleAreasArr[i]) {
				titlesArr[i].classList.add('active')
				gifsArr[i].classList.add('active')
				textsArr[i].classList.add('active')
			}
		}
		e.target.classList.add('active')
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
					left: e.clientX,
					top: e.clientY + mainRef.current.scrollTop,
					duration: commonTheme.durations.middle,
					ease: 'power4.out',
				})
			}
			el.addEventListener('mousemove', moveCirc)

			return () => el.removeEventListener('mousemove', moveCirc)
		}
	}, [media, mainRef, wrapperRef, cirlceRef])

	useEffect(() => {
		if (media.isHugeDesk || media.isDesk) {
			const el = wrapperRef.current
			const moveCircH = e => {
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
		<Title i={i} className={i === 0 ? 'interest active' : 'interest'} m={media}>{children}</Title>
		<TitleArea className={i === 0 ? 'interestArea active' : 'interestArea'}
						i={i}
						m={media}
						isScrolling={isScrolling}
						onClick={switchGif}
						onMouseMove={showCirc}
						onMouseOut={hideCirc} />
	</Wrap>
}

export default Interest;