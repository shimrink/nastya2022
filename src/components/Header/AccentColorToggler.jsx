import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { accentTheme, commonTheme } from '../../styles/theme';

const Wrapper = styled.div`
	display: grid;
	align-items: center;
	justify-items: ${({m}) => m.isHugeDesk || m.isDesk ? 'start' : 'end'};
	padding: ${({m}) => m.isHugeDesk || m.isDesk ? 0 : 4}px;
`
const WrapDiv = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 1/2;
	width: ${({m, sn}) => (m.isHugeDesk || m.isDesk) && sn === 0 ? 20
								: (m.isHugeDesk || m.isDesk) && sn !== 0 ? 18
								: sn === 0 ? 24
								: 22}px;
	height: ${({m, sn}) => (m.isHugeDesk || m.isDesk) && sn === 0 ? 20
								: (m.isHugeDesk || m.isDesk) && sn !== 0 ? 18
								: sn === 0 ? 24
								: 22}px;
	padding: ${({m}) => m.isHugeDesk || m.isDesk ? 0 : 2}px;
	margin: ${({m, sn}) => sn === 0 ? 0
								: m.isHugeDesk || m.isDesk ? '0 0 0 1px'
								: '0 1px 0 0'};
	z-index: ${ ({sn}) => (accentTheme.length - sn) };
	transition: margin ${commonTheme.durations.short}s,
					width 0.1s,
					height 0.1s;
	${Wrapper}:hover && {
		width: ${({m}) => m.isHugeDesk || m.isDesk ? 20 : 24}px;
		height: ${({m}) => m.isHugeDesk || m.isDesk ? 20 : 24}px;
		margin: ${({m, sn}) => m.isHugeDesk || m.isDesk ? `0 0 0 ${sn * 24}px`
																		: `0 ${sn * 24}px 0 0`};
	}
`
const ColorDiv = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${ ({col}) => col };
	border: none;
	border-radius: 50%;
	cursor: pointer;
`
const AccentColorToggler = ({ accentColor, toggleAccentColor }) => {

	const media = useContext(MediaContext)
	const [accentThemeLocal, setAccentThemeLocal] = useState([...accentTheme])

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

	return <Wrapper m={media}>
		{accentThemeLocal.map((ac, i) => (
			<WrapDiv key={i} m={media} sn={i} onClick={ () => toggleAccentColor(ac.name) }>
				<ColorDiv col={ac.color.dark} />
			</WrapDiv>
		))}
	</Wrapper>
}

export default AccentColorToggler;