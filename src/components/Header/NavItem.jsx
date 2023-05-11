import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import LetterByLetter from '../common/LetterByLetter'

const LinkWrap = styled.div`
	font-size: 18px;
	margin-right: 24px;
	color: ${({ theme }) => theme.mode.text};
	white-space: nowrap;
	cursor: pointer;
	transition: color ${({ theme }) => theme.common.durations.short}s;
	&:last-child {
		margin: 0;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: clamp(48px, 15.415vw, 76px);
		margin-right: 0;
		margin-bottom: 28px;
		color: ${({ theme }) => theme.common.colors.white};
		text-transform: uppercase;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-bottom: 24px;
	}
`
const NavItem = ({
	l,
	navMobile,
	disableWave,
	isMenuMobileOpen,
	pageTransition,
	mobilePageTransition,
}) => {
	const media = useContext(MediaContext)
	const { pathname } = useLocation()
	const [curActive, setCurActive] = useState(pathname === l.path)

	const clickHandler = () => {
		media.isHugeDesk || media.isDesk || !isMenuMobileOpen
			? pageTransition(l.path)
			: mobilePageTransition(l.path)
	}

	useEffect(() => {
		setCurActive(pathname === l.path)
	}, [pathname, l])

	return (
		<LinkWrap onClick={clickHandler}>
			<LetterByLetter
				navMobile={navMobile}
				wavy
				disableWave={disableWave}
				isMenuMobileOpen={isMenuMobileOpen}
				showAnim={navMobile}
				active={curActive}
				topFont={navMobile ? 'AccentFontT' : 'AccentFontR'}
				bottomFont={navMobile ? 'AccentFontR' : 'AccentFontB'}
			>
				{l.name}
			</LetterByLetter>
		</LinkWrap>
	)
}

export default NavItem
