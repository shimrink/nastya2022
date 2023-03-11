import React, { useContext, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import gsap from "gsap";
import { MediaContext } from "../../AppWrap";
import { commonTheme } from "../../styles/theme";
import aboutCover from '../../assets/images/aboutCover.webp';
import aboutIA from '../../assets/images/aboutInfoAlbum.webp';
import aboutIP from '../../assets/images/aboutInfoPortrait.webp';
import cats from '../../assets/images/Cats.webp';
import colors from '../../assets/images/Colors.webp';
import games from '../../assets/images/Games.webp';
import neyro from '../../assets/images/Neyro.webp';
import footerCover from '../../assets/images/footerCover.webp';

const Main = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100%;
	background-color: ${ ({theme}) => theme.mode.bg };
	overflow: hidden;
	z-index: 9;
`
const Svg = styled.svg`
	width: ${({m}) => m.isHugeDesk ? 85 : m.isDesk ? 71 : 55}px;
	height: auto;
	fill: none;
`
const Preloader = ({ categoriesData, caseData, setAppInitialized, accentColor }) => {

	const media = useContext(MediaContext)
	const [arrInitialized, setArrInitialized] = useState(false)
	const mainRef = useRef()
	const darkColRef = useRef()

	// Set the loading value by 1%
	useEffect(() => {
		gsap.to(darkColRef.current.offset, {
			baseVal: 0.01,
			duration: 1,
			ease: 'power3.inOut',
			delay: commonTheme.durations.short,
		})
	}, [])

	useEffect(() => {
		document.querySelector('body').style.overflowY = 'hidden'

		// Fill in the array with images URLs from Sanity + local
		let imgArr = []
		if (caseData && categoriesData) {
			for (let i = 0; i < caseData.length; i++) {
				if (media.isHugeDesk || media.isDesk) {
					imgArr.push(caseData[i].mainImage.asset.url)
				}
				imgArr.push(caseData[i].mobileImage.asset.url)
			}
			imgArr.push(aboutCover)
			imgArr.push(aboutIA)
			imgArr.push(aboutIP)
			imgArr.push(cats)
			imgArr.push(colors)
			imgArr.push(games)
			imgArr.push(neyro)
			imgArr.push(footerCover)
			setArrInitialized(true)
		}

		const imagesCount = imgArr.length
		const percent = 100 / imagesCount
		let progress = 0
		let loadedImg = 0

		// This function triggers every time when created phantom of the image
		const imgLoad = () => {
			progress += percent
			loadedImg++
			// Increase the loading value by percent value
			gsap.to(darkColRef.current.offset, {
				baseVal: progress / 100,
				duration: commonTheme.durations.long,
				ease: 'power3.inOut',
				delay: 0.2,
			})
			if (progress >= 100 || loadedImg === imagesCount) {
				const tl = gsap.timeline()
				tl.to(mainRef.current, {
					opacity: 0,
					duration: commonTheme.durations.long,
					ease: 'power3.inOut',
					delay: 1.5,
				})
				tl.to(mainRef.current, {
					yPercent: -100,
					duration: 0,
					ease: 'linear',
				})
				document.querySelector('body').style.overflowY = 'visible'
				setAppInitialized(true)
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
	}, [media, setAppInitialized, caseData, categoriesData, arrInitialized])

	return <Main ref={mainRef}>
		<Svg m={media} viewBox="0 0 85 93" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="grad" x1="100%" x2="100%" y1="100%" y2="0">
					<stop ref={darkColRef} offset="0%" stopColor={accentColor.dark} />
					<stop offset="0%" stopColor={accentColor.light} />
				</linearGradient>
			</defs>
			<path fillRule="evenodd" clipRule="evenodd" fill="url(#grad)" d="M34.6248 0L0 93L17.421 93C29.035 93 40.4685 88.1118 46.5575 82.978C52.6466 77.8442 57.0408 71.7947 58.6286 61.5648L69.3798 93H85L50.1148 0H34.6248ZM54.5212 49.1877L42.4349 13.2671H42.1746L19.2787 81.0546C29.1788 80.6904 39.1964 77.5974 44.5671 71.2977C49.9379 64.998 53.3588 57.5819 54.5212 49.1877Z" />
		</Svg>
	</Main>
}

export default Preloader;