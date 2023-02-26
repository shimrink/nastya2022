import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';

const Wrapper = styled.div`
	display: ${({m}) => m.isMobile ? 'grid' : 'flex'};
	grid-template-columns: 1fr 1fr;
	grid-column-gap: ${({m}) => m.isMobile ? 24 : 0}px;
	justify-content: ${({m}) => m.isMobile || m.isTabletP ? 'space-between' : 'center'};
	width: 100%;
	padding: ${({m}) => m.isTabletP ? '0 40px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0'};
	margin-bottom: 48px;
	div {
		width: ${({m}) => m.isMobile ? `100%` : 'auto'};
		padding: 16px ${({m}) => m.isMobile ? 'clamp(20px, 5.28vw, 24px)' : '24px'};
		margin-right: ${({m}) => m.isMobile || m.isTabletP ? 0 : 24}px;
		margin-bottom: ${({m}) => m.isMobile ? 24 : 0}px;
		font-family: 'AccentFontM', sans-serif;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		border: 1px solid ${ ({theme}) => theme.ac.light };
		border-radius: 9em;
		text-align: center;
		cursor: pointer;
		transition: background-color ${commonTheme.durations.short}s,
						color ${commonTheme.durations.short}s;
	}
	div:last-child {
		grid-column: 1/3;
		margin: 0;
	}
	div:hover {
		background-color: ${ ({theme}) => theme.ac.dark };
		color: ${commonTheme.colors.primary};
	}
	div.tabItemActive {
		font-family: 'AccentFontB', sans-serif;
		background-color: ${ ({theme}) => theme.ac.dark };
		color: ${commonTheme.colors.primary};
	}
`
const Tabs = ({ caseData, categoriesData }) => {

	const media = useContext(MediaContext)

	const tabSwitch = el => {
		const elem = document.querySelector(el)
		const rowArr = document.querySelectorAll('.rowItem')

		// Switch active class
		document.querySelector('.tabItemActive').classList.remove('tabItemActive')
		elem.classList.add('tabItemActive')

		// Show all cases
		for (let i = 0; i < rowArr.length; i++) rowArr[i].style.display = 'inline'

		// Hide unnecessary cases
		if (el !== '.tabItem0')
			for (let i = 0; i < caseData.length; i++)
				for (let j = 0; j < caseData[i].categories.length; j++) {

					if (caseData[i].categories[j].title === elem.innerText)
						break

					if (j === caseData[i].categories.length - 1
					&& caseData[i].categories[j].title !== elem.innerText)
						rowArr[i].style.display = 'none'
				}
	}

	return <Wrapper m={media}>
		<div num={0} className='tabItem0 tabItemActive' onClick={ e => {tabSwitch('.tabItem0')} }>
			<span>Все</span>
		</div>
		{categoriesData.map((c, i) => (
			<div key={i}
			num={i + 1}
			className={`tabItem${i + 1}`}
			onClick={ e => {tabSwitch(`.tabItem${i + 1}`)} }>
				<span>{c.title}</span>
			</div>
		))}
	</Wrapper>
}

export default Tabs;