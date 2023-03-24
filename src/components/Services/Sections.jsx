import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import SectionTitle from '../common/SectionTitle';
import Line from '../common/Line';

const Section = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
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
	padding: ${({m}) => m.isDesk ? '0 40px' : '0'};
	margin-bottom: 48px;
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
	grid-row-gap: 4px;
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
	font-family: ${({m}) => !m.isMobile ? 'BaseFont' : 'AccentFontR'}, sans-serif;
	font-weight: normal;
	text-transform: uppercase;
`
const Description = styled.p`
	grid-row: 2/3;
	grid-column: 1/5;
	color: ${ ({theme}) => theme.mode.subText };
	line-height: 110%;
`
const Price = styled.span`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile ? '4/7' : '5/7'};
	text-transform: uppercase;
	line-height: 110%;
`
const Time = styled.span`
	grid-row: 2/3;
	grid-column: ${({m}) => m.isMobile ? '4/7' : '5/7'};
	color: ${({theme}) => theme.mode.subText};
	text-transform: lowercase;
	line-height: 110%;
`
const Sections = ({ servicesBlock }) => {

	const media = useContext(MediaContext)

	return <Section m={media}>
		<ServiceStack m={media}>
			{!media.isMobile && <h3>{servicesBlock.title}</h3>}
			{media.isMobile && <SectionTitle pZero gc='1/2'>{servicesBlock.title}</SectionTitle>}
			{servicesBlock.services.map((s, i) => (
				<Service key={i} m={media}>
					<Name m={media}>{s.title}</Name>
					{!media.isMobile && <Description>{s.description}</Description>}
					<Price m={media}>{s.price}</Price>
					<Time m={media}>{s.time}</Time>
				</Service>
			))}
		</ServiceStack>
		{!media.isMobile && <Line />}
	</Section>
}

export default Sections;