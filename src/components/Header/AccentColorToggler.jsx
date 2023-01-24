import React, { useContext } from 'react'
import styled from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import { accentTheme, commonTheme } from '../../styles/theme';

const Wrapper = styled.div`
	display: grid;
	justify-items: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 'start' : 'end' };
	padding: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 0 : 6 }px;
`
const Button = styled.button`
	grid-row: 1/2;
	grid-column: 1/2;
	background-color: ${ ({col}) => col };
	border: none;
	border-radius: 50%;
	height: 20px;
	width: 20px;
	transition: margin ${commonTheme.durations.short}ms;
	cursor: pointer;
	z-index: ${ ({sn}) => (accentTheme.length - sn) };
	${Wrapper}:hover && {
		margin: ${ ({sn, media}) => media === 'hugeDesk' || media === 'desk' ? '0 0 0 ' + sn * 24 + 'px' : '0 ' + sn * 24 + 'px 0 0' };
	}
`
const AccentColorToggler = ({ toggleAccentColor }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	const accentThemeLocal = [...accentTheme]
	accentTheme.map( (ac, index) => {
		if (ac.color.dark === accentColor.dark) {
			for (let i = 0; i < index; i++) {
				accentThemeLocal.push(accentThemeLocal.shift())
			}
		}
		return null
	})

	return <Wrapper media={media}>
		{accentThemeLocal.map((ac, index) =>
			<Button onClick={ () => toggleAccentColor(ac.name) }
						col={ac.color.dark}
						sn={index}
						media={media}
						key={index} />
		)}
	</Wrapper>
}

export default AccentColorToggler;