import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import Line from '../common/Line';

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
const Title = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${({media}) => media === 'mobile' ? '0 clamp(24px, 7.5vw, 40px) 348px clamp(24px, 7.5vw, 40px)' : '0 40px 348px 40px'};
`
const Hi = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16}px;
	text-transform: uppercase;
	text-align: center;
	padding-bottom: 48px;
`
const MovingRow = styled.div`
	position: absolute;
	left: ${({reverse}) => reverse ? 'auto' : 0};
	right: ${({reverse}) => reverse ? 0 : 'auto'};
	display: flex;
	margin-top: ${({media, row}) => media === 'hugeDesk' || media === 'desk' ? row * 108 + 116
												: media === 'mobile' ? row * 45 + 116
												: row * 77 + 116}px;
	animation: ${({reverse}) => reverse ? moveXReverse : moveX} 22s linear infinite;
`
const String = styled.div`
	padding-left: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 40
										: media === 'mobile' ? 16
										: 24}px;
	span {
		margin-right: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 40
										: media === 'mobile' ? 16
										: 24}px;
	}
	span:last-child {
		margin-right: 0;
	}
`
const Skill = styled.span`
	font-family: ${ ({bold}) => bold ? 'AccentFontI' : 'AccentFontT' }, sans-serif;
	font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '76px'
										: media === 'mobile' ? '30px'
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
		<Title media={media}>
			<Hi media={media}>Навыки</Hi>
			<Line />
		</Title>
		<MovingRow row={0} media={media}>
			{[...Array(4)].map((v, ind) => (
				<String key={ind} media={media}>
					{topWords.map((w, i) => <Skill bold={i === 2 ? true : false} key={i} accentColor={accentColor} media={media}>{w}</Skill>)}
				</String>
			))}
		</MovingRow>
		<MovingRow row={1} reverse media={media}>
			{[...Array(4)].map((v, ind) => (
				<String key={ind} media={media}>
					{middleWords.map((w, i) => <Skill bold={i === 0 || i === 3 ? true : false} key={i} accentColor={accentColor} media={media}>{w}</Skill>)}
				</String>
			))}
		</MovingRow>
		<MovingRow row={2} media={media}>
			{[...Array(4)].map((v, ind) => (
				<String key={ind} media={media}>
					{bottomWords.map((w, i) => <Skill bold={i === 2 ? true : false} key={i} accentColor={accentColor} media={media}>{w}</Skill>)}
				</String>
			))}
		</MovingRow>
	</Wrap>
}

export default Skills;