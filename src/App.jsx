import React, { lazy, Suspense, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import gsap from 'gsap';
import { MediaContext } from './AppWrap';
import { commonTheme } from "./styles/theme";
import { Gradient } from './shaders/Gradient';
import Preloader from './components/common/Preloader';
import Case from './cases/template/Case';
import Header from './components/Header/Header';
import Home from "./components/Home/Home";

const About = lazy( () => import("./components/About/About") )
const Portfolio = lazy( () => import("./components/Portfolio/Portfolio") )
const Services = lazy( () => import("./components/Services/Services") )
const Contacts = lazy( () => import("./components/Contacts/Contacts") )

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: ${ ({fullHeight}) => fullHeight ? '100%' : 'auto' };
	overflow-x: hidden;
	color: ${ ({theme}) => theme.mode.text };
	background-color: ${ ({theme}) => theme.mode.bg };
	transition: color ${commonTheme.durations.short}s;
	#gradient-canvas {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 1;
		--gradient-color-1: ${ ({theme}) => theme.mode.bg };
		--gradient-color-2: ${ ({theme}) => theme.mode.bg };
		--gradient-color-3: ${ ({theme}) => theme.mode.bg };
		--gradient-color-4: ${ ({theme}) => theme.mode.bg === commonTheme.colors.white ? theme.ac.gradLight : theme.ac.gradDark };
	}
`
const Curtain = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	height: 120%;
	border-radius: 50% / 0 0 100% 100%;
	z-index: 8;
	.topRound,
	.bottomRound {
		width: 120vw;
		height: 10%;
		background-color: ${ ({theme}) => theme.ac.dark };
	}
	.topRound {
		border-radius: 50% / 100% 100% 0 0;
		margin-bottom: -4px;
	}
	.bottomRound {
		border-radius: 50% / 0 0 100% 100%;
		margin-top: -4px;
	}
	.mainShtora {
		width: 100%;
		height: 100%;
		background-color: ${ ({theme}) => theme.ac.dark };
	}
`
const gradient = new Gradient()

const App = ({ themeMode, accentColor, themeToggler, accentColorToggler, caseData, categoriesData, servicesData }) => {

	const media = useContext(MediaContext)
	const navigate = useNavigate()
	const {pathname} = useLocation()
	const [appInitialized, setAppInitialized] = useState(false)
	const [pageInitialized, setPageInitialized] = useState(false)
	const [showPreloader, setShowPreloader] = useState(true)
	const [navDisable, setNavDisable] = useState(false)
	const curtainRef = useRef()

	const offset = (el) => {
		const rect = el.getBoundingClientRect()
		const scrollLeft = window.scrollX || document.documentElement.scrollLeft
		const scrollTop = window.scrollY || document.documentElement.scrollTop
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	const textAnimate = useCallback((val) => {
		const animItems = document.querySelectorAll('.animItems')

		if (animItems.length > 0) {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index]
				const animItemHeight = animItem.offsetHeight
				const animItemOffset = offset(animItem).top
				const animStart = 4 // the animation will work when (1/animStart) of the element height enters the viewport

				let animItemPoint = window.innerHeight - val - animItemHeight / animStart
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - val - window.innerHeight / animStart
				}

				if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
					animItem.style.transform = 'translate(0)'
					animItem.style.opacity = '1'
				} else {
					if (animItem.classList.contains('reAnim')) {
						animItem.style.opacity = '0'
					}
				}
			}
		}
	}, [])

	useEffect(() => {
		const scrollHandler = e => { textAnimate(50) }
		window.addEventListener('scroll', scrollHandler)

		return () => window.removeEventListener('scroll', scrollHandler)
	}, [textAnimate])

	// auto animation on new page
	useEffect(() => {
		setTimeout(() => { textAnimate(0) }, 600)
	}, [textAnimate, pageInitialized])

	// Delete Preloader
	useEffect(() => {
		if (appInitialized) {
			setTimeout(() => {
				setShowPreloader(false)
			}, 6000)
		}
	}, [appInitialized])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	const pageTransition = path => {
		if (pathname !== path && !navDisable) {
			setPageInitialized(false)
			setNavDisable(true)
			curtainRef.current.style.display = 'flex'

			const tl = gsap.timeline()
			tl.to(curtainRef.current, {
				yPercent: 100,
				duration: 0,
			})
			tl.to(curtainRef.current, {
				yPercent: -10,
				duration: commonTheme.durations.middle,
				ease: 'power3.in',
			})

			setTimeout(() => { navigate(path) }, 600)
		}
	}

	useEffect(() => {
		if (pageInitialized) {
			gsap.to(curtainRef.current, {
				yPercent: -100,
				duration: commonTheme.durations.middle,
				ease: 'power3.out',
				delay: commonTheme.durations.short,
			})

			setTimeout(() => {
				curtainRef.current.style.display = 'none'
				setNavDisable(false)
			}, 900)
		}
	}, [pageInitialized])

	useEffect(() => {
		gradient.initGradient('#gradient-canvas')
	}, [pathname, themeMode, accentColor, media])

	return <Wrapper fullHeight={pathname === '/' || pathname === '/contacts'}>
		<canvas id='gradient-canvas' data-transition-in width={media.isHugeDesk || media.isDesk ? 1920 : 1280} height={media.isHugeDesk || media.isDesk ? 960 : 600} />
		<Header pageInitialized={pageInitialized} setPageInitialized={setPageInitialized} pageTransition={pageTransition} accentColor={accentColor} themeToggler={themeToggler} accentColorToggler={accentColorToggler} />
		{showPreloader && <Preloader pageInitialized={pageInitialized} setAppInitialized={setAppInitialized} accentColor={accentColor} />}
		<Suspense fallback={null}>
			<Routes>
				{caseData.map((c, i) => <Route key={i} path={`/cases/${c.slug.current}`} element={<Case setPageInitialized={setPageInitialized} c={c} i={i} caseData={caseData} pageTransition={pageTransition} />} />)}
				<Route path="/portfolio" element={<Portfolio setPageInitialized={setPageInitialized} accentColor={accentColor} caseData={caseData} categoriesData={categoriesData} pageTransition={pageTransition} />} />
				<Route path="/about" element={<About setPageInitialized={setPageInitialized} pageTransition={pageTransition} />} />
				<Route path="/services" element={<Services setPageInitialized={setPageInitialized} servicesData={servicesData} />} />
				<Route path="/contacts" element={<Contacts setPageInitialized={setPageInitialized} />} />
				<Route path="/" element={<Home setPageInitialized={setPageInitialized} caseData={caseData} pageTransition={pageTransition} />} />
			</Routes>
		</Suspense>
		<Curtain ref={curtainRef}>
			<div className='topRound' />
			<div className='mainShtora' />
			<div className='bottomRound' />
		</Curtain>
	</Wrapper>
}

export default App;