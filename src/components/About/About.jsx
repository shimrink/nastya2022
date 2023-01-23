import React from 'react';
import styled from 'styled-components';
import Skills from './Skills';

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`
const About = () => {

	// const media = useContext(MediaContext)
	// const accentColor = useContext(AccentColorContext)

	return <Main>
		<Skills />
	</Main>
}

export default About;