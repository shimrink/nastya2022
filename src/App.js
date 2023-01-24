import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from 'framer-motion';
import { commonTheme } from "./styles/theme";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Services from "./components/Services";

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
const App = ({ themeToggler, accentColorToggler, caseData, categoriesData }) => {

	const location = useLocation()

	return <Wrapper>
		<Header toggleTheme={themeToggler} accentColorToggler={accentColorToggler} />
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route path="/portfolio" element={<Portfolio caseData={caseData} categoriesData={categoriesData} />} />
				<Route path="/about" element={<About />} />
				<Route path="/services" element={<Services />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="/" element={<Home caseData={caseData} />} />
			</Routes>
			<Footer />
		</AnimatePresence>
	</Wrapper>
}

export default App;