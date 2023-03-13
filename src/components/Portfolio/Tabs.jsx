import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';

const Wrapper = styled.div`
	display: ${({m}) => m.isMobile ? 'grid' : 'flex'};
	grid-template-columns: 1fr 1fr;
	grid-gap: ${({m}) => m.isMobile ? 24 : 0}px;
	justify-content: ${({m}) => m.isMobile || m.isTabletP ? 'space-between' : 'center'};
	width: 100%;
	padding: ${({m}) => m.isTabletP ? '0 40px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0'};
	margin-bottom: 48px;
`
const Tab = styled.div`
	grid-row: ${({num}) => num === 0 || num === 1 ? `1/2`
								: num === 2 || num === 4 ? '2/3'
								: `3/4`};
	grid-column: ${({num}) => num === 0 || num === 2 ? `1/2`
									: num === 3 ? '1/3'
									: `2/3`};
	display: grid;
	width: ${({m}) => m.isMobile ? `100%` : 'auto'};
	padding: 16px ${({m}) => m.isMobile ? 'clamp(20px, 5.28vw, 24px)' : '24px'};
	margin-right: ${({m}) => m.isMobile || m.isTabletP ? 0 : 24}px;
	border: 1px solid ${ ({theme}) => theme.ac.light };
	border-radius: 9em;
	cursor: pointer;
	font-family: 'AccentFontM', sans-serif;
	transition: background-color ${commonTheme.durations.short}s;
	span {
		grid-row: 1/2;
		grid-column: 1/2;
		align-self: center;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		text-align: center;
		transition: color ${commonTheme.durations.short}s;
	}
	.tabTextActive {
		font-family: 'AccentFontB', sans-serif;
		opacity: 0;
	}
	&:hover {
		background-color: ${ ({theme}) => theme.ac.dark };
		color: ${commonTheme.colors.white};
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

	const tabSwitch = el => {
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

					if (caseData[i].categories[j].title === elem.children[0].innerText) break

					if (j === caseData[i].categories.length - 1
					&& caseData[i].categories[j].title !== elem.children[0].innerText) {
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

	const mouseEnterHandler = e => {
		if (e.target !== activeTab.current) {
			e.target.style.backgroundColor = accentColor.dark
			e.target.style.color = commonTheme.colors.white
		}
	}

	const mouseLeaveHandler = e => {
		if (e.target !== activeTab.current) {
			e.target.style.backgroundColor = 'transparent'
			e.target.style.color = 'inherit'
		}
	}

	return <Wrapper m={media} className='animItems _anim-show-opacity'>
		<Tab num={0}
				className='tabItem tabItem0'
				m={media}
				onClick={ () => tabSwitch('.tabItem0') }
				onMouseEnter={mouseEnterHandler}
				onMouseLeave={mouseLeaveHandler}>
			<span>Все</span>
			<span className='tabTextActive'>Все</span>
		</Tab>
		{categoriesData.map((c, i) => (
			<Tab key={i}
					num={i + 1}
					className={`tabItem tabItem${i + 1}`}
					m={media}
					onClick={ () => tabSwitch(`.tabItem${i + 1}`) }
					onMouseEnter={mouseEnterHandler}
					onMouseLeave={mouseLeaveHandler}>
				<span>{c.title}</span>
				<span className='tabTextActive'>{c.title}</span>
			</Tab>
		))}
	</Wrapper>
}

export default Tabs;