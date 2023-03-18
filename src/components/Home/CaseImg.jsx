import React, { useContext } from 'react';
import styled from 'styled-components';
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
	z-index: 2;
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
const Case = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	display: grid;
	align-items: end;
	justify-items: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
	transform: translate( ${({i}) => i * 122}%, ${({i}) => i * 100}% );
`
const Content = styled.div`
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
	color: ${commonTheme.colors.white};
	background-image: url(${({imgUrl}) => imgUrl});
	background-position-x: ${props => props.hovering && props.i === props.hoverNum
												? 50
												: -10 * (props.i * props.scrollCount - props.currentIndex) + 50}%;
	background-position-y: ${props => props.hovering && props.i === props.hoverNum
												? 50
												: -10 * (props.i * props.scrollCount - props.currentIndex) + 50}%;
	background-size: ${({i, hovering, hoverNum}) => hovering && i === hoverNum ? 110 : 120}% auto;
	transition: background-position ${commonTheme.durations.long}s ${commonTheme.easings.outPower4},
					background-size ${commonTheme.durations.long}s ${commonTheme.easings.outPower4};
`
const Tags = styled.div`
	grid-row: ${({m}) => m.isMobile ? '2/3' : '1/3'};
	grid-column: ${({m}) => m.isMobile ? '1/4' : '1/2'};
	display: flex;
	flex-direction: column;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
`
const Year = styled.span`
	grid-row: ${({m}) => m.isMobile ? '2/3' : '1/3'};
	grid-column: ${({m}) => m.isMobile ? '4/7' : '2/3'};
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	text-align: ${({m}) => m.isMobile ? 'end' : 'start'};
`
const Title = styled.h2`
	grid-row: ${({m}) => m.isMobile ? '1/2' : '1/3'};
	grid-column: ${({m}) => m.isMobile ? '1/7' : '3/7'};
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	font-size: ${ ({m}) => m.isMobile ? 40
								: m.isTabletP ? 48
								: 76}px;
	text-align: ${({m}) => m.isMobile ? 'start' : 'end'};
	text-transform: uppercase;
`
const CaseImg = ({ caseData, currentIndex, scrollCount, hovering, hoverNum }) => {

	const media = useContext(MediaContext)

	let count = -1
	return <CarouselContainer m={media}>
		<Carousel m={media} currentIndex={currentIndex} scrollCount={scrollCount}>
			{caseData.map(p => {
				if (p.isMainSlider) {
					count++
					return <Case key={p.slug.current} i={count}>
						<Content m={media}
									currentIndex={currentIndex}
									scrollCount={scrollCount}
									i={count}
									hovering={hovering}
									hoverNum={hoverNum}
									imgUrl={!media.isMobile ? p.mainImage.asset.url : p.mobileImage.asset.url}>
							<Tags m={media}>
								{p.tags.map((t, i) => <span key={i}>{t}</span>)}
							</Tags>
							<Year m={media}>{p.publishedAt.split('-')[0]}</Year>
							<Title m={media}>{p.title}</Title>
						</Content>
					</Case>
				}
				return null
			})}
		</Carousel>
	</CarouselContainer>
}

export default CaseImg;