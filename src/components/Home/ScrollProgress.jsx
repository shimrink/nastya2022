import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { mapRange } from "gsap/gsap-core"
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';

const ProgressLineWrapper = styled.div`
	grid-row: 1/2;
	grid-column: 1/4;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 180px;
	height: 4px;
	margin-bottom: ${({m}) => m.isHugeDesk || m.isDesk ? 40 : 24}px;
	z-index: 3;
`
const ProgressLineContainer = styled.div`
	position: absolute;
	border-radius: 9em;
	width: 100%;
	height: 100%;
	background-color: ${ ({accentColor}) => accentColor.light };
`
const ProgressLine = styled.div`
	position: absolute;
	border-radius: 9em;
	width: ${({scrollValue}) => scrollValue}%;
	height: 100%;
	background-color: ${ ({accentColor}) => accentColor.dark };
	transition: width ${commonTheme.durations.middle}s;
`
const ScrollProgress = ({ caseData, currentIndex, scrollCount }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	const [scrollValue, setScrollValue] = useState(null)

	useEffect(() => {
		if (caseData) {
			setScrollValue(mapRange(0, caseData.length * scrollCount, 0, 100, currentIndex + scrollCount))
		}
	}, [currentIndex, caseData, scrollCount])

	return <ProgressLineWrapper m={media}>
		<ProgressLineContainer accentColor={accentColor} />
		<ProgressLine accentColor={accentColor} scrollValue={scrollValue} />
	</ProgressLineWrapper>
}

export default ScrollProgress;