import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'

const LineWrap = styled.div`
	grid-row: ${({ gr }) => gr};
	grid-column: ${({ gc }) => gc};
	width: 100%;
	align-self: ${({ asEnd }) => (asEnd ? 'end' : 'start')};
	margin-top: ${({ mt }) => mt};
	margin-right: ${({ mr }) => mr};
	margin-bottom: ${({ mb }) => mb};
	margin-left: ${({ ml }) => ml};
	overflow: hidden;
`
const LineDiv = styled.div`
	width: 100%;
	height: 1px;
	background-color: ${({ theme }) => theme.ac.light};
`
const Line = ({
	asEnd,
	mt = '0',
	mr = '0',
	mb = '0',
	ml = '0',
	gr = '1/2',
	gc = '1/2',
}) => {
	const media = useContext(MediaContext)

	return (
		<LineWrap
			m={media}
			asEnd={asEnd}
			mt={mt}
			mr={mr}
			mb={mb}
			ml={ml}
			gr={gr}
			gc={gc}
		>
			<LineDiv className='animItems _anim-show-left' />
		</LineWrap>
	)
}

export default Line
