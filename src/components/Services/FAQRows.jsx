import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Line from '../common/Line'

const Wrap = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({ theme }) => theme.common.gridWidth}px 1fr;
	grid-column-gap: 24px;
	padding: 0 40px;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column-gap: 24px;
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const Row = styled.div`
	grid-column: 2/3;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-row-gap: 24px;
	grid-column-gap: 24px;
	padding: 24px 0 0 0;
	cursor: pointer;
	overflow: hidden;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/4;
		padding: 24px 40px 0 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding: 24px 0 0 0;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column-gap: clamp(24px, 7.5vw, 40px);
	}
`
const Question = styled.p`
	grid-row: 1/2;
	grid-column: 1/7;
	align-self: center;
	font-family: 'AccentFontR', sans-serif;
	font-size: 18px;
	text-transform: uppercase;
	line-height: 110%;
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/11;
	}
`
const Svg = styled.svg`
	grid-row: 1/2;
	grid-column: 7/13;
	fill: none;
	width: 18px;
	height: 8px;
	align-self: center;
	justify-self: start;
	transform: rotate(${({ active }) => (active ? 45 : 0)}deg);
	transition: transform ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/11;
		justify-self: end;
	}
`
const Path = styled.path`
	fill: ${({ theme }) => theme.ac.light};
	transition: fill ${({ theme }) => theme.common.durations.short}s;
`
const Answer = styled.pre`
	grid-row: 2/3;
	grid-column: 7/13;
	margin: 0;
	font-family: 'BaseFont', sans-serif;
	font-size: 18px;
	height: ${({ active, h }) => (active ? h + 24 : 0)}px;
	line-height: 110%;
	white-space: pre-wrap;
	transition: height ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/13;
	}
`
const FAQRows = ({ f }) => {
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
		setActive((prevState) => !prevState)
	}

	return (
		<Wrap>
			<Row onClick={toggleAnswer}>
				<Question>{f.question}</Question>
				<Svg
					active={active}
					viewBox='0 0 18 8'
					xmlns='http://www.w3.org/2000/svg'
				>
					<Path d='M0.515625 3.5C0.239483 3.5 0.015625 3.72386 0.015625 4C0.015625 4.27614 0.239483 4.5 0.515625 4.5V3.5ZM17.8397 4.35355C18.035 4.15829 18.035 3.84171 17.8397 3.64645L14.6578 0.464466C14.4625 0.269204 14.1459 0.269204 13.9507 0.464466C13.7554 0.659728 13.7554 0.976311 13.9507 1.17157L16.7791 4L13.9507 6.82843C13.7554 7.02369 13.7554 7.34027 13.9507 7.53553C14.1459 7.7308 14.4625 7.7308 14.6578 7.53553L17.8397 4.35355ZM0.515625 4.5L17.4862 4.5V3.5L0.515625 3.5V4.5Z' />
				</Svg>
				<Answer ref={answerRef} active={active} h={answerH}>
					{f.answer}
				</Answer>
			</Row>
			<Line defaultP gr='3/4' gc='1/4' />
		</Wrap>
	)
}

export default FAQRows
