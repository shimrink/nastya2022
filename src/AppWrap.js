import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import sanityClient from './client'
import groq from 'groq'
import { CookiesProvider } from 'react-cookie'
import { ThemeProvider } from 'styled-components'
import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'
import { useColorMode } from './hooks/useColorMode'
import GlobalStyles from './styles/global'
import { accentTheme, darkTheme, lightTheme } from './styles/theme'
import App from './App'
import Cookie from './components/common/Cookie'

export const MediaContext = React.createContext()

const AppWrap = () => {
	const [
		theme,
		accentColor,
		accentColorToggler,
		themeToggler,
		mountedComponent,
	] = useColorMode()

	const themeMode = theme === 'light' ? lightTheme : darkTheme

	const [endCol, setEndCol] = useState()
	const [media, setMedia] = useState({})
	const [caseData, setCaseData] = useState(null)
	const [categoriesData, setCategoriesData] = useState(null)
	const [servicesData, setServicesData] = useState(null)
	const [FAQData, setFAQData] = useState(null)

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

	const isHugeDesk = useMediaQuery('(min-width: 1680px)')
	const isDesk = useMediaQuery('(max-width: 1679px) and (min-width: 1280px)')
	const isTabletA = useMediaQuery(
		'(max-width: 1279px) and (orientation: landscape)',
	)
	const isTabletP = useMediaQuery(
		'(max-width: 1279px) and (min-width: 768px) and (orientation: portrait)',
	)
	const isMobile = useMediaQuery(
		'(max-width: 767px) and (orientation: portrait)',
	)

	useEffect(() => {
		setMedia({ isHugeDesk, isDesk, isTabletA, isTabletP, isMobile })
	}, [isHugeDesk, isDesk, isTabletA, isTabletP, isMobile])

	useEffect(() => {
		window.SmoothScroll({
			animationTime: 800,
			stepSize: 70,
			accelerationDelta: 20,
			accelerationMax: 2,
			keyboardSupport: true,
			arrowScroll: 50,
			// Pulse (less tweakable)
			// ratio of "tail" to "acceleration"
			pulseAlgorithm: true,
			pulseScale: 4,
			pulseNormalize: 1,
			touchpadSupport: true,
		})
	}, [])

	const preventZoom = (e) => {
		if (!e.ctrlKey && !e.metaKey) return
		e.preventDefault()
		e.stopImmediatePropagation()
	}

	useEffect(() => {
		document.addEventListener('wheel', preventZoom, { passive: false })

		return () =>
			document.removeEventListener('wheel', preventZoom, { passive: false })
	}, [])

	useEffect(() => {
		document.addEventListener('gesturestart', preventZoom, { passive: false })

		return () =>
			document.removeEventListener('gesturestart', preventZoom, {
				passive: false,
			})
	}, [])

	useEffect(() => {
		const preventZoomOnKeyboard = (e) => {
			if (!e.ctrlKey && !e.metaKey) return
			if (
				e.keyCode !== 107 &&
				e.keyCode !== 109 &&
				e.keyCode !== 187 &&
				e.keyCode !== 189
			)
				return
			e.preventDefault()
			e.stopImmediatePropagation()
		}
		document.addEventListener('keydown', preventZoomOnKeyboard, {
			passive: false,
		})

		return () =>
			document.removeEventListener('keydown', preventZoomOnKeyboard, {
				passive: false,
			})
	}, [])

	// Get data from Sanity
	useEffect(() => {
		sanityClient
			.fetch(
				groq`*[_type == "post"] | order(publishedAt desc) {
				title,
				slug,
				link,
				publishedAt,
				client,
				isMainSlider,
				isPortfolio,
				whatsDone,
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
			}`,
			)
			.then((data) => setCaseData(data))
			.catch(console.error)
	}, [])

	useEffect(() => {
		sanityClient
			.fetch(
				groq`*[_type == "category"] | order(order) {
				title,
			}`,
			)
			.then((data) => setCategoriesData(data))
			.catch(console.error)
	}, [])

	useEffect(() => {
		sanityClient
			.fetch(
				groq`*[_type == "servicesBlock"] | order(order) {
				title,
				services[]->
			}`,
			)
			.then((data) => setServicesData(data))
			.catch(console.error)
	}, [])

	useEffect(() => {
		sanityClient
			.fetch(
				groq`*[_type == "faq"] | order(order) {
				question,
				answer
			}`,
			)
			.then((data) => setFAQData(data))
			.catch(console.error)
	}, [])

	if (!mountedComponent) return null
	return (
		caseData &&
		categoriesData &&
		servicesData &&
		FAQData && (
			<BrowserRouter>
				<CookiesProvider>
					<ThemeProvider theme={{ mode: themeMode, ac: endCol }}>
						<MediaContext.Provider value={media}>
							<GlobalStyles />
							<App
								themeMode={themeMode}
								accentColor={endCol}
								themeToggler={themeToggler}
								accentColorToggler={accentColorToggler}
								caseData={caseData}
								categoriesData={categoriesData}
								servicesData={servicesData}
								FAQData={FAQData}
							/>
							<Cookie />
						</MediaContext.Provider>
					</ThemeProvider>
				</CookiesProvider>
			</BrowserRouter>
		)
	)
}

export default AppWrap
