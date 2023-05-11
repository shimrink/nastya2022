import React, { useContext } from 'react'
import styled from 'styled-components'
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
	z-index: 2;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/4;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
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
	will-change: transform;
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
const Case = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	display: grid;
	align-items: end;
	justify-items: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
	transform: translate(
		${({ i }) => i * 122 + '%'},
		${({ i }) => i * 100 + '%'}
	);
`
const Cover = styled.img`
	position: relative;
	grid-row: 1/2;
	grid-column: 1/2;
	width: 100%;
	aspect-ratio: 16/9;
	object-fit: cover;
	z-index: 1;
	will-change: transform;
	transform: translateX(
			${(props) =>
				props.hovering && props.i === props.hoverNum
					? '0%'
					: -5 *
							props.mob *
							(props.count * props.scrollCount - props.currentIndex) +
					  '%'}
		)
		translateY(
			${(props) =>
				props.hovering && props.i === props.hoverNum
					? '0%'
					: -5 *
							props.mob *
							(props.count * props.scrollCount - props.currentIndex) +
					  '%'}
		)
		scale(
			${({ i, hovering, hoverNum }) =>
				hovering && i === hoverNum ? '110%' : '120%'}
		);
	transition: transform ${({ theme }) => theme.common.durations.long}s
		${({ theme }) => theme.common.easings.outPower4};
	@media ${({ theme }) => theme.common.media.mobile} {
		aspect-ratio: 2/3;
	}
`
const Content = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 1/2;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-gap: 24px;
	align-content: end;
	align-items: end;
	width: 100%;
	height: 100%;
	padding: 24px;
	color: ${({ theme }) => theme.common.colors.white};
	background-image: linear-gradient(
		rgba(0, 0, 0, 0),
		${({ theme }) => theme.common.colors.balck}
	);
	background-position: bottom;
	background-repeat: no-repeat;
	background-size: 100% 30%;
	z-index: 2;
`
const Tags = styled.div`
	grid-row: 1/3;
	grid-column: 1/2;
	display: flex;
	flex-direction: column;
	font-size: 18px;
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		grid-column: 1/4;
	}
`
const Year = styled.span`
	grid-row: 1/3;
	grid-column: 2/3;
	font-size: 18px;
	text-align: start;
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		grid-column: 4/7;
		text-align: end;
	}
`
const Title = styled.h2`
	grid-row: 1/3;
	grid-column: 3/7;
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	font-size: clamp(40px, 2.815vw, 48px);
	text-align: end;
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: clamp(24px, 3.065vw, 30px);
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 1/2;
		grid-column: 1/7;
		font-size: clamp(22px, 6.18vw, 30px);
		text-align: start;
	}
`
const CaseImg = ({
	caseData,
	currentIndex,
	scrollCount,
	hovering,
	hoverNum,
}) => {
	const media = useContext(MediaContext)

	let count = -1
	return (
		<CarouselContainer>
			<Carousel currentIndex={currentIndex} scrollCount={scrollCount}>
				{caseData.map((p, i) => {
					if (p.isMainSlider) {
						count++
						return (
							<Case key={p.slug.current} i={count}>
								<Cover
									currentIndex={currentIndex}
									scrollCount={scrollCount}
									i={i}
									count={count}
									hovering={hovering}
									hoverNum={hoverNum}
									mob={media.isHugeDesk || media.isDesk ? 1 : 5}
									src={
										!media.isMobile
											? p.mainImage.asset.url
											: p.mobileImage.asset.url
									}
									alt='case cover'
								/>
								<Content>
									<Tags>
										{p.categories.map((t) => (
											<span key={t.title}>{t.title}</span>
										))}
									</Tags>
									<Year>{p.publishedAt.split('-')[0]}</Year>
									<Title>{p.title}</Title>
								</Content>
							</Case>
						)
					}
					return null
				})}
			</Carousel>
		</CarouselContainer>
	)
}

export default CaseImg
