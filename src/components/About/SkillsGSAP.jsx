import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { commonTheme } from '../../styles/theme';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SkillsWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin: 200px 0;
`
const MovingRow = styled.div`
	display: flex;
`
const HalfRow = styled.div`
	padding-left: 40px;
	span:last-child {
		margin-right: 0;
	}
`
const Skill = styled.span`
	font-family: ${ ({bold}) => bold ? 'AccentFontM' : 'AccentFontT' }, sans-serif;
	font-size: 76px;
	color: ${ ({theme, bold}) => bold ? theme.ac.dark : commonTheme.colors.balck};
	margin-right: 40px;
	text-transform: uppercase;
	white-space: nowrap;
`
const topWords = ["GRAPHIC", "UI/UX", "WEB DESIGN", "DIGITAL", "PRODUCT"]
const middleWords = ["FIGMA", "PHOTOSHOP", "ILLUSTRATOR", "HTML/CSS/JS"]
const bottomWords = ["CREATIVE", "MARKETING", "SMM", "IIIUSTRATION", "3D"]

gsap.registerPlugin(ScrollTrigger)
const SkillsGSAP = () => {

	// const media = useContext(MediaContext)

	const topRowRef = useRef()
	const middleRowRef = useRef()
	const bottomRowRef = useRef()
	const topHalfRowRef = useRef()
	const middleHalfRowRef = useRef()
	const bottomHalfRowRef = useRef()

	useLayoutEffect(() => {
		const roll = (targets, vars, reverse) => {
			vars = vars || {}
			vars.ease || (vars.ease = 'none')
			const tl = gsap.timeline({
				repeat: -1,
				onReverseComplete() {
					this.totalTime(this.rawTime() + this.duration() * 10)
				}
			})

			const elements = gsap.utils.toArray(targets)
			const clones = elements.map(el => {
				let clone = el.cloneNode(true)
				el.parentNode.appendChild(clone)
				return clone
			})
			const positionClones = () => elements.forEach((el, i) =>
				gsap.set(clones[i], {
					position: 'absolute',
					overwrite: false,
					top: el.offsetTop,
					left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)
				})
			)
			positionClones()

			elements.forEach((el, i) =>
				tl.to([el, clones[i]], {xPercent: reverse ? 100 : -100, ...vars}, 0)
			)

			window.addEventListener('resize', () => {
				let time = tl.totalTime()
				tl.totalTime(0)
				positionClones()
				tl.totalTime(time)
			})

			return tl
		}
	
		let direction = 1
		const roll1 = roll(".rollingText", {duration: 10})
		const roll2 = roll(".rollingText02", {duration: 10}, true)
		const scroll = ScrollTrigger.create({
			onUpdate(self) {
				if (self.direction !== direction) {
					direction *= -1
					gsap.to([roll1, roll2], {timeScale: direction, overwrite: true})
				}
			}
		})
	}, [])

	// useLayoutEffect(() => {
	// 	const topRowWidth = topHalfRowRef.current.getBoundingClientRect().width
	// 	gsap.to(topRowRef.current, {
	// 		x: topRowWidth,
	// 		ease: 'linear',
	// 		duration: 20,
	// 		repeat: -1,
	// 	})

	// 	const middleRowWidth = middleHalfRowRef.current.getBoundingClientRect().width
	// 	gsap.to(middleRowRef.current, {
	// 		x: -middleRowWidth,
	// 		ease: 'linear',
	// 		duration: 20,
	// 		repeat: -1,
	// 	})

	// 	const bottomRowWidth = bottomHalfRowRef.current.getBoundingClientRect().width
	// 	gsap.to(bottomRowRef.current, {
	// 		x: bottomRowWidth,
	// 		ease: 'linear',
	// 		duration: 20,
	// 		repeat: -1,
	// 	})
	// }, [])

	return <SkillsWrap>
		<MovingRow ref={topRowRef}>
			<HalfRow ref={topHalfRowRef} className='rollingText'>
				<Skill>GRAPHIC</Skill>
				<Skill>UI/UX</Skill>
				<Skill bold>WEB DESIGN</Skill>
				<Skill>DIGITAL</Skill>
				<Skill>PRODUCT</Skill>
			</HalfRow>
		</MovingRow>
		<MovingRow ref={middleRowRef}>
			<HalfRow ref={middleHalfRowRef} className='rollingText02'>
				<Skill bold>FIGMA</Skill>
				<Skill>PHOTOSHOP</Skill>
				<Skill>ILLUSTRATOR</Skill>
				<Skill bold>HTML/CSS/JS</Skill>
			</HalfRow>
		</MovingRow>
		<MovingRow ref={bottomRowRef}>
			<HalfRow ref={bottomHalfRowRef} className='rollingText03'>
				<Skill>CREATIVE</Skill>
				<Skill>MARKETING</Skill>
				<Skill bold>SMM</Skill>
				<Skill>IIIUSTRATION</Skill>
				<Skill>3D</Skill>
			</HalfRow>
		</MovingRow>
	</SkillsWrap>
}

export default SkillsGSAP;