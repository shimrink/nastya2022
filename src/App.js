import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import About from "./components/About";
import Cases from "./components/Cases";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Services from "./components/Services";
import { useColorMode } from "./hooks/useColorMode";
import GlobalStyles from "./styles/global";
import { commonTheme, darkTheme, lightTheme } from "./styles/theme";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
	background-color: ${ ({theme}) => theme.bg };
	color: ${ ({theme}) => theme.text };
	transition-property: color, fill, stroke, transform;
	transition-duration: ${commonTheme.durations.ms300}ms;
`

const App = () => {

	const [theme, accentColor, accentColorToggler, themeToggler, mountedComponent] = useColorMode()

	const themeMode = theme === 'light' ? lightTheme : darkTheme

	const [endCol, setEndCol] = useState('')

	useEffect( () => {
		switch (accentColor) {
			case 'blue':
				setEndCol('#718ec4')
				break
			case 'green':
				setEndCol('#46bbb1')
				break
			case 'orange':
				setEndCol('#ffb4a2')
				break
			default:
				setEndCol('#c2a6cd')
				break
		}
	}, [accentColor])

	if (!mountedComponent) return <div></div>
	return <BrowserRouter>
		<ThemeProvider theme={themeMode}>
			<Wrapper>
				<Header accentColor={endCol} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cases" element={<Cases />} />
					<Route path="/about" element={<About />} />
					<Route path="/services" element={<Services />} />
					<Route path="/contacts" element={<Contacts />} />
				</Routes>
				<Footer themeToggler={themeToggler} accentColorToggler={accentColorToggler} />
			</Wrapper>
			<GlobalStyles />
		</ThemeProvider>
	</BrowserRouter>
}

export default App;