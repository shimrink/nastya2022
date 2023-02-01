import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import * as THREE from "three";
import { motion } from 'framer-motion';
import { commonTheme } from '../../styles/theme';
import { pageTransition, pageVariants } from '../../styles/animations';
import state from '../../store';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import ScrollProgress from './ScrollProgress';
import Scene from './Scene';
import CaseArea from './CaseArea';

const Main = styled(motion.main)`
	position: absolute;
	display: grid;
	grid-template-columns: 1fr ${ ({media}) => media === 'hugeDesk' ? state.gridWidth + 'px' : '1fr' } 1fr;
	width: 100%;
	height: 100%;
	overflow: hidden;
	touch-action: none;
	.canvas-main {
		grid-row: 1/2;
		grid-column: 1/4;
		width: 100%;
		height: 100%;
	}
`
const ShowButton = styled.div`
	grid-row: 1/2;
	grid-column: 1/4;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({accentColor}) => accentColor.dark};
	color: ${commonTheme.colors.primary};
	width: 146px;
	height: 146px;
	font-family: 'AccentFontSBI', sans-serif;
	font-size: 18px;
	border-radius: 50%;
	transform: translate(-50%, -50%) scale(0);
	z-index: 1000000000;
`
const Home = ({ caseData }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	let scrollCount = state.home[media].scrollCount

	const [currentIndex, setCurrentIndex] = useState(0)
	const [carouselSizes, setCarouselSizes] = useState({width: 0, height: 0, indent: 0})
	const [hovering, setHovering] = useState(false)
	const [touchPosition, setTouchPosition] = useState(null)
	const showButtonRef = useRef()
	const mainRef = useRef()

	const next = useCallback(() => {
		if (currentIndex < ((caseData.length - 1) * scrollCount))
			setCurrentIndex(prevState => prevState + 1)
	}, [currentIndex, caseData, scrollCount])

	const prev = useCallback(() => {
		if (currentIndex > 0)
			setCurrentIndex(prevState => prevState - 1)
	}, [currentIndex])

	useEffect(() => {
		const el = mainRef.current
		const onWheel = e => {
			e.preventDefault()
			e.deltaY > 0 ? next() : prev()
		}

		el.addEventListener('wheel', onWheel)

		return () => el.removeEventListener('wheel', onWheel)
	}, [next, prev])

	const touchStartHandler = e => {
		setTouchPosition({
			x: e.touches[0].clientX,
			y: e.touches[0].clientY
		})
	}

	const touchMoveHandler = e => {
		if (touchPosition !== null) {
			if (touchPosition.x - e.touches[0].clientX > 5
			|| touchPosition.y - e.touches[0].clientY > 5) next()

			if (touchPosition.x - e.touches[0].clientX < -5
			|| touchPosition.y - e.touches[0].clientY < 5) prev()

			setTouchPosition(null)
		}
	}

	let planeW = carouselSizes.width
	let planeH = carouselSizes.height
	let planeI = carouselSizes.indent

	return <Main ref={mainRef}
						media={media}
						onTouchStart={touchStartHandler}
						onTouchMove={touchMoveHandler}
						initial='out'
						animate='in'
						exit='out'
						variants={pageVariants}
						transition={pageTransition}>
		<Canvas linear gl={{toneMapping: THREE.NoToneMapping}} className='canvas-main'>
			<Scene currentIndex={currentIndex}
					caseData={caseData}
					scrollCount={scrollCount}
					planeW={planeW}
					planeH={planeH}
					planeI={planeI}
					hovering={hovering} />
		</Canvas>
		{(media === 'hugeDesk' || media === 'desk') && <ShowButton ref={showButtonRef} accentColor={accentColor}>Смотреть</ShowButton>}
		<CaseArea caseData={caseData}
					currentIndex={currentIndex}
					scrollCount={scrollCount}
					showButtonRef={showButtonRef}
					setCarouselSizes={setCarouselSizes}
					setHovering={setHovering}
					planeW={planeW}
					planeH={planeH}
					planeI={planeI} />
		<ScrollProgress caseData={caseData}
							currentIndex={currentIndex}
							scrollCount={scrollCount} />
	</Main>
}

export default Home;