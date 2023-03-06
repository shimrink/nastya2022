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
	transition: background-color ${commonTheme.durations.short}s;
	span {
		grid-row: 1/2;
		grid-column: 1/2;
		align-self: center;
		font-family: 'AccentFontM', sans-serif;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		text-align: center;
		opacity: 1;
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
	&.tabItemActive {
		background-color: ${ ({theme}) => theme.ac.dark };
		color: ${commonTheme.colors.white};
		span {
			opacity: 0;
		}
		.tabTextActive {
			opacity: 1;
		}
	}
`
const Tabs = ({ caseData, categoriesData }) => {

	const media = useContext(MediaContext)
	const rowHeightArr = useRef([])

	useEffect(() => {
		const rowArr = document.querySelectorAll('.rowItem')
		for (let i = 0; i < rowArr.length; i++) {
			rowHeightArr.current.push(rowArr[i].offsetHeight)
		}
	}, [media])

	const tabSwitch = el => {
		const elem = document.querySelector(el)
		const rowArr = document.querySelectorAll('.rowItem')

		// Switch active class
		document.querySelector('.tabItemActive').classList.remove('tabItemActive')
		elem.classList.add('tabItemActive')

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

	return <Wrapper m={media} className='animItems _anim-show-opacity'>
		<Tab num={0} className='tabItem0 tabItemActive' m={media} onClick={ e => tabSwitch('.tabItem0') }>
			<span>Все</span>
			<span className='tabTextActive'>Все</span>
		</Tab>
		{categoriesData.map((c, i) => (
			<Tab key={i}
			num={i + 1}
			className={`tabItem${i + 1}`}
			m={media}
			onClick={ e => tabSwitch(`.tabItem${i + 1}`) }>
				<span>{c.title}</span>
				<span className='tabTextActive'>{c.title}</span>
			</Tab>
		))}
	</Wrapper>
}

export default Tabs;