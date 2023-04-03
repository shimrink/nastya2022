import React, { Fragment, useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'
import { state } from '../../store'
import Line from '../common/Line'

const Process = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: ${({ m }) => (m.isTabletP ? 40 : 24)}px;
	width: ${({ m }) => (m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%')};
	padding: ${({ m }) => (m.isHugeDesk ? '0' : m.isDesk ? '0 80px' : '0 40px')};
	margin: ${({ m }) => (m.isMobile ? '12px 0' : '24px 0')};
	h3 {
		grid-column: ${({ m }) => (m.isMobile ? '1/3' : '1/2')};
		font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
		font-family: 'AccentFontR';
		text-transform: uppercase;
		transition: color ${commonTheme.durations.short}s;
	}
	p {
		grid-column: 2/3;
		font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
		transition: color ${commonTheme.durations.short}s;
	}
`
const ProcessOfWork = () => {
	const media = useContext(MediaContext)

	return state.processOfWork.map((g, i) => (
		<Fragment key={i}>
			<Process m={media}>
				<h3>{g.title}</h3>
				{!media.isMobile && <p>{g.text}</p>}
			</Process>
			{!media.isMobile && <Line mr='40px' ml='40px' />}
		</Fragment>
	))
}

export default ProcessOfWork
