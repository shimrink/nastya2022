import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import gsap from 'gsap';
import { MediaContext } from './AppWrap';
import { commonTheme } from "./styles/theme";
// import { Gradient } from 'https://gist.githack.com/jordienr/64bcf75f8b08641f205bd6a1a0d4ce1d/raw/35a5c7c1ddc9f97ec84fe7e1ab388a3b726db85d/Gradient.js';
import About from "./components/About/About";
import Case from './cases/template/Case';
import Footer from "./components/Footer/Footer";
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import Portfolio from "./components/Portfolio/Portfolio";
import Preloader from './components/common/Preloader';
import Services from "./components/Services/Services";

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
	z-index: 5;
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
const App = ({ themeMode, accentColor, themeToggler, accentColorToggler, caseData, categoriesData }) => {

	const media = useContext(MediaContext)
	const navigate = useNavigate()
	const {pathname} = useLocation()
	const [appInitialized, setAppInitialized] = useState(false)
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

	const pageTransition = (e, path) => {
		if (pathname !== path && !navDisable) {
			setNavDisable(true)
			e.preventDefault()
			const tl = gsap.timeline()
			tl.to(shtoraRef.current, {
				yPercent: -110,
				duration: 0.2,
				ease: 'linear'
			})
			setTimeout(() => { navigate(path) }, 300)
			tl.to(shtoraRef.current, {
				yPercent: -200,
				duration: 0.2,
				ease: 'linear',
				delay: 0.3
			})
			tl.to(shtoraRef.current, {
				yPercent: 0,
				duration: 0,
				ease: 'linear'
			})
			setTimeout(() => { setNavDisable(false) }, 700)
		}
	}

	// useEffect(() => {
	// 	const gradient = new Gradient()
	// 	gradient.initGradient('#gradient-canvas')
	// }, [themeMode, accentColor])

	return <Wrapper ref={wrapperRef} fullHeight={pathname === '/' || pathname === '/contacts'}>
		{/* <canvas id='gradient-canvas' data-transition-in width={media.isHugeDesk || media.isDesk ? 1920 : 1280} height={media.isHugeDesk || media.isDesk ? 960 : 600} /> */}
		<Header pageTransition={pageTransition} accentColor={accentColor} themeToggler={themeToggler} accentColorToggler={accentColorToggler} />
		{showPreloader && <Preloader categoriesData={categoriesData} caseData={caseData} setAppInitialized={setAppInitialized} accentColor={accentColor} />}
		<Routes>
			{caseData.map((c, i) => <Route key={i} path={`/cases/${c.slug.current}`} element={<Case c={c} i={i} caseData={caseData} pageTransition={pageTransition} />} />)}
			<Route path="/portfolio" element={<Portfolio caseData={caseData} categoriesData={categoriesData} pageTransition={pageTransition} />} />
			<Route path="/about" element={<About pageTransition={pageTransition} />} />
			<Route path="/services" element={<Services />} />
			<Route path="/contacts" element={<Footer />} />
			<Route path="/" element={<Home caseData={caseData} pageTransition={pageTransition} />} />
		</Routes>
		<Shtora ref={shtoraRef}>
			<div className='topRound' />
			<div className='mainShtora' />
			<div className='bottomRound' />
		</Shtora>
	</Wrapper>
}

export default App;