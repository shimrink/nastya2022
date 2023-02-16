import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import gsap from 'gsap';
import { commonTheme } from "./styles/theme";
import { AccentColorContext } from './AppWrap';
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Footer from "./components/Footer/Footer";
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import Services from "./components/Services/Services";
import Preloader from './components/common/Preloader';
import Case from './cases/template/Case';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: ${ ({fullHeight}) => fullHeight ? '100%' : 'auto' };
	background-color: ${ ({theme}) => theme.bg };
	color: ${ ({theme}) => theme.text };
	transition: background-color ${commonTheme.durations.short}s;
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
	z-index: 2147000001;
	.topRound,
	.bottomRound {
		width: 120vw;
		height: 10%;
		background-color: ${ ({accentColor}) => accentColor.dark };
	}
	.topRound {
		border-radius: 50% / 100% 100% 0 0;
	}
	.bottomRound {
		border-radius: 50% / 0 0 100% 100%;
	}
	.mainShtora {
		width: 100%;
		height: 100%;
		background-color: ${ ({accentColor}) => accentColor.dark };
	}
`
const App = ({ themeToggler, accentColorToggler, caseData, categoriesData }) => {

	const accentColor = useContext(AccentColorContext)
	const navigate = useNavigate()
	const {pathname} = useLocation()
	const [appInitialized, setAppInitialized] = useState(false)
	const [showPreloader, setShowPreloader] = useState(true)
	const [topBlockH, setTopBlockH] = useState(0)
	const [aboutPageScroll, setAboutPageScroll] = useState(false)
	const topBlockRef = useRef()
	const shtoraRef = useRef()

	// Delete Preloader
	useEffect(() => {
		if (appInitialized) {
			setTimeout(() => {
				setShowPreloader(false)
			}, 6000)
		}
	}, [appInitialized])

	// Calculate TopBlock height
	useEffect(() => {
		if (pathname === '/portfolio' || pathname === '/about') {
			const calcTopBlockHeight = () => {
				setTopBlockH(topBlockRef.current.getBoundingClientRect().height)
			}
			window.addEventListener('resize', calcTopBlockHeight)

			return () => window.removeEventListener('resize', calcTopBlockHeight)
		}
	}, [pathname])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	const pageTransition = (e, path) => {
		if (pathname !== path) {
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
		}
	}

	return <Wrapper fullHeight={pathname === '/' || pathname === '/contacts'}>
		<Header isTopBlock={pathname === '/portfolio' || pathname === '/about'} aboutPageScroll={aboutPageScroll} topBlockH={topBlockH} pageTransition={pageTransition} themeToggler={themeToggler} accentColorToggler={accentColorToggler} />
		{showPreloader && <Preloader categoriesData={categoriesData} caseData={caseData} setAppInitialized={setAppInitialized} />}
		<Routes>
			{caseData.map((c, i) => <Route key={i} path={`/cases/${c.slug.current}`} element={<Case c={c} i={i} caseData={caseData} pageTransition={pageTransition} />} />)}
			<Route path="/portfolio" element={<Portfolio ref={topBlockRef} setTopBlockH={setTopBlockH} caseData={caseData} categoriesData={categoriesData} pageTransition={pageTransition} />} />
			<Route path="/about" element={<About ref={topBlockRef} setAboutPageScroll={setAboutPageScroll} topBlockH={topBlockH} setTopBlockH={setTopBlockH} pageTransition={pageTransition} />} />
			<Route path="/services" element={<Services />} />
			<Route path="/contacts" element={<Footer />} />
			<Route path="/" element={<Home caseData={caseData} pageTransition={pageTransition} />} />
		</Routes>
		{ (pathname === '/portfolio' ||
			pathname === '/services') && <Footer />
		}
		<Shtora ref={shtoraRef} accentColor={accentColor}>
			<div className='topRound' />
			<div className='mainShtora' />
			<div className='bottomRound' />
		</Shtora>
	</Wrapper>
}

export default App;