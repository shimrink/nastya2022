import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';

const CarouselContainer = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk ? '2/3' : '1/4'};
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	width: 100%;
	height: 100%;
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
`
const Carousel = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile || m.isTabletP ? '1/13' : '2/12'};
	position: absolute;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr;
	align-self: center;
	align-items: center;
	justify-content: center;
	width: 100%;
	aspect-ratio: ${({m}) => m.isMobile ? '0.754' : '16/9'};
	z-index: 2147000000;
	transition: transform ${commonTheme.durations.long}s cubic-bezier(0.230, 1.000, 0.320, 1.000);
	transform: translate(${ props => -props.currentIndex * 122 / props.scrollCount }%, ${ props => -props.currentIndex * 100 / props.scrollCount }%);
`
const CaseWrapper = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	width: 100%;
	height: 100%;
	transform: translate(${ ({i}) => i * 122 }%, ${ ({i}) => i * 100 }%);
	cursor: ${({m}) => m.isHugeDesk || m.isDesk ? 'none' : 'pointer'};
`
const CaseArea = ({ caseData, currentIndex, scrollCount, showButtonRef, setCarouselSizes, setHovering, setHoverNum, pageTransition }) => {

	const media = useContext(MediaContext)
	const containerRef = useRef()
	const carouselRef = useRef()

	useEffect(() => {
		const calcPlaneSizes = () => {
			setCarouselSizes({
				w: carouselRef.current.getBoundingClientRect().width,
				h: carouselRef.current.getBoundingClientRect().height,
				i: carouselRef.current.getBoundingClientRect().width * 1.22
			})
		}
		calcPlaneSizes()
		window.addEventListener('resize', calcPlaneSizes)

		return () => window.removeEventListener('resize', calcPlaneSizes)
	}, [media, setCarouselSizes])

	// Hovering animation
	useEffect(() => {
		if (media.isHugeDesk || media.isDesk) {
			const el = containerRef.current
			const onMouseMove = e => {
				gsap.to(showButtonRef.current, {
					left: e.pageX + 'px',
					top: e.pageY + 'px',
					duration: commonTheme.durations.middle,
					ease: 'power4.out',
				})
			}

			el.addEventListener('mousemove', onMouseMove)

			return () => el.removeEventListener('mousemove', onMouseMove)
		}
	}, [showButtonRef, media])

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

	return <CarouselContainer ref={containerRef} m={media}>
		<Carousel ref={carouselRef}
					m={media}
					currentIndex={currentIndex}
					scrollCount={scrollCount}>
			{caseData.map((p, i) => p.isMainSlider &&
				<CaseWrapper key={p.slug.current}
								m={media}
								i={i}
								onMouseOver={e => mouseOverHandler(i)}
								onMouseOut={mouseOutHandler}
								onClick={e => pageTransition(e, `cases/${p.slug.current}`)} />
			)}
		</Carousel>
	</CarouselContainer>
}

export default CaseArea;