import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';
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
`
const MovingRow = styled.div`
	display: flex;
	justify-content: ${({reverse}) => reverse ? 'flex-end' : 'flex-start'};
	margin-top: ${({m, row}) => m.isTabletP || m.isMobile ? 12 : row === 0 ? 0 : 24}px;
	animation: ${({reverse}) => reverse ? moveXReverse : moveX} 22s linear infinite;
`
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
	font-family: ${ ({bold}) => bold ? 'AccentFontI' : 'AccentFontT' }, sans-serif;
	font-size: ${ ({m}) => m.isHugeDesk || m.isDesk ? '76px'
								: m.isMobile ? '30px'
								: '48px'};
	color: ${ ({theme, accentColor, bold}) => bold ? accentColor.dark : theme.text};
	text-transform: uppercase;
	white-space: nowrap;
`
const topWords = ["GRAPHIC", "UI/UX", "WEB DESIGN", "DIGITAL", "PRODUCT"]
const middleWords = ["FIGMA", "PHOTOSHOP", "ILLUSTRATOR", "HTML/CSS/JS"]
const bottomWords = ["CREATIVE", "MARKETING", "SMM", "IIIUSTRATION", "3D"]

const Skills = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	return <Wrap>
		<SectionTitle skills>Навыки</SectionTitle>
		<MovingRow row={0} m={media}>
			{[...Array(4)].map((v, ind) => (
				<String key={ind} m={media}>
					{topWords.map((w, i) => <Skill bold={i === 2 ? true : false} key={i} accentColor={accentColor} m={media}>{w}</Skill>)}
				</String>
			))}
		</MovingRow>
		<MovingRow row={1} reverse m={media}>
			{[...Array(4)].map((v, ind) => (
				<String key={ind} m={media}>
					{middleWords.map((w, i) => <Skill bold={i === 0 || i === 3 ? true : false} key={i} accentColor={accentColor} m={media}>{w}</Skill>)}
				</String>
			))}
		</MovingRow>
		<MovingRow row={2} m={media}>
			{[...Array(4)].map((v, ind) => (
				<String key={ind} m={media}>
					{bottomWords.map((w, i) => <Skill bold={i === 2 ? true : false} key={i} accentColor={accentColor} m={media}>{w}</Skill>)}
				</String>
			))}
		</MovingRow>
	</Wrap>
}

export default Skills;