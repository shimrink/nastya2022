import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'

const LineWrap = styled.div`
	grid-row: ${({ gr }) => gr};
	grid-column: ${({ gc }) => gc};
	width: 100%;
	align-self: ${({ asEnd }) => (asEnd ? 'end' : 'start')};
	margin-top: ${({ mt }) => mt};
	margin-bottom: ${({ mb }) => mb};
	overflow: hidden;
`
const LineDiv = styled.div`
	width: 100%;
	height: 1px;
	background-color: ${({ theme }) => theme.ac.light};
`
const Line = ({ asEnd, mt = '0', mb = '0', gr = '1/2', gc = '1/2' }) => {
	const media = useContext(MediaContext)

	return (
		<LineWrap m={media} asEnd={asEnd} mt={mt} mb={mb} gr={gr} gc={gc}>
			<LineDiv className='animItems _anim-show-left' />
		</LineWrap>
	)
}

export default Line
