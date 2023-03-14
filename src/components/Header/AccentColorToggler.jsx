import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { accentTheme, commonTheme } from '../../styles/theme';

const Wrapper = styled.div`
	display: grid;
	align-items: center;
	justify-items: ${({m}) => m.isHugeDesk || m.isDesk ? 'start' : 'end'};
	padding: ${({m}) => m.isHugeDesk || m.isDesk ? 0 : 6}px;
`
const ColorDiv = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 1/2;
	background-color: ${ ({col}) => col };
	border: none;
	border-radius: 50%;
	width: ${({sn}) => sn === 0 ? 20 : 18}px;
	height: ${({sn}) => sn === 0 ? 20 : 18}px;
	margin: ${({sn, m}) => sn === 0 ? 0
								: m.isHugeDesk || m.isDesk ? '0 0 0 1px'
								: '0 1px 0 0'};
	cursor: pointer;
	z-index: ${ ({sn}) => (accentTheme.length - sn) };
	transition: margin ${commonTheme.durations.short}s,
					width 0.1s,
					height 0.1s;
	${Wrapper}:hover && {
		width: 20px;
		height: 20px;
		margin: ${({sn, m}) => m.isHugeDesk || m.isDesk ? `0 0 0 ${sn * 24}px`
																		: `0 ${sn * 24}px 0 0`};
	}
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
			<ColorDiv onClick={ () => toggleAccentColor(ac.name) }
						col={ac.color.dark}
						sn={i}
						m={media}
						key={i} />
		))}
	</Wrapper>
}

export default AccentColorToggler;