import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { wrap } from "@motionone/utils";
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';

const SkillsWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin: 200px 0;
`
const MovingRows = styled.div`
	display: flex;
	div {
		display: flex;
	}
`
const Skill = styled.span`
	font-family: ${ ({bold}) => bold ? 'AccentFontM' : 'AccentFontT' }, sans-serif;
	font-size: 76px;
	color: ${ ({theme, bold}) => bold ? theme.ac.dark : commonTheme.colors.quaternary};
	margin-right: 40px;
	text-transform: uppercase;
	white-space: nowrap;
`
const ParallaxText = ({ children, baseVelocity = 100 }) => {

	const baseX = useMotionValue(0)
	const { scrollY } = useScroll()
	const scrollVelocity = useVelocity(scrollY)
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400
	})
	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
		clamp: false
	})

	/*
	Это волшебное обертывание для длины текста - вы должны
	заменить обертывание, которое работает для вас, или динамически вычислять
	*/
	const x = useTransform(baseX, (v) => `${wrap(-0, -25, v)}%`)

	const directionFactor = useRef(1)
	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get()

		baseX.set(baseX.get() + moveBy)
	})

	/*
	Количество повторений дочернего текста должно быть динамически рассчитано
	на основе размера текста и области вьюпорта. Аналогично, значение движения x
	в настоящее время находится в диапазоне от -20 до -45% – эти 25% получены
	из того факта, что у нас четыре дочерних элемента (100% / 4). Это также
	потребовало бы получения из динамически генерируемого числа дочерних элементов.
	*/
	return <MovingRows>
		<motion.div style={{x}}>
			<p>{children} </p>
			<p>{children} </p>
			<p>{children} </p>
			<p>{children} </p>
		</motion.div>
	</MovingRows>
}

const SkillsFM = () => {

	// const media = useContext(MediaContext)

	return <SkillsWrap>
		{/* <ParallaxText baseVelocity={-1}>
			Graphic UI/UX Web design Digital Product
		</ParallaxText>
		<ParallaxText baseVelocity={1}>
			FIGMA PHOTOSHOP ILLUSTRATOR HTML/CSS/JS
		</ParallaxText>
		<ParallaxText baseVelocity={-1}>
			Creative Marketing SMM Illustration 3D
		</ParallaxText> */}
		<ParallaxText baseVelocity={-1}>
			<Skill>Graphic</Skill>
			<Skill>UI/UX</Skill>
			<Skill bold>Web design</Skill>
			<Skill>Digital</Skill>
			<Skill>Product</Skill>
		</ParallaxText>
		<ParallaxText baseVelocity={1}>
			<Skill bold>FIGMA</Skill>
			<Skill>PHOTOSHOP</Skill>
			<Skill>ILLUSTRATOR</Skill>
			<Skill bold>HTML/CSS/JS</Skill>
		</ParallaxText>
		<ParallaxText baseVelocity={-1}>
			<Skill>Creative</Skill>
			<Skill>Marketing</Skill>
			<Skill bold>SMM</Skill>
			<Skill>Illustration</Skill>
			<Skill>3D</Skill>
		</ParallaxText>
	</SkillsWrap>
}

export default SkillsFM;