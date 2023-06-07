import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'

const Wrapper = styled.div`
	display: flex;
	grid-template-columns: 1fr 1fr;
	justify-content: center;
	width: 100%;
	margin-bottom: 48px;
	@media ${({ theme }) => theme.common.media.tabletP} {
		justify-content: space-between;
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		display: grid;
		grid-gap: 24px;
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const Tab = styled.div`
	grid-row: ${({ num }) =>
		num === 0 || num === 1 ? `1/2` : num === 2 || num === 3 ? '2/3' : `3/4`};
	grid-column: ${({ num }) =>
		num === 0 || num === 2 ? `1/2` : num === 4 ? '1/3' : `2/3`};
	display: grid;
	padding: 16px 24px;
	margin-right: 24px;
	border: 1px solid ${({ theme }) => theme.ac.light};
	border-radius: 9em;
	cursor: pointer;
	font-family: 'AccentFontM', sans-serif;
	transition: background-color ${({ theme }) => theme.common.durations.short}s;
	span {
		grid-row: 1/2;
		grid-column: 1/2;
		align-self: center;
		font-size: 18px;
		text-align: center;
		transition: color ${({ theme }) => theme.common.durations.short}s;
	}
	.tabTextActive {
		font-family: 'AccentFontB', sans-serif;
		opacity: 0;
	}
	&:hover {
		background-color: ${({ theme }) => theme.ac.dark};
		color: ${({ theme }) => theme.common.colors.white};
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		span {
			font-size: 16px;
		}
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin-right: 0;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		width: 100%;
		padding: 16px clamp(20px, 5.28vw, 24px);
	}
`
const Tabs = ({ accentColor, caseData, categoriesData }) => {
	const media = useContext(MediaContext)
	const rowHeightArr = useRef([])
	const activeTab = useRef()

	useEffect(() => {
		activeTab.current = document.querySelector('.tabItem0')
		activeTab.current.style.color = commonTheme.colors.white
		activeTab.current.style.fontFamily = "'AccentFontB', sans-serif"
		const rowArr = document.querySelectorAll('.rowItem')
		for (let i = 0; i < rowArr.length; i++) {
			rowHeightArr.current.push(rowArr[i].offsetHeight)
		}
	}, [media])

	useEffect(() => {
		activeTab.current.style.backgroundColor = accentColor.dark
	}, [accentColor])

	const tabSwitch = (el) => {
		const elem = document.querySelector(el)
		const tabArr = document.querySelectorAll('.tabItem')
		const rowArr = document.querySelectorAll('.rowItem')

		// Switch active class
		tabArr.forEach((t, i) => {
			t.style.backgroundColor = 'transparent'
			t.style.color = 'inherit'
			t.style.fontFamily = "'AccentFontM', sans-serif"
		})

		activeTab.current = elem
		elem.style.backgroundColor = accentColor.dark
		elem.style.color = commonTheme.colors.white
		elem.style.fontFamily = "'AccentFontB', sans-serif"

		// Show all cases
		for (let i = 0; i < rowArr.length; i++) {
			if (media.isHugeDesk || media.isDesk) {
				rowArr[i].style.height = rowHeightArr.current[i] + 'px'
				rowArr[i].children[1].style.opacity = 1
				rowArr[i].children[1].style.transition = 'opacity 30ms'
			} else {
				rowArr[i].style.display = 'flex'
			}
		}

		// Hide unnecessary cases
		if (el !== '.tabItem0') {
			for (let i = 0; i < caseData.length; i++) {
				for (let j = 0; j < caseData[i].categories.length; j++) {
					if (caseData[i].categories[j].title === elem.children[0].innerText)
						break

					if (
						j === caseData[i].categories.length - 1 &&
						caseData[i].categories[j].title !== elem.children[0].innerText
					) {
						if (media.isHugeDesk || media.isDesk) {
							rowArr[i].style.height = 0
							rowArr[i].children[1].style.opacity = 0
							rowArr[i].children[1].style.transition = 'opacity 600ms'
						} else {
							rowArr[i].style.display = 'none'
						}
					}
				}
			}
		}
	}

	const mouseEnterHandler = (e) => {
		if (e.target !== activeTab.current) {
			e.target.style.backgroundColor = accentColor.dark
			e.target.style.color = commonTheme.colors.white
		}
	}

	const mouseLeaveHandler = (e) => {
		if (e.target !== activeTab.current) {
			e.target.style.backgroundColor = 'transparent'
			e.target.style.color = 'inherit'
		}
	}

	return (
		<Wrapper className='animItems _anim-show-opacity'>
			<Tab
				num={0}
				className='tabItem tabItem0'
				onClick={() => tabSwitch('.tabItem0')}
				onMouseEnter={mouseEnterHandler}
				onMouseLeave={mouseLeaveHandler}
			>
				<span>Все</span>
				<span className='tabTextActive'>Все</span>
			</Tab>
			{categoriesData.map((c, i) => (
				<Tab
					key={c.title}
					num={i + 1}
					className={`tabItem tabItem${i + 1}`}
					onClick={() => tabSwitch(`.tabItem${i + 1}`)}
					onMouseEnter={mouseEnterHandler}
					onMouseLeave={mouseLeaveHandler}
				>
					<span>{c.title}</span>
					<span className='tabTextActive'>{c.title}</span>
				</Tab>
			))}
		</Wrapper>
	)
}

export default Tabs
