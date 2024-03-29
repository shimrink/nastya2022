import React, { useContext } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import { commonTheme } from '../../styles/theme'
import { MediaContext } from '../../AppWrap'

const CarouselContainer = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 2/3;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	width: 100%;
	height: 100%;
	z-index: 4;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/4;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const Carousel = styled.div`
	grid-row: 1/2;
	grid-column: 2/12;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr;
	align-self: center;
	align-items: center;
	justify-content: center;
	width: 100%;
	aspect-ratio: 16/9;
	transform: translate(
		${(props) => (-props.currentIndex * 122) / props.scrollCount + '%'},
		${(props) => (-props.currentIndex * 100) / props.scrollCount + '%'}
	);
	transition: transform ${({ theme }) => theme.common.durations.long}s
		${({ theme }) => theme.common.easings.outPower4};
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 1/13;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		aspect-ratio: 2/3;
	}
`
const CaseWrapper = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	width: 100%;
	height: 100%;
	transform: translate(
		${({ i }) => i * 122 + '%'},
		${({ i }) => i * 100 + '%'}
	);
	cursor: none;
	@media ${({ theme }) => theme.common.media.tablet} {
		cursor: pointer;
	}
`
const CaseWrapperLink = styled.a`
	grid-row: 1/2;
	grid-column: 1/2;
	width: 100%;
	height: 100%;
	transform: translate(
		${({ i }) => i * 122 + '%'},
		${({ i }) => i * 100 + '%'}
	);
`
const CaseArea = ({
	caseData,
	currentIndex,
	scrollCount,
	showButtonRef,
	setHovering,
	setHoverNum,
	pageTransition,
}) => {
	const media = useContext(MediaContext)

	const moveCirc = (e) => {
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
	return (
		<CarouselContainer onMouseMove={moveCirc}>
			<Carousel currentIndex={currentIndex} scrollCount={scrollCount}>
				{caseData.map((p, i) => {
					if (p.isMainSlider) {
						count++
						return p.isPortfolio ? (
							<CaseWrapper
								key={p.slug.current}
								i={count}
								onMouseOver={() => mouseOverHandler(i)}
								onMouseOut={mouseOutHandler}
								onClick={() => pageTransition(`cases/${p.slug.current}`)}
							/>
						) : (
							<CaseWrapperLink
								key={p.slug.current}
								i={count}
								onMouseOver={() => mouseOverHandler(i)}
								onMouseOut={mouseOutHandler}
								href={p.link}
								target='_blank'
								rel='noreferrer'
							>
								{''}
							</CaseWrapperLink>
						)
					}
					return null
				})}
			</Carousel>
		</CarouselContainer>
	)
}

export default CaseArea
