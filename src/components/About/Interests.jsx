import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import { state } from '../../store';
import Line from '../common/Line';
import SectionTitle from '../common/SectionTitle';
import Interest from './Interest';

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: ${({m}) => m.isHugeDesk || m.isDesk ? 'clamp(472px, 35.105vw, 640px)'
								: m.isTabletA || m.isTabletP ? 'clamp(444px, 52.205vw, 466px)'
								: 'clamp(208px, 57.64vw, 276px)'};
	margin-bottom: ${({m}) => m.isHugeDesk ? '80px'
									: m.isDesk ? '164px'
									: m.isTabletA ? '88px'
									: m.isTabletP ? '208px'
									: 'clamp(4px, 10vw, 96px)'};
`
const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
`
const Gifs = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk ? '2/3' : '1/4'};
	display: grid;
	grid-template-columns: ${({m}) => m.isMobile || m.isTabletP ? '1fr 1fr' : 'repeat(12, 1fr)'};
	grid-column-gap: ${ ({m}) => m.isMobile ? 'clamp(12px, 3.75vw, 20px)'
										: m.isTabletP ? '40px'
										: '24px'};
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	img {
		grid-row: 1/2;
		grid-column: ${({m}) => m.isMobile || m.isTabletP ? '1/2' : '2/6'};
		width: 100%;
		opacity: 0;
		transition: opacity ${commonTheme.durations.short}s;
	}
	img.active {
		opacity: 1;
	}
`
const Container = styled.div`
	grid-row: 1/2;
	grid-column: 1/4;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: ${ ({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: m.isTabletP ? '40px'
										: '24px'};
`
const InnerContainer = styled.div`
	grid-row: 1/2;
	grid-column: 2/3;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-right: ${({m}) => m.isHugeDesk ? '0'
									: m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
									: '40px'};
	margin-left: ${({m}) => m.isTabletP ? -20 : m.isMobile ? 0 : -24}px;
`
const Toggles = styled.div`
	display: ${({m}) => m.isMobile ? 'flex' : 'grid'};
	grid-row-gap: ${({m}) => m.isHugeDesk || m.isDesk ? 48 : 20}px;
	flex-direction: column;
	justify-content: ${({m}) => m.isMobile ? 'space-between' : 'normal'};
	height: ${({m}) => m.isMobile ? '100%' : 'auto'};
	padding-left: ${({m}) => m.isTabletP ? 20 : m.isMobile ? 0 : 24}px;
`
const Text = styled.div`
	grid-row: 2/3;
	grid-column: 1/4;
	display: grid;
	align-items: end;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 24px;
	padding: ${({m}) => m.isTabletP ? '0 0 0 20px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 0 0 24px'};
	margin-top: ${({m}) => m.isMobile ? 48 : 0}px;
	p {
		grid-row: 1/2;
		grid-column: ${({m}) => m.isHugeDesk ? '1/5'
									: m.isDesk || m.isTabletA ? '1/6'
									: '1/7'};
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		white-space: pre-line;
		opacity: 0;
		transition: opacity ${commonTheme.durations.short}s;
	}
	p.active {
		opacity: 1;
	}
`
const Circle = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 146px;
	height: 146px;
	font-family: 'AccentFontB',sans-serif;
	color: ${commonTheme.colors.white};
	background-color: ${ ({theme}) => theme.ac.dark };
	border-radius: 50%;
	cursor: none;
	z-index: 2;
	transform: translate(-50%, -50%) scale(0);
`
const Interests = ({ mainRef }) => {

	const media = useContext(MediaContext)
	const wrapperRef = useRef()
	const cirlceRef = useRef()

	return <Wrap ref={wrapperRef} m={media}>
		<SectionTitle interests>Мои интересы</SectionTitle>
		<Content m={media}>
			<Gifs m={media}>
				{state.gifs.map((g, i) => <img className={i === 0 ? 'gif active' : 'gif'} key={i} src={g.url} alt={g.alt} />)}
			</Gifs>
			<Container m={media}>
				<InnerContainer m={media}>
					<Toggles m={media}>
						{state.gifs.map((g, i) => <Interest key={i} i={i} mainRef={mainRef} wrapperRef={wrapperRef} cirlceRef={cirlceRef}>{g.title}</Interest>)}
					</Toggles>
					{!media.isMobile && <Line />}
					{!media.isMobile && <Text m={media}>
						{state.gifs.map((g, i) => <p className={i === 0 ? 'text active' : 'text'} key={i}>{g.text}</p>)}
					</Text>}
				</InnerContainer>
			</Container>
			{media.isMobile && <Text m={media}>
				{state.gifs.map((g, i) => <p className={i === 0 ? 'text active' : 'text'} key={i}>{g.text}</p>)}
			</Text>}
		</Content>
		{(media.isHugeDesk || media.isDesk) && <Circle ref={cirlceRef}>Тык</Circle>}
	</Wrap>
}

export default Interests;