import React, { Suspense, useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import gsap from 'gsap';
import { MediaContext } from './AppWrap';
import { commonTheme } from "./styles/theme";
// import { Gradient } from 'https://gist.githack.com/jordienr/64bcf75f8b08641f205bd6a1a0d4ce1d/raw/35a5c7c1ddc9f97ec84fe7e1ab388a3b726db85d/Gradient.js';
import Preloader from './components/common/Preloader';
import Case from './cases/template/Case';
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Services from "./components/Services/Services";
import Contacts from './components/Contacts/Contacts';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: ${ ({fullHeight}) => fullHeight ? '100%' : 'auto' };
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
		--gradient-color-4: ${ ({theme}) => theme.mode.bg === '#FFF' ? theme.ac.gradLight : theme.ac.gradDark };
	}
`
const Shtora = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	height: 120%;
	border-radius: 50% / 0 0 100% 100%;
	transform: translateY(100%);
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
const App = ({ themeMode, accentColor, themeToggler, accentColorToggler, caseData, categoriesData, servicesData }) => {

	const media = useContext(MediaContext)
	const navigate = useNavigate()
	const {pathname} = useLocation()
	const [appInitialized, setAppInitialized] = useState(false)
	const [pageInitialized, setPageInitialized] = useState(true)
	const [showPreloader, setShowPreloader] = useState(true)
	const [navDisable, setNavDisable] = useState(false)
	const shtoraRef = useRef()
	const wrapperRef = useRef()

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

			gsap.to(shtoraRef.current, {
				yPercent: -110,
				duration: commonTheme.durations.middle,
				ease: 'power3.in'
			})

			setTimeout(() => { navigate(path) }, 600)
		}
	}

	useEffect(() => {
		if (pageInitialized) {
			const tl = gsap.timeline()
			tl.to(shtoraRef.current, {
				yPercent: -200,
				duration: commonTheme.durations.middle,
				ease: 'power3.out',
				delay: 0.3
			})
			tl.to(shtoraRef.current, {
				yPercent: 0,
				duration: 0,
				ease: 'linear'
			})
			setNavDisable(false)
		}
	}, [pageInitialized])

	// useEffect(() => {
	// 	const gradient = new Gradient()
	// 	gradient.initGradient('#gradient-canvas')
	// }, [pathname, themeMode, accentColor, media])

	return <Wrapper ref={wrapperRef} fullHeight={pathname === '/' || pathname === '/contacts'}>
		{/* <canvas id='gradient-canvas' data-transition-in width={media.isHugeDesk || media.isDesk ? 1920 : 1280} height={media.isHugeDesk || media.isDesk ? 960 : 600} /> */}
		<Header pageInitialized={pageInitialized} setPageInitialized={setPageInitialized} pageTransition={pageTransition} accentColor={accentColor} themeToggler={themeToggler} accentColorToggler={accentColorToggler} />
		{showPreloader && <Preloader categoriesData={categoriesData} caseData={caseData} setAppInitialized={setAppInitialized} accentColor={accentColor} />}
		<Suspense fallback={null}>
			<Routes>
				{caseData.map((c, i) => <Route key={i} path={`/cases/${c.slug.current}`} element={<Case setPageInitialized={setPageInitialized} c={c} i={i} caseData={caseData} pageTransition={pageTransition} />} />)}
				<Route path="/portfolio" element={<Portfolio setPageInitialized={setPageInitialized} caseData={caseData} categoriesData={categoriesData} pageTransition={pageTransition} />} />
				<Route path="/about" element={<About setPageInitialized={setPageInitialized} pageTransition={pageTransition} />} />
				<Route path="/services" element={<Services setPageInitialized={setPageInitialized} servicesData={servicesData} />} />
				<Route path="/contacts" element={<Contacts setPageInitialized={setPageInitialized} />} />
				<Route path="/" element={<Home setPageInitialized={setPageInitialized} caseData={caseData} pageTransition={pageTransition} />} />
			</Routes>
		</Suspense>
		<Shtora ref={shtoraRef}>
			<div className='topRound' />
			<div className='mainShtora' />
			<div className='bottomRound' />
		</Shtora>
	</Wrapper>
}

export default App;