import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageTransition, pageVariants } from '../../styles/animations';
import Skills from './Skills';

const Main = styled(motion.main)`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const About = () => {

	// const media = useContext(MediaContext)
	// const accentColor = useContext(AccentColorContext)

	return <Main initial='out' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
		<Skills />
	</Main>
}

export default About;