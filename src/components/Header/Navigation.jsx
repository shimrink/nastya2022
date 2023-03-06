import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { state } from '../../store';
import NavItem from './NavItem';

const Nav = styled.nav`
	grid-row: ${({navMobile}) => navMobile ? '2/3' : '1/2'};
	grid-column: ${({navMobile}) => navMobile ? '1/2' : '4/8'};
	display: flex;
	flex-direction: ${({navMobile}) => navMobile ? 'column' : 'row'};
	align-items: center;
	justify-self: ${({navMobile}) => navMobile ? 'center' : 'end'};
	justify-content: center;
`
const Navigation = ({ navMobile, isMenuMobileOpen, closeMenu, pageTransition }) => {

	const media = useContext(MediaContext)
	const [active, setActive] = useState(true)

	return <Nav navMobile={navMobile} m={media}>
		{state.navLinksData.map((l, i) => (
			<NavItem key={i}
						l={l}
						navMobile={navMobile}
						isMenuMobileOpen={isMenuMobileOpen}
						active={active}
						setActive={setActive}
						closeMenu={closeMenu}
						pageTransition={pageTransition} />
		))}
	</Nav>
}

export default Navigation;