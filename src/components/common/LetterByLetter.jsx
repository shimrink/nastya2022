import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AccentColorContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';

const LinkWrap = styled.div`
	height: 1.2em;
	overflow: hidden;
`
const Wave = styled.div`
	display: flex;
	font-family: ${ ({bottom, titleItem}) => titleItem && bottom ? 'AccentFontM'
														: !titleItem && bottom ? 'AccentFontB'
														: titleItem && !bottom ? 'AccentFontT'
														: 'AccentFontM'}, sans-serif;
	color: ${ ({ac, bottom}) => bottom ? ac.dark : commonTheme.colors.quaternary };
`
const Letter = styled.div`
	transform: translateY(${({waveAnim}) => waveAnim ? -100 : 0}%);
	transition: transform ${commonTheme.durations.short}s ${({delay}) => delay * 30}ms;
`
const Letters = ({ child, waveAnim }) => {
	return child.split('').map((l, i) => {
		if (l === ' ') return <Letter key={i} delay={i} waveAnim={waveAnim}>&nbsp;</Letter>
		return <Letter key={i} delay={i} waveAnim={waveAnim}>{l}</Letter>
	})
}

const LetterByLetter = ({ children, titleItem, active }) => {

	const accentColor = useContext(AccentColorContext)
	const [waveAnim, setWaveAnim] = useState(false)

	const mouseEnterHandler = e => {
		setWaveAnim(true)
	}

	const mouseLeaveHandler = e => {
		setWaveAnim(false)
	}

	return <LinkWrap onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
		<Wave titleItem={titleItem} ac={accentColor}>
			<Letters child={children} waveAnim={waveAnim || active} />
		</Wave>
		<Wave bottom titleItem={titleItem} ac={accentColor}>
			<Letters child={children} waveAnim={waveAnim || active} />
		</Wave>
	</LinkWrap>
}

export default LetterByLetter;