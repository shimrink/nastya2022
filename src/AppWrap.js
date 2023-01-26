import React, { useEffect, useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import sanityClient from './client';
import groq from 'groq';
import { useColorMode } from "./hooks/useColorMode";
import GlobalStyles from "./styles/global";
import { accentTheme, commonTheme, darkTheme, lightTheme } from "./styles/theme";
import App from './App';

export const AccentColorContext = React.createContext()
export const MediaContext = React.createContext()

const AppWrap = () => {

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

	if (!mountedComponent) return null
	return <BrowserRouter>
		<ThemeProvider theme={themeMode}>
			<AccentColorContext.Provider value={endCol}>
			<MediaContext.Provider value={media}>
				<GlobalStyles />
				<App themeToggler={themeToggler}
					accentColorToggler={accentColorToggler}
					caseData={caseData}
					categoriesData={categoriesData} />
			</MediaContext.Provider>
			</AccentColorContext.Provider>
		</ThemeProvider>
	</BrowserRouter>
}

export default AppWrap;