import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';

const LogoContainer = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '1/6' : '1/2' };
`
const Svg = styled.svg`
	width: auto;
	height: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 30 : 26 }px;
	fill: none;
`
const Path = styled.path`
	fill: ${ props => props.mobile ? commonTheme.colors.primary : props.accentColor.dark };
	transition: fill ${commonTheme.durations.short}ms;
`
const Logo = ({ mobile, closeMenu }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	return <LogoContainer media={media}>
		<NavLink to='/'>
			<Svg media={media} onClick={closeMenu} viewBox="0 0 27 31" xmlns="http://www.w3.org/2000/svg">
				<Path mobile={mobile} accentColor={accentColor} d="M4.96394 27.1602L13.4615 8.24349L16.8269 15.7435C16.8269 19.2157 15.7752 21.9796 13.6719 24.0352C11.5685 26.1185 8.76402 27.1602 5.25841 27.1602H4.96394ZM26.9231 30.2852L13.4615 0.285156L0 30.2852H5.25841C8.76402 30.2852 11.6106 29.0768 13.7981 26.6602C15.9575 24.2713 17.1494 21.0352 17.3738 16.9518L23.3474 30.2852H26.9231Z"/>
			</Svg>
		</NavLink>
	</LogoContainer>
}

export default Logo;