import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { mapRange } from 'gsap/gsap-core'
import { commonTheme } from '../../styles/theme'
import { MediaContext } from '../../AppWrap'

const ProgressLineWrapper = styled.div`
	grid-row: 1/2;
	grid-column: 1/4;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 180px;
	height: 4px;
	margin-bottom: ${({ m }) => (m.isHugeDesk || m.isDesk ? 40 : 24)}px;
	z-index: 3;
`
const ProgressLineContainer = styled.div`
	position: absolute;
	border-radius: 9em;
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.ac.light};
`
const ProgressLine = styled.div`
	position: absolute;
	border-radius: 9em;
	width: ${({ scrollValue }) => scrollValue}%;
	height: 100%;
	background-color: ${({ theme }) => theme.ac.dark};
	transition: width ${commonTheme.durations.middle}s;
`
const ScrollProgress = ({ casesCount, currentIndex, scrollCount }) => {
	const media = useContext(MediaContext)

	const [scrollValue, setScrollValue] = useState(null)

	useEffect(() => {
		setScrollValue(
			mapRange(0, casesCount * scrollCount, 0, 100, currentIndex + scrollCount),
		)
	}, [currentIndex, casesCount, scrollCount])

	return (
		<ProgressLineWrapper m={media}>
			<ProgressLineContainer />
			<ProgressLine scrollValue={scrollValue} />
		</ProgressLineWrapper>
	)
}

export default ScrollProgress
