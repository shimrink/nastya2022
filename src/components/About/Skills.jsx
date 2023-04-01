import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'
import { state } from '../../store'
import SectionTitle from '../common/SectionTitle'

const moveX = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-25%);
	}
`
const moveXReverse = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(25%);
	}
`
const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: ${({ m }) =>
		m.isHugeDesk || m.isDesk
			? 'clamp(452px, 32.655vw, 576px)'
			: m.isTabletA || m.isTabletP
			? 'clamp(288px, 35.85vw, 342px)'
			: 'clamp(188px, 51.11vw, 240px)'};
	padding-bottom: ${({ m }) =>
		m.isMobile ? 123 : m.isTabletP ? 183 : m.isTabletA ? 207 : 300}px;
`
const MovingRow = styled.div`
	position: absolute;
	right: ${({ reverse }) => (reverse ? '0' : 'auto')};
	display: flex;
	margin-top: ${({ m, row }) =>
		m.isMobile
			? row * 48
			: m.isTabletP
			? row * 69.5
			: m.isTabletA
			? row * 81.5
			: row * 115.5}px;
	animation: ${({ reverse }) => (reverse ? moveXReverse : moveX)} 22s linear
		infinite;
`
const String = styled.div`
	padding-left: ${({ m }) =>
		m.isHugeDesk || m.isDesk ? 40 : m.isMobile ? 16 : 24}px;
	span {
		margin-right: ${({ m }) =>
			m.isHugeDesk || m.isDesk ? 40 : m.isMobile ? 16 : 24}px;
	}
	span:last-child {
		margin-right: 0;
	}
`
const Skill = styled.span`
	font-family: ${({ bold }) => (bold ? 'AccentFontM' : 'AccentFontT')},
		sans-serif;
	font-size: ${({ m }) =>
		m.isHugeDesk || m.isDesk ? 76 : m.isMobile ? 30 : 48}px;
	color: ${({ theme, bold }) => (bold ? theme.ac.dark : theme.mode.text)};
	text-transform: uppercase;
	white-space: nowrap;
	transition: color ${commonTheme.durations.short}s;
`
const Skills = () => {
	const media = useContext(MediaContext)

	return (
		<Wrap m={media}>
			<SectionTitle
				mbHugeDesk='48px'
				mbDesk='48px'
				mbTabletA='48px'
				mbTabletP='48px'
			>
				Навыки
			</SectionTitle>
			<div>
				<MovingRow row={0} m={media}>
					{[...Array(4)].map((v, ind) => (
						<String key={ind} m={media}>
							{state.skillsWords.top.map((w, i) => (
								<Skill bold={i === 2 ? true : false} key={i} m={media}>
									{w}
								</Skill>
							))}
						</String>
					))}
				</MovingRow>
				<MovingRow row={1} reverse m={media}>
					{[...Array(4)].map((v, ind) => (
						<String key={ind} m={media}>
							{state.skillsWords.middle.map((w, i) => (
								<Skill
									bold={i === 0 || i === 3 ? true : false}
									key={i}
									m={media}
								>
									{w}
								</Skill>
							))}
						</String>
					))}
				</MovingRow>
				<MovingRow row={2} m={media}>
					{[...Array(4)].map((v, ind) => (
						<String key={ind} m={media}>
							{state.skillsWords.bottom.map((w, i) => (
								<Skill bold={i === 2 ? true : false} key={i} m={media}>
									{w}
								</Skill>
							))}
						</String>
					))}
				</MovingRow>
			</div>
		</Wrap>
	)
}

export default Skills
