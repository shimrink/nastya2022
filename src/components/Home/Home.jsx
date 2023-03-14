import React, { Suspense, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';
import ScrollProgress from './ScrollProgress';
import CaseArea from './CaseArea';
import CaseImg from './CaseImg';

const Main = styled.main`
	position: absolute;
	display: grid;
	grid-template-columns: 1fr ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
	width: 100%;
	height: 100%;
	overflow: hidden;
	touch-action: none;
`
const ShowButton = styled.div`
	position: absolute;
	grid-row: 1/2;
	grid-column: 1/4;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${ ({theme}) => theme.ac.dark };
	color: ${commonTheme.colors.white};
	width: 146px;
	height: 146px;
	font-family: 'AccentFontB', sans-serif;
	font-size: 18px;
	border-radius: 50%;
	transform: translate(-50%, -50%) scale(0);
	z-index: 3;
`
const Home = ({ setPageInitialized, caseData, pageTransition }) => {

	useEffect(() => {
		setPageInitialized(true)
	}, [setPageInitialized])

	const media = useContext(MediaContext)
	const [scrollCount, setScrollCount] = useState(1)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [hovering, setHovering] = useState(false)
	const [hoverNum, setHoverNum] = useState()
	const [touchPosition, setTouchPosition] = useState(null)
	const showButtonRef = useRef()
	let casesCount = 0
	caseData.forEach(c => {
		if (c.isMainSlider) casesCount++
	})

	const next = useCallback(() => {
		if (currentIndex < ((casesCount - 1) * scrollCount)) {
			setCurrentIndex(prevState => prevState + 1)
		}
	}, [currentIndex, casesCount, scrollCount])

	const prev = useCallback(() => {
		if (currentIndex > 0) {
			setCurrentIndex(prevState => prevState - 1)
		}
	}, [currentIndex])

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

	useEffect(() => {
		const onWheel = e => {
			e.deltaY > 0 ? next() : prev()
		}
		window.addEventListener('wheel', onWheel)

		return () => window.removeEventListener('wheel', onWheel)
	}, [next, prev])

	useEffect(() => {
		setScrollCount(media.isHugeDesk || media.isDesk ? 5 : 1)
	}, [media])

	return <Suspense fallback={null}>
		<Main m={media} onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler}>
			<CaseImg caseData={caseData} currentIndex={currentIndex} scrollCount={scrollCount} hovering={hovering} hoverNum={hoverNum} />
			{(media.isHugeDesk || media.isDesk) && <ShowButton ref={showButtonRef}>Смотреть</ShowButton>}
			<CaseArea caseData={caseData}
						currentIndex={currentIndex}
						scrollCount={scrollCount}
						showButtonRef={showButtonRef}
						setHovering={setHovering}
						setHoverNum={setHoverNum}
						pageTransition={pageTransition} />
			<ScrollProgress casesCount={casesCount} currentIndex={currentIndex} scrollCount={scrollCount} />
		</Main>
	</Suspense>
}

export default Home;