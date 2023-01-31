import React, { useContext } from 'react';
import styled from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';

const TabsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: ${ ({media}) => media === 'mobile' || media === 'tabletP' ? 'space-between' : 'center' };
	width: 100%;
	margin-bottom: 48px;
	div {
		font-family: 'AccentFontM', sans-serif;
		font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16 }px;
		border: 1px solid ${ ({accentColor}) => accentColor.light };
		border-radius: 9em;
		padding: 16px ${ ({media}) => media === 'mobile' ? 'clamp(20px, 5.28vw, 24px)' : '24px' };
		color: ${commonTheme.colors.primary};
		margin-right: ${ ({media}) => media === 'mobile' || media === 'tabletP' ? 0 : 24 }px;
		margin-bottom: ${ ({media}) => media === 'mobile' ? 12 : 0 }px;
		cursor: pointer;
		transition: all ${commonTheme.durations.short}ms;
	}
	div:last-child {
		margin-right: 0;
	}
	div:hover {
		background-color: ${commonTheme.colors.primary};
		border-color: ${commonTheme.colors.primary};
		color: ${ ({accentColor}) => accentColor.dark };
	}
	div.tabItemActive {
		font-family: 'AccentFontSBI', sans-serif;
		background-color: ${commonTheme.colors.primary};
		border-color: ${commonTheme.colors.primary};
		color: ${ ({accentColor}) => accentColor.dark };
	}
`
const Tabs = ({ caseData, categoriesData }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	const tabSwitch = el => {
		const elem = document.querySelector(el)
		const rowArr = document.querySelectorAll('.rowItem')

		// Switch active class
		document.querySelector('.tabItemActive').classList.remove('tabItemActive')
		elem.classList.add('tabItemActive')

		// Show all cases
		for (let i = 0; i < rowArr.length; i++) {
			rowArr[i].style.display = 'inline'
		}

		// Hide unnecessary cases
		if (el !== '.tabItem0') {
			for (let i = 0; i < caseData.length; i++) {
				for (let j = 0; j < caseData[i].categories.length; j++) {
					if (caseData[i].categories[j].title === elem.innerText) break
	
					if (j === caseData[i].categories.length - 1
					&& caseData[i].categories[j].title !== elem.innerText) {
						rowArr[i].style.display = 'none'
					}
				}
			}
		}
	}

	return <TabsWrapper media={media} accentColor={accentColor}>
		<div className='tabItem0 tabItemActive' onClick={ e => {tabSwitch('.tabItem0')} }>
			<span>Все</span>
		</div>
		{categoriesData.map((c, i) =>
			<div key={i}
			className={`tabItem${i + 1}`}
			onClick={ e => {tabSwitch(`.tabItem${i + 1}`)} }>
				<span>{c.title}</span>
			</div>
		)}
	</TabsWrapper>
}

export default Tabs;