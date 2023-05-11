import React from 'react'
import styled from 'styled-components'
import { state } from '../../store'
import NavItem from './NavItem'

const Nav = styled.nav`
	grid-row: ${({ navMobile }) => (navMobile ? '2/3' : '1/2')};
	grid-column: ${({ navMobile }) => (navMobile ? '1/2' : '4/8')};
	display: flex;
	flex-direction: ${({ navMobile }) => (navMobile ? 'column' : 'row')};
	align-items: center;
	justify-self: ${({ navMobile }) => (navMobile ? 'center' : 'end')};
	justify-content: center;
`
const Navigation = ({
	navMobile,
	disableWave,
	isMenuMobileOpen,
	pageTransition,
	mobilePageTransition,
}) => {
	return (
		<Nav navMobile={navMobile}>
			{state.navLinksData.map((l, i) => (
				<NavItem
					key={l.path}
					l={l}
					navMobile={navMobile}
					disableWave={disableWave}
					isMenuMobileOpen={isMenuMobileOpen}
					pageTransition={pageTransition}
					mobilePageTransition={mobilePageTransition}
				/>
			))}
		</Nav>
	)
}

export default Navigation
