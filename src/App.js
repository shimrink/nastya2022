import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import sanityClient from './client';
import groq from 'groq';
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Services from "./components/Services";
import { useColorMode } from "./hooks/useColorMode";
import GlobalStyles from "./styles/global";
import { accentTheme, commonTheme, darkTheme, lightTheme } from "./styles/theme";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: ${ ({theme}) => theme.bg };
	color: ${ ({theme}) => theme.text };
	transition: background-color ${commonTheme.durations.short}ms;
`
export const AccentColorContext = React.createContext()
export const MediaContext = React.createContext()

const App = () => {

	const [theme, accentColor, accentColorToggler, themeToggler, mountedComponent] = useColorMode()

	const themeMode = theme === 'light' ? lightTheme : darkTheme

	const [endCol, setEndCol] = useState()
	const [media, setMedia] = useState('')
	const [caseData, setCaseData] = useState(null)
	const [categoriesData, setCategoriesData] = useState(null)

	useEffect(() => {
		switch (accentColor) {
			case 'blue':
				setEndCol(accentTheme[1].color)
				break
			case 'green':
				setEndCol(accentTheme[2].color)
				break
			case 'orange':
				setEndCol(accentTheme[3].color)
				break
			default:
				setEndCol(accentTheme[0].color)
				break
		}
	}, [accentColor])

	// const isTabletA = useMediaQuery('(max-width: 1279px) and (min-width: 1000px) and (orientation: landscape)')
	// const isTabletP = useMediaQuery('(max-width: 999px) and (min-width: 768px) and (orientation: portrait)')
	// const isMobile = useMediaQuery('(max-width: 767px) and (orientation: portrait)')
	// const media = isMobile ? 'mobile' : isTabletP ? 'tabletP' : isTabletA ? 'tabletA' : 'desk'

	const calcMedia = () => {
		if (window.innerWidth < commonTheme.media.mobile
		&& window.innerWidth / window.innerHeight < 1) {
			setMedia('mobile')
		} else if (window.innerWidth >= commonTheme.media.mobile
		&& window.innerWidth < commonTheme.media.tabletA
		&& window.innerWidth / window.innerHeight < 1) {
			setMedia('tabletP')
		} else if (window.innerWidth >= commonTheme.media.mobile
		&& window.innerWidth < commonTheme.media.tabletA
		&& window.innerWidth / window.innerHeight >= 1) {
			setMedia('tabletA')
		} else if (window.innerWidth >= commonTheme.media.tabletA
		&& window.innerWidth < commonTheme.media.desk
		&& window.innerWidth / window.innerHeight >= 1) {
			setMedia('desk')
		} else {
			setMedia('hugeDesk')
		}
	}

	useEffect(() => {
		calcMedia()
	}, [])

	useEffect(() => {
		window.addEventListener('resize', calcMedia)
		return () => window.removeEventListener('resize', calcMedia)
	})

	// Get data from Sanity
	useEffect(() => {
		sanityClient.fetch(
			groq`*[_type == "post"] | order(order) {
				title,
				slug,
				tags,
				order,
				isMainSlider,
				isPortfolio,
				year,
				mainImage {
					asset->{
						_id,
						url
					},
					alt
				},
				mobileImage {
					asset->{
						_id,
						url
					},
					alt
				},
				categories[]->
			}`
		)
		.then((data) => setCaseData(data))
		.catch(console.error)
	}, [])

	useEffect(() => {
		sanityClient.fetch(
			groq`*[_type == "category"] | order(order) {
				title,
			}`
		)
		.then((data) => setCategoriesData(data))
		.catch(console.error)
	}, [])

	if (!mountedComponent) return <div></div>
	return <BrowserRouter>
		<ThemeProvider theme={themeMode}>
		<AccentColorContext.Provider value={endCol}>
		<MediaContext.Provider value={media}>
			<GlobalStyles />
			<Wrapper>
				<Header toggleTheme={themeToggler} accentColorToggler={accentColorToggler} />
				<Routes>
					<Route path="/" element={<Home caseData={caseData} />} />
					<Route path="/portfolio" element={<Portfolio caseData={caseData} categoriesData={categoriesData} />} />
					<Route path="/about" element={<About />} />
					<Route path="/services" element={<Services />} />
					<Route path="/contacts" element={<Contacts />} />
				</Routes>
				<Footer />
			</Wrapper>
		</MediaContext.Provider>
		</AccentColorContext.Provider>
		</ThemeProvider>
	</BrowserRouter>
}

export default App;