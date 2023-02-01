import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MediaContext } from '../../AppWrap';
import state from '../../store';
import { commonTheme } from '../../styles/theme';
import { pageTransition, pageVariants } from '../../styles/animations';
import UpperFooter from './UpperFooter';
import UnderFooter from './UnderFooter';

const FooterWrapper = styled(motion.footer)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: ${ ({media}) => media === 'hugeDesk' ? state.gridWidth + 'px' : '100%' };
	background-color: ${({theme}) => theme.bg};
	margin-top: ${ ({media}) => media === 'tabletA' || media === 'tabletP' ? 288 : 384 }px;
`
const DevGrid = styled.div`
	display: grid;
	grid-template-columns: ${({media}) => media === 'tabletP' ? 'repeat(4, 1fr)'
								: media === 'mobile' ? '1fr 1fr'
								: 'repeat(12, 1fr)'};
	grid-column-gap: 24px;
	padding: ${({media}) => media === 'hugeDesk' ? '0 0 40px 0'
								: media === 'desk' ? '0 40px 40px 40px'
								: media === 'mobile' ? '0 24px 24px 24px'
								: '0 40px 24px 40px'};
	margin-top: ${({media}) => media === 'tabletA' ? '128px'
								: media === 'tabletP' ? '198px'
								: media === 'mobile' ? 'clamp(180px, 49.585vw, 236px)'
								: '144px'};
`
const Dev = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'hugeDesk' ? '10/13'
										: media === 'desk' ? '9/13'
										: media === 'tabletA' ? '7/13'
										: media === 'tabletP' ? '3/5'
										: '1/3'};
	display: flex;
	flex-direction: column;
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 16 : 14 }px;
	color: ${commonTheme.colors.secondary};
`
const Footer = () => {

	const media = useContext(MediaContext)

	return <FooterWrapper media={media} initial='out' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
		<UpperFooter />
		<DevGrid media={media}>
			<Dev media={media}>
				<span>Design Asya Dulova</span>
				<span>Development Impvlse</span>
			</Dev>
		</DevGrid>
		<UnderFooter />
	</FooterWrapper>
}

export default Footer;