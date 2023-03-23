import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import Line from '../common/Line';

const Wrap = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
	grid-column-gap: ${ ({m}) => m.isTabletP ? 40 : 24}px;
`
const Row = styled.div`
	grid-column: ${({m}) => m.isHugeDesk ? '2/3' : '1/4'};
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-row-gap: 24px;
	padding: ${({m}) => m.isHugeDesk ? '24px 0 0 0'
							: m.isDesk ? '24px 80px 0 80px'
							: '24px 40px 0 40px'};
	cursor: pointer;
	overflow: hidden;
`
const Question = styled.p`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile ? '1/12' : '1/7'};
	align-self: center;
	font-family: 'AccentFontR', sans-serif;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
`
const Svg = styled.svg`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile ? '12/13' : '7/13'};
	fill: none;
	width: 18px;
	height: 8px;
	align-self: center;
	justify-self: ${({m}) => m.isMobile ? 'end' : 'start'};
	transform: rotate(${({active}) => active ? 45 : 0}deg);
	transition: transform ${commonTheme.durations.short}s;
`
const Path = styled.path`
	fill: ${({theme}) => theme.ac.light};
	transition: fill ${commonTheme.durations.short}s;
`
const Answer = styled.p`
	grid-row: 2/3;
	grid-column: ${({m}) => m.isMobile ? '1/13' : '7/13'};
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	height: ${({active, h}) => active ? h + 24 : 0}px;
	transition: height ${commonTheme.durations.short}s;
`
const LineWrap = styled.div`
	grid-row: 3/4;
	grid-column: 1/4;
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
`
const FAQRows = ({ f }) => {

	const media = useContext(MediaContext)
	const [active, setActive] = useState(false)
	const [answerH, setAnswerH] = useState()
	const answerRef = useRef()

	useEffect(() => {
		setAnswerH(answerRef.current.scrollHeight)
	}, [])

	useEffect(() => {
		const onResize = () => {
			setActive(false)
		}
		window.addEventListener('resize', onResize)

		return () => window.removeEventListener('resize', onResize)
	}, [])

	const toggleAnswer = () => {
		if (!active) setAnswerH(answerRef.current.scrollHeight)
		setActive(prevState => !prevState)
	}

	return <Wrap m={media}>
		<Row m={media} onClick={toggleAnswer}>
			<Question m={media}>{f.question}</Question>
			<Svg active={active} m={media} viewBox="0 0 18 8" xmlns="http://www.w3.org/2000/svg">
				<Path d="M0.515625 3.5C0.239483 3.5 0.015625 3.72386 0.015625 4C0.015625 4.27614 0.239483 4.5 0.515625 4.5V3.5ZM17.8397 4.35355C18.035 4.15829 18.035 3.84171 17.8397 3.64645L14.6578 0.464466C14.4625 0.269204 14.1459 0.269204 13.9507 0.464466C13.7554 0.659728 13.7554 0.976311 13.9507 1.17157L16.7791 4L13.9507 6.82843C13.7554 7.02369 13.7554 7.34027 13.9507 7.53553C14.1459 7.7308 14.4625 7.7308 14.6578 7.53553L17.8397 4.35355ZM0.515625 4.5L17.4862 4.5V3.5L0.515625 3.5V4.5Z" />
			</Svg>
			<Answer ref={answerRef} m={media} active={active} h={answerH}>{f.answer}</Answer>
		</Row>
		<LineWrap m={media}><Line /></LineWrap>
	</Wrap>
}

export default FAQRows;