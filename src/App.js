import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from 'framer-motion';
import { commonTheme } from "./styles/theme";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer/Footer";
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import Services from "./components/Services";
import Preloader from './components/common/Preloader';
import MenuMobile from './components/Header/MenuMobile';
import Case from './cases/Case';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: ${ ({isMainPage}) => isMainPage ? '100%' : 'auto' };
	background-color: ${ ({theme}) => theme.bg };
	color: ${ ({theme}) => theme.text };
	transition: background-color ${commonTheme.durations.short}ms;
`
const App = ({ themeToggler, accentColorToggler, caseData, categoriesData }) => {

	const location = useLocation()
	const {pathname} = useLocation()

	const [appInitialized, setAppInitialized] = useState(false)
	const [showPreloader, setShowPreloader] = useState(true)
	const [topBlockH, setTopBlockH] = useState(0)
	const topBlockRef = useRef()
	const menuMobileRef = useRef()

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
		if (pathname !== '/') {
			const calcTopBlockHeight = () => {
				setTopBlockH(topBlockRef.current.getBoundingClientRect().height)
			}
			window.addEventListener('resize', calcTopBlockHeight)

			return () => window.removeEventListener('resize', calcTopBlockHeight)
		}
	}, [pathname])

	return <Wrapper isMainPage={pathname === '/'}>
		<Header isMainPage={pathname === '/'} themeToggler={themeToggler} accentColorToggler={accentColorToggler} topBlockH={topBlockH} menuMobileRef={menuMobileRef} />
		<MenuMobile ref={menuMobileRef} />
		{showPreloader && <Preloader categoriesData={categoriesData} caseData={caseData} setAppInitialized={setAppInitialized} />}
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				{caseData.map((c, i) => <Route key={i} c={c} path={`/cases/${c.slug.current}`} element={<Case />} />)}
				<Route path="/portfolio" element={<Portfolio ref={topBlockRef} setTopBlockH={setTopBlockH} caseData={caseData} categoriesData={categoriesData} />} />
				<Route path="/about" element={<About ref={topBlockRef} setTopBlockH={setTopBlockH} />} />
				<Route path="/services" element={<Services />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/" element={<Home caseData={caseData} />} />
			</Routes>
			{pathname !== '/' && <Footer />}
		</AnimatePresence>
	</Wrapper>
}

export default App;