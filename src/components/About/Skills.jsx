import React from 'react'
import styled, { keyframes } from 'styled-components'
import { state } from '../../store'
import SectionTitle from '../common/SectionTitle'

const moveX = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-25%);
	}
`
const moveXReverse = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(25%);
	}
`
const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: clamp(452px, 32.655vw, 576px);
	padding-bottom: 300px;
	@media ${({ theme }) => theme.common.media.tablet} {
		margin-top: clamp(288px, 35.85vw, 342px);
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding-bottom: 207px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		padding-bottom: 183px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding-bottom: 123px;
		margin-top: clamp(188px, 51.11vw, 240px);
	}
`
const MovingRow = styled.div`
	position: absolute;
	right: ${({ reverse }) => (reverse ? '0' : 'auto')};
	display: flex;
	margin-top: ${({ row }) => row * 115.5}px;
	animation: ${({ reverse }) => (reverse ? moveXReverse : moveX)} 22s linear
		infinite;
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin-top: ${({ row }) => row * 81.5}px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin-top: ${({ row }) => row * 69.5}px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-top: ${({ row }) => row * 48}px;
	}
`
const String = styled.div`
	padding-left: 40px;
	span {
		margin-right: 40px;
	}
	span:last-child {
		margin-right: 0;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding-left: 24px;
		span {
			margin-right: 24px;
		}
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding-left: 16px;
		span {
			margin-right: 16px;
		}
	}
`
const Skill = styled.span`
	font-family: ${({ bold }) => (bold ? 'AccentFontM' : 'AccentFontT')},
		sans-serif;
	font-size: 76px;
	color: ${({ theme, bold }) => (bold ? theme.ac.dark : theme.mode.text)};
	text-transform: uppercase;
	white-space: nowrap;
	transition: color ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 48px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		font-size: 30px;
	}
`
const Skills = () => {
	return (
		<Wrap>
			<SectionTitle
				mbHugeDesk='48px'
				mbDesk='48px'
				mbTabletA='48px'
				mbTabletP='48px'
			>
				Навыки
			</SectionTitle>
			<div>
				{state.skillsWords.map((sRow, index) => (
					<MovingRow key={index} row={index} reverse={index % 2 !== 0}>
						{[...Array(4)].map((v, ind) => (
							<String key={ind}>
								{sRow.map((w, i) => (
									<Skill
										bold={
											index % 2 === 0 && i === 2
												? true
												: index % 2 !== 0 && (i === 0 || i === 3)
												? true
												: false
										}
										key={w}
									>
										{w}
									</Skill>
								))}
							</String>
						))}
					</MovingRow>
				))}
			</div>
		</Wrap>
	)
}

export default Skills
