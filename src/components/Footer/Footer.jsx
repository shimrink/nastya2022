import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import state from '../../store';
import { commonTheme } from '../../styles/theme';
import UpperFooter from './UpperFooter';
import UnderFooter from './UnderFooter';

const FooterWrapper = styled.footer`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: ${({media}) => media === 'hugeDesk' ? state.gridWidth + 'px' : '100%'};
	margin-top: ${({media}) => media === 'tabletA' || media === 'tabletP' ? 288 : 384}px;
`
const DevGrid = styled.div`
	display: grid;
	grid-template-columns: ${({media}) => media === 'tabletP' ? 'repeat(4, 1fr)'
													: media === 'mobile' ? '1fr 1fr'
													: 'repeat(12, 1fr)'};
	grid-column-gap: 24px;
	padding: ${({media}) => media === 'mobile' ? '0 clamp(24px, 7.5vw, 40px)'
									: media === 'desk' ? '0 80px'
									: media === 'hugeDesk' ? '0'
									: '0 40px'};
	margin: ${({media}) => media === 'tabletA' ? '128px 0 24px 0'
								: media === 'tabletP' ? '198px 0 24px 0'
								: media === 'mobile' ? 'clamp(180px, 49.585vw, 236px) 0 24px 0'
								: '144px 0 40px 0'};
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
	font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 16 : 14}px;
	color: ${commonTheme.colors.secondary};
`
const Footer = () => {

	const media = useContext(MediaContext)

	return <FooterWrapper media={media}>
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