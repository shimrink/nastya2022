import React, { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../App';

const CarouselContainer = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'hugeDesk' ? '2/3' : '1/4' };
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	width: 100%;
	height: 100%;
	padding: ${({media}) => media === 'hugeDesk' ? '0'
								: media === 'desk' ? '0 80px'
								: media === 'mobile' ? '0 24px'
								: '0 40px'
	};
`
const Carousel = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'mobile' || media === 'tabletP' ? '1/13' : '2/12' };
	position: absolute;
	display: grid;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	z-index: 2147000000;
	transition: transform ${commonTheme.durations.long}ms cubic-bezier(0.230, 1.000, 0.320, 1.000);
	transform: translate(${ props => -props.currentIndex * (props.planeW + props.planeI) / props.scrollCount }px, ${ props => -props.currentIndex * props.planeH / props.scrollCount }px);
`
const CaseWrapper = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	width: ${ ({planeW}) => planeW }px;
	height: ${ ({planeH}) => planeH }px;
	transform: translate(${ props => props.ind * (props.planeW + props.planeI) }px, ${ props => props.ind * props.planeH }px);
	cursor: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 'none' : 'pointer' };
`
const CaseArea = ({ caseData, currentIndex, scrollCount, showButtonRef, planeW, planeH, planeI, setCarouselSizes, setHovering }) => {

	const media = useContext(MediaContext)

	const navigate = useNavigate()

	// Set plane sizes on load and on resize
	const carouselRef = useCallback(node => {
		if (node) {
			let nodeW = node.getBoundingClientRect().width
			let nodeH = media === 'mobile' ? nodeW * 1.325 : nodeW * 9 / 16
			setCarouselSizes({
				width: nodeW,
				height: nodeH,
				indent: nodeW * 0.22
			})
		}
	}, [media])

	// Hovering animation
	useEffect(() => {
		if (showButtonRef && caseData && (media === 'hugeDesk' || media === 'desk')) {
			const onMouseMove = e => {
				gsap.to(showButtonRef.current, {
					left: e.pageX + 'px',
					top: e.pageY + 'px',
					duration: commonTheme.durations.middle / 1000,
					ease: 'power4.out',
				})
			}

			window.addEventListener('mousemove', onMouseMove)

			return () => window.removeEventListener('mousemove', onMouseMove)
		}
	})

	const mouseOverHandler = () => {
		if (showButtonRef && caseData && (media === 'hugeDesk' || media === 'desk')) {
			gsap.to(showButtonRef.current, {
				scale: 1,
				duration: commonTheme.durations.short / 1000,
				ease: 'power4.out',
			})
			setHovering(false)
		}
	}

	const mouseOutHandler = () => {
		if (showButtonRef && caseData && (media === 'hugeDesk' || media === 'desk')) {
			gsap.to(showButtonRef.current, {
				scale: 0,
				duration: commonTheme.durations.short / 1000,
				ease: 'power4.out',
			})
			setHovering(false)
		}
	}

	return <CarouselContainer media={media}>
		<Carousel id='carouselId'
			ref={carouselRef}
			currentIndex={currentIndex}
			media={media}
			scrollCount={scrollCount}
			planeW={planeW}
			planeH={planeH}
			planeI={planeI}>
			{caseData.map((post, index) => post.isMainSlider &&
				<CaseWrapper key={post.slug.current}
					ind={index}
					media={media}
					planeW={planeW}
					planeH={planeH}
					planeI={planeI}
					onMouseOver={mouseOverHandler}
					onMouseOut={mouseOutHandler}
					onClick={() => navigate(`case/${post.slug.current}`)} />
			)}
		</Carousel>
	</CarouselContainer>
}

export default CaseArea;