import React, { useContext } from 'react';
import styled from 'styled-components';
import { AccentColorContext, MediaContext } from '../../App';
import { commonTheme } from '../../styles/theme';

const TabsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: ${ ({media}) => media === 'mobile' || media === 'tabletP' ? 'space-between' : 'center' };
	width: 100%;
	margin-bottom: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 168 : 48 }px;
	z-index: 4;
	div {
		font-family: 'WinterR', sans-serif;
		font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16 }px;
		border: 1px solid ${ ({accentColor}) => accentColor.light };
		border-radius: 9em;
		padding: 16px ${ ({media}) => media === 'mobile' ? 'clamp(20px, 5.28vw, 24px)' : '24px' };
		color: ${ ({theme}) => theme.text };
		margin-right: ${ ({media}) => media === 'mobile' || media === 'tabletP' ? 0 : 24 }px;
		margin-bottom: ${ ({media}) => media === 'mobile' ? 12 : 0 }px;
		cursor: pointer;
		transition: all ${commonTheme.durations.short}ms;
	}
	div:last-child {
		margin-right: 0;
	}
	div:hover {
		background-color: ${ ({accentColor}) => accentColor.dark };
		border-color: ${ ({accentColor}) => accentColor.dark };
		color: ${ ({theme}) => theme.bg };
	}
	div.tabItemActive {
		font-family: 'WinterEBI', sans-serif;
		background-color: ${ ({accentColor}) => accentColor.dark };
		border-color: ${ ({accentColor}) => accentColor.dark };
		color: ${ ({theme}) => theme.bg };
	}
`
const Tabs = ({ caseData, categoriesData }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	const tabSwitch = e => {
		const tabArr = document.querySelectorAll('.tabItem')
		for (let i = 0; i < tabArr.length; i++) {
			tabArr[i].classList.remove('tabItemActive')
		}
		e.target.classList.add('tabItemActive')
	}

	const showAll = e => {
		tabSwitch(e)
		const rowArr = document.querySelectorAll('.rowItem')
		for (let i = 0; i < rowArr.length; i++) {
			rowArr[i].style.display = 'inline'
		}
	}

	const showCategory = e => {
		tabSwitch(e)
		const rowArr = document.querySelectorAll('.rowItem')
		for (let i = 0; i < rowArr.length; i++) {
			rowArr[i].style.display = 'inline'
		}
		for (let i = 0; i < caseData.length; i++) {
			for (let j = 0; j < caseData[i].categories.length; j++) {
				if (caseData[i].categories[j].title === e.target.innerText) break

				if (j === caseData[i].categories.length - 1
				&& caseData[i].categories[j].title !== e.target.innerText) {
					// hide
					rowArr[i].style.display = 'none'
				}
			}
		}
	}

	return caseData && categoriesData && <TabsWrapper media={media} accentColor={accentColor}>
			<div className='tabItem tabItemActive' onClick={showAll}>Все</div>
			{categoriesData.map((c, i) =>
				<div key={i}
				onClick={showCategory}
				className='tabItem'>{c.title}</div>
			)}
		</TabsWrapper>
}

export default Tabs;