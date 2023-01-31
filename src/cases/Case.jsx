import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageTransition, pageVariants } from '../styles/animations';
import { AccentColorContext, MediaContext } from '../AppWrap';
import { commonTheme } from '../styles/theme';

const Main = styled(motion.main)`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const TopBlock = styled.div`
	position: absolute;
	width: 100%;
	background-color: ${({accentColor}) => accentColor.dark};
	padding-top: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 288 : 196 }px;
	transition: background-color ${commonTheme.durations.short}ms;
`
const Case = ({ c }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	return <Main initial='out' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
		<TopBlock media={media} accentColor={accentColor} id='topBlock'>
		</TopBlock>
	</Main>
}

export default Case;