import React, { useContext, useEffect, useRef } from "react";
import styled from 'styled-components';
import gsap from "gsap";
import { MediaContext } from "../../AppWrap";
import { commonTheme } from "../../styles/theme";

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
const Preloader = ({ pageInitialized, setAppInitialized, accentColor }) => {

	const media = useContext(MediaContext)
	// const [arrInitialized, setArrInitialized] = useState(false)
	const mainRef = useRef()
	const darkColRef = useRef()

	// Set the loading value by 1%
	useEffect(() => {
		document.querySelector('body').style.overflowY = 'hidden'
		gsap.to(darkColRef.current.offset, {
			baseVal: 0.01,
			duration: commonTheme.durations.long,
			ease: 'power3.inOut',
			delay: commonTheme.durations.short,
		})
	}, [])

	useEffect(() => {
		if (pageInitialized) {
			const tl = gsap.timeline()
			tl.to(darkColRef.current.offset, {
				baseVal: 1,
				duration: commonTheme.durations.long,
				ease: 'power3.inOut',
				delay: 0.2,
			})
			tl.to(mainRef.current, {
				opacity: 0,
				duration: 1.5,
				ease: 'power3.inOut',
				delay: commonTheme.durations.short,
			})
			tl.to(mainRef.current, {
				yPercent: -100,
				duration: 0,
			})
			document.querySelector('body').style.overflowY = 'visible'
			setAppInitialized(true)
		}
	}, [pageInitialized, setAppInitialized])

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