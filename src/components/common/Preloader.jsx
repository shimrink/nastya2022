import React, { useContext, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import gsap from "gsap";
import { commonTheme } from "../../styles/theme";
import { AccentColorContext } from "../../AppWrap";

const Main = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	background-color: ${({theme}) => theme.bg};
	overflow: hidden;
	z-index: 2147483646;
`
const Svg = styled.svg`
	width: 109px;
	height: auto;
	fill: none;
`
const Preloader = ({ categoriesData, caseData, setAppInitialized }) => {

	const accentColor = useContext(AccentColorContext)

	const [arrInitialized, setArrInitialized] = useState(false)
	const mainRef = useRef()
	const darkColRef = useRef()

	useEffect(() => {
		let imgArr = []
		if (caseData && categoriesData) {
			for (let i = 0; i < caseData.length; i++) {
				imgArr.push(caseData[i].mainImage.asset.url)
				imgArr.push(caseData[i].mobileImage.asset.url)
			}
			setArrInitialized(true)
		}
		const imagesCount = imgArr.length
		const percent = 100 / imagesCount
		let progress = 0
		let loadedImg = 0

		const imgLoad = () => {
			progress += percent
			loadedImg++
			const darkCol = darkColRef.current.offset
			gsap.to(darkCol, {
				baseVal: progress / 100,
				duration: 1,
				ease: 'power3.inOut',
				delay: 0.2,
			})
			if (progress >= 100 || loadedImg === imagesCount) {
				setAppInitialized(true)
				setTimeout(() => {
					gsap.to(mainRef.current, {
						yPercent: -100,
						duration: 1,
						ease: 'power3.inOut',
						delay: commonTheme.durations.middle / 1000,
					})
				}, commonTheme.durations.short)
			}
		}
		if (arrInitialized) {
			if (imagesCount > 0) {
				for (let i = 0; i < imagesCount; i++) {
					let imgCopy = new Image();
					imgCopy.src = imgArr[i]
					imgCopy.onload = imgLoad
					imgCopy.onerror = imgLoad
				}
			} else {
				setAppInitialized(true)
			}
		}
	}, [setAppInitialized, caseData, categoriesData, arrInitialized])

	return <Main ref={mainRef}>
		<Svg viewBox="0 0 109 123" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="grad" x1="100%" x2="100%" y1="100%" y2="0">
					<stop ref={darkColRef} offset="1%" stopColor={accentColor.dark} />
					<stop offset="0%" stopColor={accentColor.light} />
				</linearGradient>
			</defs>
			<path fill="url(#grad)" d="M20.0969 110.188L54.5 32.6292L68.125 63.3792C68.125 77.6153 63.8672 88.9472 55.3516 97.375C46.8359 105.917 35.4818 110.188 21.2891 110.188H20.0969ZM109 123L54.5 0L0 123H21.2891C35.4818 123 47.0062 118.046 55.8625 108.137C64.6052 98.3431 69.4307 85.075 70.3391 68.3333L94.5234 123H109Z" />
		</Svg>
	</Main>
}

export default Preloader;