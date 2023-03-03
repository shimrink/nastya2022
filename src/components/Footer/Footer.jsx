import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import UpperFooter from './UpperFooter';
import UnderFooter from './UnderFooter';

const FooterWrapper = styled.footer`
	position: relative;
	display: flex;
	flex-direction: column;
	align-self: center;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	height: 100%;
	margin-top: ${({m}) => m.isMobile ? 25 : 15}vh;
	z-index: 3;
`
const DevGrid = styled.div`
	display: grid;
	grid-template-columns: ${ ({m}) => m.isTabletP ? 'repeat(4, 1fr)'
												: m.isMobile ? '1fr 1fr'
												: 'repeat(12, 1fr)'};
	grid-column-gap: 24px;
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	margin: ${ ({m}) => m.isTabletA ? '128px 0 24px 0'
							: m.isTabletP ? '198px 0 24px 0'
							: m.isMobile ? 'clamp(180px, 49.585vw, 236px) 0 24px 0'
							: '144px 0 40px 0'};
`
const Dev = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({m}) => m.isHugeDesk ? '10/13'
									: m.isDesk ? '9/13'
									: m.isTabletA ? '7/13'
									: m.isTabletP ? '3/5'
									: '1/3'};
	display: flex;
	flex-direction: column;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 16 : 14}px;
	color: ${ ({theme}) => theme.mode.subText };
`
const Footer = () => {

	const media = useContext(MediaContext)

	return <FooterWrapper m={media}>
		<UpperFooter />
		<DevGrid m={media}>
			<Dev m={media}>
				<span>Design Asya Dulova</span>
				<span>Development Impvlse</span>
			</Dev>
		</DevGrid>
		<UnderFooter />
	</FooterWrapper>
}

export default Footer;