import React, { useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 3;
`
const Contacts = ({ setPageInitialized }) => {

	useEffect(() => {
		setPageInitialized(true)
	}, [setPageInitialized])

	return <Main>
		<Footer setPageInitialized={setPageInitialized} />
	</Main>
}

export default Contacts;