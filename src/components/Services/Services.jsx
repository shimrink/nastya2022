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
	margin: ${({m}) => m.isHugeDesk || m.isDesk ? '288px 0 176px 0' : '196px 0 120px 0'};
	color: ${ ({theme}) => theme.mode.text };
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 48 : 30}px;
	text-align: center;
	text-transform: uppercase;
	transition: color ${commonTheme.durations.short}s;
`
const Section = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-bottom: ${({m}) => m.isMobile ? 96 : 48}px;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
`
const ServiceStack = styled.div`
	display: grid;
	grid-template-columns: ${({m}) => m.isMobile ? '1fr' : 'repeat(12, 1fr)'};
	grid-column-gap: ${ ({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: m.isTabletP ? '40px'
										: '24px'};
	width: ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%'};
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	h3 {
		grid-column: ${({m}) => m.isTabletP ? '1/4' : '1/7'};
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		text-transform: uppercase;
	}
`
const Service = styled.div`
	grid-column: ${({m}) => m.isTabletP ? '4/13'
								: m.isMobile ? '1/2'
								: '7/13'};
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
	grid-row: ${({m}) => m.isMobile ? '1/3' : '1/2'};
	grid-column: ${({m}) => m.isMobile ? '1/4' : '1/5'};
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
	grid-column: ${({m}) => m.isMobile ? '4/7' : '5/7'};
	text-transform: uppercase;
`
const Price = styled.span`
	grid-row: 2/3;
	grid-column: ${({m}) => m.isMobile ? '4/7' : '5/7'};
	text-transform: uppercase;
`
const LineWrap = styled.div`
	width: 100%;
	padding: 0 40px;
	margin-top: 48px;
`
const ExactCost = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: ${ ({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: m.isTabletP ? '40px'
										: '24px'};
	align-self: center;
	width: ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%'};
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	margin-top: 64px;
	p {
		grid-column: ${({m}) => m.isMobile ? '1/13'
									: m.isTabletP ? '4/13'
									: '7/13'};
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
			{!media.isMobile && <SectionTitle mbHugeDesk='48px' mbDesk='48px' mbTabletA='48px' mbTabletP='48px'>Услуги и компетенции</SectionTitle>}
			{servicesData.map((servicesBlock, index) => (
				<Section key={index} m={media}>
					<ServiceStack m={media}>
						{!media.isMobile && <h3>{servicesBlock.title}</h3>}
						{media.isMobile && <SectionTitle pZero>{servicesBlock.title}</SectionTitle>}
						{servicesBlock.services.map((s, i) => (
							<Service key={i} m={media}>
								<Name m={media}>{s.title}</Name>
								{!media.isMobile && <Description>{s.description}</Description>}
								<Time m={media}>{s.time}</Time>
								<Price m={media}>{s.price}</Price>
							</Service>
						))}
					</ServiceStack>
					{!media.isMobile && <LineWrap><Line /></LineWrap>}
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