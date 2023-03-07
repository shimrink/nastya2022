import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import SmoothScroll from '../common/SmoothScroll';
import SectionTitle from '../common/SectionTitle';
import Footer from '../Footer/Footer';
import Line from '../common/Line';

const Main = styled.main`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 3;
`
const Title = styled.h2`
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin-top: ${({m}) => m.isHugeDesk || m.isDesk ? 288 : 196}px;
	margin-bottom: 176px;
	color: ${ ({theme}) => theme.mode.text };
	font-size: ${({m}) => m.isMobile ? 30 : 48}px;
	text-align: center;
	text-transform: uppercase;
	transition: color ${commonTheme.durations.short}s;
`
const Section = styled.div`
	margin-bottom: 48px;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
`
const ServiceStack = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: ${ ({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: m.isTabletP ? '40px'
										: '24px'};
	width: ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%'};
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	h3 {
		grid-column: 1/7;
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		text-transform: uppercase;
	}
`
const Service = styled.div`
	grid-column: 7/13;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: ${ ({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: m.isTabletP ? '40px'
										: '24px'};
	margin-bottom: 24px;
	&:last-child {
		margin: 0;
	}
`
const Name = styled.h4`
	grid-row: 1/2;
	grid-column: 1/5;
	margin-bottom: 4px;
	font-family: 'BaseFont', sans-serif;
	font-weight: normal;
	text-transform: uppercase;
`
const Description = styled.p`
	grid-row: 2/3;
	grid-column: 1/5;
	color: ${ ({theme}) => theme.mode.subText };
`
const Time = styled.span`
	grid-row: 1/2;
	grid-column: 5/7;
	text-transform: uppercase;
`
const Price = styled.span`
	grid-row: 2/3;
	grid-column: 5/7;
	text-transform: uppercase;
`
const LineWrap = styled.div`
	padding: 0 40px;
	margin-top: 48px;
`
const ExactCost = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: ${ ({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: m.isTabletP ? '40px'
										: '24px'};
	width: ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%'};
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	margin-top: 64px;
	p {
		grid-column: 7/13;
	}
`
const Services = ({ setPageInitialized, servicesData }) => {

	useEffect(() => {
		setPageInitialized(true)
	}, [setPageInitialized])

	const media = useContext(MediaContext)
	const mainRef = useRef()

	return <Main ref={mainRef}>
		<SmoothScroll mainRef={mainRef}>
			<Title m={media}>экспертиза, дизайн, разработка —<br/>весь комплекс услуг для упаковки бизнеса</Title>
			<SectionTitle mbHugeDesk='48px' mbDesk='48px' mbTabletA='48px' mbTabletP='48px'>Услуги и компетенции</SectionTitle>
			{servicesData.map((servicesBlock, index) => (
				<Section key={index} m={media}>
					<ServiceStack m={media}>
						<h3>{servicesBlock.title}</h3>
						{servicesBlock.services.map((s, i) => (
							<Service key={i} m={media}>
								<Name>{s.title}</Name>
								<Description>{s.description}</Description>
								<Time>{s.time}</Time>
								<Price>{s.price}</Price>
							</Service>
						))}
					</ServiceStack>
					<LineWrap><Line /></LineWrap>
				</Section>
			))}
			<ExactCost m={media}>
				<p>Точную стоимость определим после обсуждения всех нюансов и необходимого объема работ.</p>
			</ExactCost>
			<Footer />
		</SmoothScroll>
	</Main>
}

export default Services;