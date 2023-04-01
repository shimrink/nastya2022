import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import Line from '../../components/common/Line'

const Title = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: ${({ gc }) => gc};
	width: 100%;
	padding: ${({ m, pZero }) =>
		pZero ? '0' : m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin-bottom: ${(props) =>
		props.m.isHugeDesk
			? props.mbHugeDesk
			: props.m.isDesk
			? props.mbDesk
			: props.m.isTabletA
			? props.mbTabletA
			: props.m.isTabletP
			? props.mbTabletP
			: props.mbMobile};
	h3 {
		position: relative;
		margin-bottom: 48px;
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
		text-align: center;
		text-transform: uppercase;
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
	const media = useContext(MediaContext)

	return (
		<Title
			m={media}
			pZero={pZero}
			gc={gc}
			mbHugeDesk={mbHugeDesk}
			mbDesk={mbDesk}
			mbTabletA={mbTabletA}
			mbTabletP={mbTabletP}
			mbMobile={mbMobile}
		>
			<h3 className='animItems _anim-show-opacity'>{children}</h3>
			<Line />
		</Title>
	)
}

export default SectionTitle
