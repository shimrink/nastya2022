import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import LetterByLetter from '../common/LetterByLetter';

const LinkWrap = styled.div`
	font-size: ${({m}) => !m.isHugeDesk && !m.isDesk ? 'clamp(48px, 15.415vw, 76px)' : '18px'};
	margin-right: ${({m}) => !m.isHugeDesk && !m.isDesk ? 0 : 24}px;
	margin-bottom: ${({m}) => m.isMobile ? 24
									: m.isTabletA || m.isTabletP ? 28
									: 0}px;
	color: ${ ({theme, m}) => !m.isHugeDesk && !m.isDesk ? commonTheme.colors.white : theme.mode.text };
	text-transform: ${({m}) => !m.isHugeDesk && !m.isDesk ? 'uppercase' : 'none'};
	white-space: nowrap;
	cursor: pointer;
	transition: color ${commonTheme.durations.short}s;
	&:last-child {
		margin: 0;
	}
`
const NavItem = ({ l, navMobile, disableWave, isMenuMobileOpen, active, setActive, pageTransition, mobilePageTransition }) => {

	const media = useContext(MediaContext)
	const {pathname} = useLocation()
	const [curActive, setCurActive] = useState(pathname === l.path)

	const clickHandler = e => {
		media.isHugeDesk || media.isDesk || !isMenuMobileOpen
		? pageTransition(l.path)
		: mobilePageTransition(l.path)
	}

	useEffect(() => {
		setActive(true)
		setCurActive(pathname === l.path)
	}, [pathname, l, setActive])

	return <LinkWrap m={media} onClick={clickHandler}>
		<LetterByLetter navMobile={navMobile}
							wavy
							disableWave={disableWave}
							regular={!navMobile}
							isMenuMobileOpen={isMenuMobileOpen}
							showAnim={navMobile}
							titleSize={navMobile}
							active={active && curActive}>
			{l.name}
		</LetterByLetter>
	</LinkWrap>
}

export default NavItem;