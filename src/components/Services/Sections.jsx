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
const Price = styled.span`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile ? '4/7' : '5/7'};
	text-transform: uppercase;
`
const Time = styled.span`
	grid-row: 2/3;
	grid-column: ${({m}) => m.isMobile ? '4/7' : '5/7'};
	color: ${({theme}) => theme.mode.subText};
	text-transform: lowercase;
`
const LineWrap = styled.div`
	width: 100%;
	padding: 0 40px;
	margin-top: 48px;
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
		{!media.isMobile && <LineWrap><Line /></LineWrap>}
	</Section>
}

export default Sections;