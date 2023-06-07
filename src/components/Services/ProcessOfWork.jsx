import React, { Fragment, useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { state } from '../../store'
import Line from '../common/Line'

const Process = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 24px;
	width: ${({ theme }) => theme.common.gridWidth}px;
	margin: 24px 0;
	h3 {
		grid-column: 1/2;
		font-size: 18px;
		font-family: 'AccentFontR';
		text-transform: uppercase;
		transition: color ${({ theme }) => theme.common.durations.short}s;
	}
	p {
		grid-column: 2/3;
		font-size: 18px;
		transition: color ${({ theme }) => theme.common.durations.short}s;
	}
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
		h3 {
			font-size: 16px;
		}
		p {
			font-size: 16px;
		}
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column-gap: 24px;
		margin: 12px 0;
		h3 {
			grid-column: 1/3;
		}
	}
`
const ProcessOfWork = () => {
	const media = useContext(MediaContext)

	return state.processOfWork.map((g) => (
		<Fragment key={g.title}>
			<Process>
				<h3>{g.title}</h3>
				{!media.isMobile && <p>{g.text}</p>}
			</Process>
			{!media.isMobile && <Line mr='40px' ml='40px' />}
		</Fragment>
	))
}

export default ProcessOfWork
