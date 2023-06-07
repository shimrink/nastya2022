import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { accentTheme } from '../../styles/theme'

const ColorsWrapper = styled.div`
	display: grid;
	align-items: center;
	justify-items: start;
	@media ${({ theme }) => theme.common.media.tablet} {
		justify-items: end;
		padding: 4px;
	}
`
const WrapDiv = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 1/2;
	width: ${({ sn }) => (sn === 0 ? 20 : 18)}px;
	height: ${({ sn }) => (sn === 0 ? 20 : 18)}px;
	margin: ${({ sn }) => (sn === 0 ? 0 : '0 0 0 1px')};
	z-index: ${({ sn }) => accentTheme.length * 2 - sn};
	transition: margin ${({ theme }) => theme.common.durations.short}s, width 0.1s,
		height 0.1s;
	${ColorsWrapper}:hover && {
		width: 20px;
		height: 20px;
		margin: ${({ sn }) => `0 0 0 ${sn * 24}px`};
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		width: ${({ sn }) => (sn === 0 ? 24 : 22)}px;
		height: ${({ sn }) => (sn === 0 ? 24 : 22)}px;
		padding: 2px;
		margin: ${({ sn }) => (sn === 0 ? 0 : '0 1px 0 0')};
		${ColorsWrapper}:hover && {
			width: 24px;
			height: 24px;
			margin: ${({ sn }) => `0 ${sn * 24}px 0 0`};
		}
	}
`
const ColorDiv = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${({ col }) => col};
	border: none;
	border-radius: 50%;
	cursor: pointer;
`
const AccentColorToggler = ({
	accentColor,
	toggleAccentColor,
	setColorsOpen,
}) => {
	const media = useContext(MediaContext)
	const [accentThemeLocal, setAccentThemeLocal] = useState([...accentTheme])
	const colorsWrapperRef = useRef()

	useEffect(() => {
		let localArr = [...accentTheme]
		accentTheme.forEach((ac, index) => {
			if (ac.color === accentColor) {
				for (let i = 0; i < index; i++) {
					localArr.push(localArr.shift())
				}
				setAccentThemeLocal(localArr)
			}
		})
	}, [accentColor])

	useEffect(() => {
		const clickHandler = (e) => {
			if (media.isMobile) {
				setColorsOpen(colorsWrapperRef.current.contains(e.target))
			}
		}
		window.addEventListener('click', clickHandler)
		return () => window.removeEventListener('click', clickHandler)
	}, [media, setColorsOpen])

	return (
		<ColorsWrapper ref={colorsWrapperRef}>
			{accentThemeLocal.map((ac, i) => (
				<WrapDiv
					key={ac.name}
					sn={i}
					onClick={() => toggleAccentColor(ac.name)}
				>
					<ColorDiv col={ac.color.dark} />
				</WrapDiv>
			))}
		</ColorsWrapper>
	)
}

export default AccentColorToggler
