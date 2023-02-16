import React, { useState } from 'react'
import styled from 'styled-components';
import { accentTheme, commonTheme } from '../styles/theme';

const Wrapper = styled.div`
	width: 20px;
	height: 20px;
	transition: width ${commonTheme.durations.short}s;
	:hover {
		width: ${24 * accentTheme.length - 4}px;
		transition: width 0s;
	}
`
const Button = styled.button`
	position: absolute;
	background-color: ${ ({col}) => col };
	border: none;
	border-radius: 50%;
	height: 20px;
	width: 20px;
	transform: translateX(0);
	transition: transform ${commonTheme.durations.short}s;
	cursor: pointer;
	z-index: ${ ({sn}) => (accentTheme.length - sn) };
	${Wrapper}:hover && {
		transform: translateX(${ ({sn}) => sn * 24 }px);
	}
`
const HiddenButton = styled.div`
	transform: translateX(${ ({hiddenButton}) =>
		hiddenButton ? 24 * accentTheme.length : 0}px);
`
const AccentColors = ({ toggleAccentColor, hiddenButton }) => {

	// const media = useContext(MediaContext)
	// const accentColor = useContext(AccentColorContext)

	let num = -1
	const [currentNum, setCurrentNum] = useState(0)

	// const moveCirles = () => {
	// 	console.log('hi')
	// }

	return <HiddenButton hiddenButton={hiddenButton}>
		{accentTheme.map( (ac, index) => {
			if (index >= currentNum) {
				num++
				return <Button onClick={ () => {
										toggleAccentColor(ac.name)
										setCurrentNum(num)
									}}
									col={ac.color}
									sn={num}
									key={index} />
			}
			if (index === accentTheme.length) {
				return accentTheme.map( (ac, index) => {
					if (index < currentNum) {
						num++
						return <Button onClick={ () => {
												toggleAccentColor(ac.name)
												setCurrentNum(num)
											}}
											col={ac.color}
											sn={num}
											key={index} />
					}
					return null
				})
			}
			return null
		})}
	</HiddenButton>
}

const AccentColorTogglerOld = ({ toggleAccentColor, accentColor }) => {
	return <Wrapper>
		<AccentColors toggleAccentColor={toggleAccentColor} accentColor={accentColor} />
		<AccentColors toggleAccentColor={toggleAccentColor} accentColor={accentColor} hiddenButton />
	</Wrapper>
}

export default AccentColorTogglerOld;