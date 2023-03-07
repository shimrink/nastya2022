import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';

const Wrapper = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk || m.isDesk ? '1/6' : '1/2'};
	justify-self: start;
	z-index: 7;
`
const Svg = styled.svg`
	width: auto;
	height: ${({m}) => m.isHugeDesk || m.isDesk ? 30 : 26}px;
	fill: none;
	cursor: pointer;
`
const Path = styled.path`
	fill: ${ ({theme, isMenuMobileOpen}) => isMenuMobileOpen ? commonTheme.colors.white : theme.ac.dark };
	transition: fill ${commonTheme.durations.short}s;
`
const Logo = ({ isMenuMobileOpen, mobilePageTransition, pageTransition }) => {

	const media = useContext(MediaContext)

	const clickHandler = e => {
		media.isHugeDesk || media.isDesk || !isMenuMobileOpen
		? pageTransition('/')
		: mobilePageTransition('/')
	}

	return <Wrapper m={media}>
		<Svg m={media} onClick={clickHandler} viewBox="0 0 27 31" xmlns="http://www.w3.org/2000/svg">
			<Path isMenuMobileOpen={isMenuMobileOpen} d="M4.96394 27.1602L13.4615 8.24349L16.8269 15.7435C16.8269 19.2157 15.7752 21.9796 13.6719 24.0352C11.5685 26.1185 8.76402 27.1602 5.25841 27.1602H4.96394ZM26.9231 30.2852L13.4615 0.285156L0 30.2852H5.25841C8.76402 30.2852 11.6106 29.0768 13.7981 26.6602C15.9575 24.2713 17.1494 21.0352 17.3738 16.9518L23.3474 30.2852H26.9231Z"/>
		</Svg>
	</Wrapper>
}

export default Logo;