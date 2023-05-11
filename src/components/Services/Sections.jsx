import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import SectionTitle from '../common/SectionTitle'
import Line from '../common/Line'

const Section = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 0 40px;
	margin-bottom: 48px;
	font-size: 18px;
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
		margin-bottom: 96px;
	}
`
const ServiceStack = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	width: ${({ theme }) => theme.common.gridWidth}px;
	margin-bottom: 48px;
	h3 {
		grid-column: 1/7;
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		text-transform: uppercase;
	}
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding: 0;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
		h3 {
			grid-column: 1/4;
		}
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-template-columns: 1fr;
		grid-column-gap: clamp(24px, 7.5vw, 40px);
		h3 {
			grid-column: 1/7;
		}
	}
`
const Service = styled.div`
	grid-column: 7/13;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-row-gap: 4px;
	grid-column-gap: 24px;
	margin-bottom: 24px;
	&:last-child {
		margin: 0;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 4/13;
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/2;
		grid-column-gap: clamp(24px, 7.5vw, 40px);
	}
`
const Name = styled.h4`
	grid-row: 1/2;
	grid-column: 1/5;
	margin-bottom: 4px;
	font-family: 'BaseFont', sans-serif;
	font-weight: normal;
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 1/3;
		grid-column: 1/4;
		font-family: 'AccentFontR', sans-serif;
	}
`
const Description = styled.p`
	grid-row: 2/3;
	grid-column: 1/5;
	color: ${({ theme }) => theme.mode.subText};
	line-height: 110%;
`
const Price = styled.span`
	grid-row: 1/2;
	grid-column: 5/7;
	text-transform: uppercase;
	line-height: 110%;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 4/7;
	}
`
const Time = styled.span`
	grid-row: 2/3;
	grid-column: 5/7;
	color: ${({ theme }) => theme.mode.subText};
	text-transform: lowercase;
	line-height: 110%;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 4/7;
	}
`
const Sections = ({ servicesBlock }) => {
	const media = useContext(MediaContext)

	return (
		<Section>
			<ServiceStack>
				{!media.isMobile && <h3>{servicesBlock.title}</h3>}
				{media.isMobile && (
					<SectionTitle pZero gc='1/2'>
						{servicesBlock.title}
					</SectionTitle>
				)}
				{servicesBlock.services.map((s) => (
					<Service key={s.title}>
						<Name>{s.title}</Name>
						{!media.isMobile && <Description>{s.description}</Description>}
						<Price>{s.price}</Price>
						<Time>{s.time}</Time>
					</Service>
				))}
			</ServiceStack>
			{!media.isMobile && <Line />}
		</Section>
	)
}

export default Sections
