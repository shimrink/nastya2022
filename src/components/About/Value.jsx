import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	margin-bottom: 96px;
	transition: color ${({ theme }) => theme.common.durations.short}s;
	&:last-child {
		margin-bottom: 0;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin-bottom: 76px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
		margin-bottom: 48px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column-gap: clamp(24px, 7.5vw, 40px);
	}
`
const Name = styled.h2`
	grid-row: 1/2;
	grid-column: 1/7;
	font-size: clamp(40px, 2.815vw, 48px);
	color: inherit;
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/8;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		grid-column: 1/7;
		font-size: clamp(24px, 3.065vw, 30px);
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/13;
		margin-bottom: 20px;
		font-size: clamp(22px, 6.18vw, 30px);
	}
`
const Desc = styled.span`
	grid-row: 1/2;
	grid-column: 7/11;
	font-size: 18px;
	color: inherit;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 8/13;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		grid-column: 7/13;
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		grid-column: 1/13;
	}
`
const Value = ({ v }) => {
	return (
		<Row>
			<Name>{v.title}</Name>
			<Desc>{v.text}</Desc>
		</Row>
	)
}

export default Value
