import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import SectionTitle from '../common/SectionTitle';

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
	margin-top: 576px;
	padding-bottom: ${({m, row}) => m.isMobile ? 120
											: m.isTabletP ? row * 196.5
											: m.isTabletA ? row * 220.5
											: row * 322.5}px;
`
const MovingRow = styled.div`
	position: absolute;
	right: ${({reverse}) => reverse ? '0' : 'auto'};
	display: flex;
	margin-top: ${ ({m, row}) => m.isMobile ? row * 48
										: m.isTabletP ? row * 69.5
										: m.isTabletA ? row * 81.5
										: row * 115.5}px;
	animation: ${({reverse}) => reverse ? moveXReverse : moveX} 22s linear infinite;
`
// justify-self: ${({reverse}) => reverse ? 'flex-end' : 'flex-start'};
// animation: ${({reverse}) => reverse ? moveXReverse : moveX} 22s linear infinite;
const String = styled.div`
	padding-left: ${ ({m}) => m.isHugeDesk || m.isDesk ? 40
									: m.isMobile ? 16
									: 24}px;
	span {
		margin-right: ${ ({m}) => m.isHugeDesk || m.isDesk ? 40
										: m.isMobile ? 16
										: 24}px;
	}
	span:last-child {
		margin-right: 0;
	}
`
const Skill = styled.span`
	font-family: ${({bold}) => bold ? 'AccentFontM' : 'AccentFontT'}, sans-serif;
	font-size: ${ ({m}) => m.isHugeDesk || m.isDesk ? 76
								: m.isMobile ? 30
								: 48}px;
	color: ${ ({theme, bold}) => bold ? theme.ac.dark : theme.mode.text };
	text-transform: uppercase;
	white-space: nowrap;
	transition: color ${commonTheme.durations.short}s;
`
const topWords = ["GRAPHIC", "UI/UX", "WEB DESIGN", "DIGITAL", "PRODUCT"]
const middleWords = ["FIGMA", "PHOTOSHOP", "ILLUSTRATOR", "HTML/CSS/JS"]
const bottomWords = ["CREATIVE", "MARKETING", "SMM", "IIIUSTRATION", "3D"]

const Skills = () => {

	const media = useContext(MediaContext)

	return <Wrap m={media}>
		<SectionTitle skills>Навыки</SectionTitle>
		<div>
			<MovingRow row={0} m={media}>
				{[...Array(4)].map((v, ind) => (
					<String key={ind} m={media}>
						{topWords.map((w, i) => <Skill bold={i === 2 ? true : false} key={i} m={media}>{w}</Skill>)}
					</String>
				))}
			</MovingRow>
			<MovingRow row={1} reverse m={media}>
				{[...Array(4)].map((v, ind) => (
					<String key={ind} m={media}>
						{middleWords.map((w, i) => <Skill bold={i === 0 || i === 3 ? true : false} key={i} m={media}>{w}</Skill>)}
					</String>
				))}
			</MovingRow>
			<MovingRow row={2} m={media}>
				{[...Array(4)].map((v, ind) => (
					<String key={ind} m={media}>
						{bottomWords.map((w, i) => <Skill bold={i === 2 ? true : false} key={i} m={media}>{w}</Skill>)}
					</String>
				))}
			</MovingRow>
		</div>
	</Wrap>
}

export default Skills;