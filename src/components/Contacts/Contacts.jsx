import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import SmoothScroll from '../common/SmoothScroll';
import Footer from '../Footer/Footer';

const Main = styled.main`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 3;
`
const Contacts = ({ setPageInitialized }) => {

	useEffect(() => {
		setPageInitialized(true)
	}, [setPageInitialized])

	const mainRef = useRef()

	return <Main ref={mainRef}>
		<SmoothScroll mainRef={mainRef}>
			<Footer setPageInitialized={setPageInitialized} />
		</SmoothScroll>
	</Main>
}

export default Contacts;