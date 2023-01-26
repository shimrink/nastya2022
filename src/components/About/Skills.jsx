import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { AccentColorContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
const SkillsWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin: 200px 0;
`
const MovingRow = styled.div`
	position: absolute;
	left: ${({reverse}) => reverse ? 'auto' : 0};
	right: ${({reverse}) => reverse ? 0 : 'auto'};
	display: flex;
	margin-top: ${({row}) => row * 100}px;
	animation: ${({reverse}) => reverse ? moveXReverse : moveX} 22s linear infinite;
`
const HalfRow = styled.div`
	padding-left: 40px;
	span:last-child {
		margin-right: 0;
	}
`
const Skill = styled.span`
	font-family: ${ ({bold}) => bold ? 'AccentFontI' : 'AccentFontT' }, sans-serif;
	font-size: 76px;
	color: ${ ({accentColor, bold}) => bold ? accentColor.dark : commonTheme.colors.quaternary};
	margin-right: 40px;
	text-transform: uppercase;
	white-space: nowrap;
`
// const topWords = ["GRAPHIC", "UI/UX", "WEB DESIGN", "DIGITAL", "PRODUCT"]
// const middleWords = ["FIGMA", "PHOTOSHOP", "ILLUSTRATOR", "HTML/CSS/JS"]
// const bottomWords = ["CREATIVE", "MARKETING", "SMM", "IIIUSTRATION", "3D"]

gsap.registerPlugin(ScrollTrigger)
const Skills = () => {

	// const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	return <SkillsWrap>
		<MovingRow row={0}>
			<HalfRow>
				<Skill accentColor={accentColor}>GRAPHIC</Skill>
				<Skill accentColor={accentColor}>UI/UX</Skill>
				<Skill bold accentColor={accentColor}>WEB DESIGN</Skill>
				<Skill accentColor={accentColor}>DIGITAL</Skill>
				<Skill accentColor={accentColor}>PRODUCT</Skill>
			</HalfRow>
			<HalfRow>
				<Skill accentColor={accentColor}>GRAPHIC</Skill>
				<Skill accentColor={accentColor}>UI/UX</Skill>
				<Skill bold accentColor={accentColor}>WEB DESIGN</Skill>
				<Skill accentColor={accentColor}>DIGITAL</Skill>
				<Skill accentColor={accentColor}>PRODUCT</Skill>
			</HalfRow>
			<HalfRow>
				<Skill accentColor={accentColor}>GRAPHIC</Skill>
				<Skill accentColor={accentColor}>UI/UX</Skill>
				<Skill bold accentColor={accentColor}>WEB DESIGN</Skill>
				<Skill accentColor={accentColor}>DIGITAL</Skill>
				<Skill accentColor={accentColor}>PRODUCT</Skill>
			</HalfRow>
			<HalfRow>
				<Skill accentColor={accentColor}>GRAPHIC</Skill>
				<Skill accentColor={accentColor}>UI/UX</Skill>
				<Skill bold accentColor={accentColor}>WEB DESIGN</Skill>
				<Skill accentColor={accentColor}>DIGITAL</Skill>
				<Skill accentColor={accentColor}>PRODUCT</Skill>
			</HalfRow>
		</MovingRow>
		<MovingRow row={1} reverse>
			<HalfRow>
				<Skill bold accentColor={accentColor}>FIGMA</Skill>
				<Skill accentColor={accentColor}>PHOTOSHOP</Skill>
				<Skill accentColor={accentColor}>ILLUSTRATOR</Skill>
				<Skill bold accentColor={accentColor}>HTML/CSS/JS</Skill>
			</HalfRow>
			<HalfRow>
				<Skill bold accentColor={accentColor}>FIGMA</Skill>
				<Skill accentColor={accentColor}>PHOTOSHOP</Skill>
				<Skill accentColor={accentColor}>ILLUSTRATOR</Skill>
				<Skill bold accentColor={accentColor}>HTML/CSS/JS</Skill>
			</HalfRow>
			<HalfRow>
				<Skill bold accentColor={accentColor}>FIGMA</Skill>
				<Skill accentColor={accentColor}>PHOTOSHOP</Skill>
				<Skill accentColor={accentColor}>ILLUSTRATOR</Skill>
				<Skill bold accentColor={accentColor}>HTML/CSS/JS</Skill>
			</HalfRow>
			<HalfRow>
				<Skill bold accentColor={accentColor}>FIGMA</Skill>
				<Skill accentColor={accentColor}>PHOTOSHOP</Skill>
				<Skill accentColor={accentColor}>ILLUSTRATOR</Skill>
				<Skill bold accentColor={accentColor}>HTML/CSS/JS</Skill>
			</HalfRow>
		</MovingRow>
		<MovingRow row={2}>
			<HalfRow>
				<Skill accentColor={accentColor}>CREATIVE</Skill>
				<Skill accentColor={accentColor}>MARKETING</Skill>
				<Skill bold accentColor={accentColor}>SMM</Skill>
				<Skill accentColor={accentColor}>IIIUSTRATION</Skill>
				<Skill accentColor={accentColor}>3D</Skill>
			</HalfRow>
			<HalfRow>
				<Skill accentColor={accentColor}>CREATIVE</Skill>
				<Skill accentColor={accentColor}>MARKETING</Skill>
				<Skill bold accentColor={accentColor}>SMM</Skill>
				<Skill accentColor={accentColor}>IIIUSTRATION</Skill>
				<Skill accentColor={accentColor}>3D</Skill>
			</HalfRow>
			<HalfRow>
				<Skill accentColor={accentColor}>CREATIVE</Skill>
				<Skill accentColor={accentColor}>MARKETING</Skill>
				<Skill bold accentColor={accentColor}>SMM</Skill>
				<Skill accentColor={accentColor}>IIIUSTRATION</Skill>
				<Skill accentColor={accentColor}>3D</Skill>
			</HalfRow>
			<HalfRow>
				<Skill accentColor={accentColor}>CREATIVE</Skill>
				<Skill accentColor={accentColor}>MARKETING</Skill>
				<Skill bold accentColor={accentColor}>SMM</Skill>
				<Skill accentColor={accentColor}>IIIUSTRATION</Skill>
				<Skill accentColor={accentColor}>3D</Skill>
			</HalfRow>
		</MovingRow>
	</SkillsWrap>
}

export default Skills;