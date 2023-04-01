import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'

const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: ${({ m }) =>
		m.isTabletP ? '40px' : m.isMobile ? '(24px, 7.5vw, 40px)' : '24px'};
	margin-bottom: ${({ last, m }) =>
		m.isHugeDesk || m.isDesk ? 96 : m.isTabletA ? 76 : last ? 0 : 48}px;
	transition: color ${commonTheme.durations.short}s;
	h2 {
		grid-row: 1/2;
		grid-column: ${({ m }) => (m.isMobile ? '1/13' : m.isDesk ? '1/8' : '1/7')};
		font-size: ${({ m }) =>
			m.isHugeDesk || m.isDesk
				? 'clamp(40px, 2.815vw, 48px)'
				: m.isMobile
				? 'clamp(22px, 6.18vw, 30px)'
				: 'clamp(24px, 3.065vw, 30px)'};
		color: inherit;
		text-transform: uppercase;
		margin-bottom: ${({ m }) => (m.isMobile ? 20 : 0)}px;
	}
	span {
		grid-row: ${({ m }) => (m.isMobile ? '2/3' : '1/2')};
		grid-column: ${({ m }) =>
			m.isHugeDesk ? '7/11' : m.isDesk ? '8/13' : m.isMobile ? '1/13' : '7/13'};
		font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
		color: inherit;
	}
`
const Value = ({ v }) => {
	const media = useContext(MediaContext)

	return (
		<Row m={media}>
			<h2>{v.title}</h2>
			<span>{v.text}</span>
		</Row>
	)
}

export default Value
