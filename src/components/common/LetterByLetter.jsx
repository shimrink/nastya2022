import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';

const LinkWrap = styled.div`
	height: ${({wavy}) => wavy ? '1.2em' : 'auto'};
	overflow: hidden;
`
const Wave = styled.div`
	display: flex;
	font-family: ${({bottom, titleSize, pageName}) => pageName ? 'AccentFontR'
																	: !titleSize && bottom ? 'AccentFontB'
																	: titleSize && !bottom ? 'AccentFontT'
																	: 'AccentFontM'}, sans-serif;
	color: ${({theme, bottom, mobile, pageName}) => mobile || pageName ? commonTheme.colors.primary
																: !mobile && bottom ? theme.ac.dark
																: theme.mode.text };
	transition: color ${commonTheme.durations.short}s;
`
const Letter = styled.div`
	transform: translateY(${({waveAnim, showAnim, isMenuMobileOpen}) => waveAnim ? -100
																							: isMenuMobileOpen ? 0
																							: showAnim ? 100
																							: 0}%);
	transition: transform ${commonTheme.durations.short}s ${({delay}) => delay * 30}ms;
`
const Letters = ({ child, waveAnim, showAnim, isMenuMobileOpen }) => {

	const letterRef = useRef()

	return child.split('').map((l, i) => {
		if (l === ' ') return <Letter key={i}
												isMenuMobileOpen={isMenuMobileOpen}
												className={showAnim ? 'animItems' : ''}
												delay={i}
												waveAnim={waveAnim}
												showAnim={showAnim}>&nbsp;</Letter>
		return <Letter key={i}
							ref={letterRef}
							isMenuMobileOpen={isMenuMobileOpen}
							className={showAnim ? 'animItems' : ''}
							delay={i}
							waveAnim={waveAnim}
							showAnim={showAnim}>{l}</Letter>
	})
}

const LetterByLetter = ({ children, wavy, mobile, showAnim, titleSize, pageName, isMenuMobileOpen, active }) => {

	const [waveAnim, setWaveAnim] = useState(false)
	const [mMOpen, setMMOpen] = useState(false)

	const mouseEnterHandler = e => {
		setWaveAnim(wavy)
	}

	const mouseLeaveHandler = e => {
		setWaveAnim(false)
	}

	useEffect(() => {
		setTimeout(() => {
			setMMOpen(isMenuMobileOpen)
		}, 300)
	}, [isMenuMobileOpen])

	return <LinkWrap wavy={wavy} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
		<Wave mobile={mobile} titleSize={titleSize} showAnim={showAnim} pageName={pageName}>
			<Letters child={children} waveAnim={waveAnim || active} showAnim={showAnim} isMenuMobileOpen={mMOpen} />
		</Wave>
		{wavy && <Wave bottom mobile={mobile} titleSize={titleSize}>
			<Letters child={children} waveAnim={waveAnim || active} isMenuMobileOpen={mMOpen} />
		</Wave>}
	</LinkWrap>
}

export default LetterByLetter;