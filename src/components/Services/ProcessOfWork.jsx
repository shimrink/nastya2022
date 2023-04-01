import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'
import { state } from '../../store'

const Wrap = styled.div`
	grid-row: 2/3;
	grid-column: ${({ m }) => (m.isHugeDesk ? '2/3' : '1/4')};
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: ${({ m }) => (m.isTabletP ? 40 : 24)}px;
	padding: ${({ m }) => (m.isHugeDesk ? '0' : m.isDesk ? '0 80px' : '0 40px')};
`
const Gif = styled.img`
	grid-row: 1/3;
	grid-column: ${({ m }) => (m.isTabletP ? '1/7' : '2/6')};
	width: 100%;
	opacity: ${({ active }) => (active ? 1 : 0)};
	transition: opacity ${commonTheme.durations.short}s;
`
const Toggles = styled.div`
	grid-row: 1/2;
	grid-column: ${({ m }) => (m.isMobile ? '1/13' : '7/13')};
	display: flex;
	flex-direction: column;
`
const Process = styled.h3`
	padding: 12px 0;
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
	font-family: 'AccentFontR';
	text-transform: uppercase;
	color: ${({ theme, m, active }) =>
		active || m.isMobile ? theme.mode.text : theme.mode.subText};
	transition: color ${commonTheme.durations.short}s;
	&:first-child {
		padding-top: 0;
	}
`
const Text = styled.p`
	grid-row: 2/3;
	grid-column: ${({ m }) =>
		m.isHugeDesk ? '7/11' : m.isDesk || m.isTabletA ? '7/12' : '7/13'};
	align-self: end;
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
	white-space: pre-line;
	line-height: 110%;
	opacity: ${({ active }) => (active ? 1 : 0)};
	transition: opacity ${commonTheme.durations.short}s;
`
const ProcessOfWork = () => {
	const media = useContext(MediaContext)
	const [processActive, setProcessActive] = useState([
		{ name: 'work', active: true },
		{ name: 'work', active: false },
		{ name: 'work', active: false },
		{ name: 'work', active: false },
		{ name: 'work', active: false },
		{ name: 'work', active: false },
	])

	const switchGif = (i) => {
		if (!media.isMobile) {
			setProcessActive([
				{ name: 'work', active: i === 0 },
				{ name: 'work', active: i === 1 },
				{ name: 'work', active: i === 2 },
				{ name: 'work', active: i === 3 },
				{ name: 'work', active: i === 4 },
				{ name: 'work', active: i === 5 },
			])
		}
	}

	return (
		<Wrap m={media}>
			{!media.isMobile &&
				state.processOfWork.map((g, i) => (
					<Gif
						key={i}
						m={media}
						active={processActive[i].active}
						src={g.url}
						alt={g.alt}
					/>
				))}
			<Toggles m={media}>
				{state.processOfWork.map((g, i) => (
					<Process
						key={i}
						m={media}
						active={processActive[i].active}
						onMouseOver={() => switchGif(i)}
					>
						{g.title}
					</Process>
				))}
			</Toggles>
			{!media.isMobile &&
				state.processOfWork.map((g, i) => (
					<Text key={i} m={media} active={processActive[i].active}>
						{g.text}
					</Text>
				))}
		</Wrap>
	)
}

export default ProcessOfWork
