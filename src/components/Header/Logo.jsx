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
		<Svg m={media} onClick={clickHandler} viewBox="0 0 85 93" xmlns="http://www.w3.org/2000/svg">
			<Path isMenuMobileOpen={isMenuMobileOpen} fillRule="evenodd" clipRule="evenodd" d="M34.6248 0L0 93L17.421 93C29.035 93 40.4685 88.1118 46.5575 82.978C52.6466 77.8442 57.0408 71.7947 58.6286 61.5648L69.3798 93H85L50.1148 0H34.6248ZM54.5212 49.1877L42.4349 13.2671H42.1746L19.2787 81.0546C29.1788 80.6904 39.1964 77.5974 44.5671 71.2977C49.9379 64.998 53.3588 57.5819 54.5212 49.1877Z" />
		</Svg>
	</Wrapper>
}

export default Logo;