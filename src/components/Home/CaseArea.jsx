import React, { useContext } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';

const CarouselContainer = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk ? '2/3' : '1/4'};
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	width: 100%;
	height: 100%;
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	z-index: 4;
`
const Carousel = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile || m.isTabletP ? '1/13' : '2/12'};
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr;
	align-self: center;
	align-items: center;
	justify-content: center;
	width: 100%;
	aspect-ratio: ${({m}) => m.isMobile ? '2/3' : '16/9'};
	transform: translate( ${props => -props.currentIndex * 122 / props.scrollCount}%, ${props => -props.currentIndex * 100 / props.scrollCount}% );
	transition: transform ${commonTheme.durations.long}s ${commonTheme.easings.outPower4};
`
const CaseWrapper = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	width: 100%;
	height: 100%;
	transform: translate( ${({i}) => i * 122}%, ${({i}) => i * 100}% );
	cursor: ${({m}) => m.isHugeDesk || m.isDesk ? 'none' : 'pointer'};
`
const CaseArea = ({ caseData, currentIndex, scrollCount, showButtonRef, setHovering, setHoverNum, pageTransition }) => {

	const media = useContext(MediaContext)

	const moveCirc = e => {
		if (media.isHugeDesk || media.isDesk) {
			gsap.to(showButtonRef.current, {
				left: e.pageX,
				top: e.pageY,
				duration: commonTheme.durations.middle,
				ease: 'power4.out',
			})
		}
	}

	const mouseOverHandler = (i) => {
		if (media.isHugeDesk || media.isDesk) {
			gsap.to(showButtonRef.current, {
				scale: 1,
				duration: commonTheme.durations.short,
				ease: 'power4.out',
			})
			setHoverNum(i)
			setHovering(true)
		}
	}

	const mouseOutHandler = () => {
		if (media.isHugeDesk || media.isDesk) {
			gsap.to(showButtonRef.current, {
				scale: 0,
				duration: commonTheme.durations.short,
				ease: 'power4.out',
			})
			setHovering(false)
		}
	}

	let count = -1
	return <CarouselContainer m={media} onMouseMove={moveCirc}>
		<Carousel m={media} currentIndex={currentIndex} scrollCount={scrollCount}>
			{caseData.map((p, i) => {
				if (p.isMainSlider) {
					count++
					return <CaseWrapper key={p.slug.current}
												m={media}
												i={count}
												onMouseOver={() => mouseOverHandler(i)}
												onMouseOut={mouseOutHandler}
												onClick={() => pageTransition(`cases/${p.slug.current}`)} />
				}
				return null
			})}
		</Carousel>
	</CarouselContainer>
}

export default CaseArea;