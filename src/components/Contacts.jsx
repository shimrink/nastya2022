import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageTransition, pageVariants } from '../styles/animations';

const Main = styled(motion.main)`
	display: flex;
	flex-direction: column;
`
const Contacts = () => {
	return <Main initial='out' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>

	</Main>
}

export default Contacts;