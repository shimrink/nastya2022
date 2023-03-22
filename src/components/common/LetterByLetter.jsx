import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';

const LinkWrap = styled.div`
	height: ${({wavy}) => wavy ? '1.2em' : 'auto'};
	overflow: hidden;
`
const Wave = styled.div`
	display: flex;
	font-family: ${ props => props.bottom ? props.bottomFont
									: props.topFont}, sans-serif;
	color: ${ props => props.navMobile || props.whiteCol ? commonTheme.colors.white
							: !props.navMobile && props.bottom ? props.theme.ac.dark
							: props.theme.mode.text};
	transition: color ${commonTheme.durations.short}s;
`
const Letter = styled.div`
	transform: translateY( ${ props => props.waveAnim ? -100
												: props.isMenuMobileOpen ? 0
												: !props.showAnimFinish ? 100
												: 0}%);
	transition-property: transform;
	transition-duration: ${commonTheme.durations.middle}s;
	transition-timing-function: ${commonTheme.easings.outPower3};
	transition-delay: ${({delay}) => delay * 30}ms;
`
const Letters = ({ child, waveAnim, showAnimFinish, isMenuMobileOpen }) => {
	return child.split('').map((l, i) => {
		if (l === ' ') {
			return <Letter key={i}
								isMenuMobileOpen={isMenuMobileOpen}
								delay={i}
								waveAnim={waveAnim}
								showAnimFinish={showAnimFinish}>&thinsp;&thinsp;</Letter>
		}
		return <Letter key={i}
							isMenuMobileOpen={isMenuMobileOpen}
							delay={i}
							waveAnim={waveAnim}
							showAnimFinish={showAnimFinish}>{l}</Letter>
	})
}

const LetterByLetter = ({
	children,
	wavy,
	disableWave,
	navMobile,
	showAnim,
	whiteCol,
	isMenuMobileOpen,
	active,
	hovering,
	topFont='AccentFontM',
	bottomFont='AccentFontB' }) => {

	const [waveAnim, setWaveAnim] = useState(false)
	const [selfHovering, setSelfHovering] = useState(false)
	const [upAnim, setUpAnim] = useState(false)
	const [downAnim, setDownAnim] = useState(false)
	const [endUpAnim, setEndUpAnim] = useState(false)
	const [mMOpen, setMMOpen] = useState(false)
	const LBLRef = useRef()
	const [showAnimFinish, setShowAnimFinish] = useState(!showAnim)

	let delay = commonTheme.durations.middle * 1000 + (children.split('').length - 2) * 30

	useEffect(() => {
		if (wavy && !disableWave) {
			if ((hovering || selfHovering) && !downAnim) {
				if (!upAnim) {
					setUpAnim(true)

					setTimeout(() => {
						setUpAnim(false)
						setEndUpAnim(true)
					}, delay)
				}

				if (endUpAnim) {
					setUpAnim(true)
				}

			} else {
				if (endUpAnim) {
					setEndUpAnim(false)
					setDownAnim(true)

					setTimeout(() => {
						setDownAnim(false)
					}, delay)
				}
			}
		}
	}, [wavy, disableWave, hovering, selfHovering, upAnim, downAnim, endUpAnim, delay])

	useEffect(() => {
		if (wavy) {
			upAnim && setWaveAnim(wavy)
			downAnim && setWaveAnim(false)
		}
	}, [wavy, upAnim, downAnim])

	useEffect(() => {
		if (navMobile) {
			setTimeout(() => {
				setMMOpen(isMenuMobileOpen)
			}, 450)
		}
	}, [navMobile, isMenuMobileOpen])

	const offset = (el) => {
		const rect = el.getBoundingClientRect()
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	const textAnimate = useCallback(() => {
		if (showAnim) {
			const animItem = LBLRef.current
			const animItemHeight = animItem.offsetHeight
			const animItemOffset = offset(animItem).top
			const animStart = 4 // the animation will work when (1/animStart) of the element height enters the viewport

			let animItemPoint = window.innerHeight - animItemHeight / animStart
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart
			}

			if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
				setShowAnimFinish(true)
			}
		}
	}, [showAnim])

	useEffect(() => {
		window.addEventListener('scroll', textAnimate)

		return () => window.removeEventListener('scroll', textAnimate)
	}, [textAnimate])

	useEffect(() => {
		setTimeout(() => {
			textAnimate()
		}, 700)
	}, [textAnimate])

	return <LinkWrap ref={LBLRef} wavy={wavy} onMouseOver={ () => setSelfHovering(true) } onMouseOut={ () => setSelfHovering(false) }>
		<Wave navMobile={navMobile} whiteCol={whiteCol} topFont={topFont} bottomFont={bottomFont}>
			<Letters child={children} waveAnim={waveAnim || active} showAnimFinish={showAnimFinish} isMenuMobileOpen={mMOpen} />
		</Wave>
		{wavy && <Wave bottom navMobile={navMobile} whiteCol={whiteCol} topFont={topFont} bottomFont={bottomFont}>
			<Letters child={children} waveAnim={waveAnim || active} showAnimFinish={showAnimFinish} isMenuMobileOpen={mMOpen} />
		</Wave>}
	</LinkWrap>
}

export default LetterByLetter;