import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import * as THREE from "three";
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import ScrollProgress from './ScrollProgress';
import Scene from './Scene';
import CaseArea from './CaseArea';

const Main = styled.main`
	position: absolute;
	display: grid;
	grid-template-columns: 1fr ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
	width: 100%;
	height: 100%;
	overflow: hidden;
	touch-action: none;
	.canvas-main {
		position: relative;
		grid-row: 1/2;
		grid-column: 1/4;
		width: 100%;
		height: 100%;
		z-index: 2;
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
	font-family: 'AccentFontB', sans-serif;
	font-size: 18px;
	border-radius: 50%;
	transform: translate(-50%, -50%) scale(0);
	z-index: 3;
`
const Home = ({ caseData, pageTransition }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	const [scrollCount, setScrollCount] = useState(1)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [carouselSizes, setCarouselSizes] = useState({width: 0, height: 0, indent: 0})
	const [hovering, setHovering] = useState(false)
	const [hoverNum, setHoverNum] = useState()
	const [touchPosition, setTouchPosition] = useState(null)
	const showButtonRef = useRef()
	const mainRef = useRef()

	useEffect(() => {
		if (media.isHugeDesk || media.isDesk) { setScrollCount(5) }
		else { setScrollCount(1) }
	}, [media])

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

	return <Main ref={mainRef}
					m={media}
					onTouchStart={touchStartHandler}
					onTouchMove={touchMoveHandler}>
		<Canvas linear gl={{toneMapping: THREE.NoToneMapping}} className='canvas-main'>
			<Scene currentIndex={currentIndex}
					caseData={caseData}
					scrollCount={scrollCount}
					carouselSizes={carouselSizes}
					hovering={hovering}
					hoverNum={hoverNum} />
		</Canvas>
		{(media.isHugeDesk || media.isDesk) && <ShowButton ref={showButtonRef} accentColor={accentColor}>Смотреть</ShowButton>}
		<CaseArea caseData={caseData}
					currentIndex={currentIndex}
					scrollCount={scrollCount}
					showButtonRef={showButtonRef}
					setCarouselSizes={setCarouselSizes}
					setHovering={setHovering}
					setHoverNum={setHoverNum}
					pageTransition={pageTransition} />
		<ScrollProgress caseData={caseData}
							currentIndex={currentIndex}
							scrollCount={scrollCount} />
	</Main>
}

export default Home;