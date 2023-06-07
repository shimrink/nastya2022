import React from 'react'
import styled from 'styled-components'
import Line from '../../components/common/Line'

const Wrap = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: ${({ gc }) => gc};
	width: 100%;
	padding: ${({ pZero }) => (pZero ? '0' : '0 40px')};
	margin-bottom: ${({ mbHugeDesk }) => mbHugeDesk};
	@media ${({ theme }) => theme.common.media.desk} {
		margin-bottom: ${({ mbDesk }) => mbDesk};
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: ${({ pZero }) => (pZero ? '0' : '0 clamp(24px, 7.5vw, 40px)')};
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin-bottom: ${({ mbTabletA }) => mbTabletA};
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin-bottom: ${({ mbTabletP }) => mbTabletP};
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-bottom: ${({ mbMobile }) => mbMobile};
	}
`
const Title = styled.div`
	position: relative;
	margin-bottom: 48px;
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	font-size: 18px;
	text-align: center;
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 16px;
	}
`
const SectionTitle = ({
	children,
	pZero,
	gc = '1/4',
	mbHugeDesk = '76px',
	mbDesk = '76px',
	mbTabletA = '76px',
	mbTabletP = '76px',
	mbMobile = '48px',
}) => {
	return (
		<Wrap
			pZero={pZero}
			gc={gc}
			mbHugeDesk={mbHugeDesk}
			mbDesk={mbDesk}
			mbTabletA={mbTabletA}
			mbTabletP={mbTabletP}
			mbMobile={mbMobile}
		>
			<Title className='animItems _anim-show-opacity'>{children}</Title>
			<Line />
		</Wrap>
	)
}

export default SectionTitle
