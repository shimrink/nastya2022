import React from 'react';
import styled from 'styled-components';

const LineWrap = styled.div`
	width: 100%;
	overflow: hidden;
`
const LineDiv = styled.div`
	width: 100%;
	height: 1px;
	background-color: ${ ({theme}) => theme.ac.light };
`
const Line = () => {
	return <LineWrap>
		<LineDiv className='animItems _anim-show-left' />
	</LineWrap>
}

export default Line;