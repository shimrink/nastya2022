import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'

const UnderFooterContainer = styled.div`
	position: absolute;
	display: ${({ m }) => (m.isMobile || m.isTabletP ? 'grid' : 'flex')};
	grid-row-gap: 24px;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 16 : 14)}px;
	color: ${({ theme }) => theme.mode.subText};
	padding: ${({ m }) => (m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px')};
	margin-bottom: ${({ m }) => (m.isHugeDesk || m.isDesk ? 40 : 24)}px;
`
const Meta = styled.span`
	grid-row: 1/2;
	grid-column: 1/3;
`
const Year = styled.div`
	grid-row: ${({ m }) => (m.isTabletP ? '1/2' : '2/3')};
	grid-column: ${({ m }) => (m.isTabletP ? '3/5' : '2/3')};
	display: flex;
	flex-direction: column;
	text-align: end;
`
const UnderFooter = () => {
	const media = useContext(MediaContext)

	return (
		<UnderFooterContainer m={media}>
			<Meta>
				*Meta Platforms Inc. признана экстремистской
				<br />
				организацией и запрещена на территории РФ
			</Meta>
			<Year m={media}>
				<span>©2023</span>
				<span>ASYADULOVA</span>
			</Year>
		</UnderFooterContainer>
	)
}

export default UnderFooter
