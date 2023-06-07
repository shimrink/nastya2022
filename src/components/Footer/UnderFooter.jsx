import React from 'react'
import styled from 'styled-components'

const UnderFooterContainer = styled.div`
	position: absolute;
	display: flex;
	grid-row-gap: 24px;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	font-size: 16px;
	color: ${({ theme }) => theme.mode.subText};
	padding: 0 40px;
	margin-bottom: 40px;
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 14px;
		margin-bottom: 24px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		display: grid;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const Meta = styled.span`
	grid-row: 1/2;
	grid-column: 1/3;
`
const Year = styled.div`
	display: flex;
	flex-direction: column;
	text-align: end;
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-row: 1/2;
		grid-column: 3/5;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		grid-column: 2/3;
	}
`
const UnderFooter = () => {
	return (
		<UnderFooterContainer>
			<Meta>
				*Meta Platforms Inc. признана экстремистской
				<br />
				организацией и запрещена на территории РФ
			</Meta>
			<Year>
				<span>©2023</span>
				<span>ASYADULOVA</span>
			</Year>
		</UnderFooterContainer>
	)
}

export default UnderFooter
