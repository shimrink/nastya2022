import React from 'react';
import styled from 'styled-components';

const LineDiv = styled.div`
	grid-column: 1/13;
	width: 100%;
	height: 1px;
	background-color: ${ ({theme}) => theme.ac.light };
`
const Line = ({ top }) => {
	return <LineDiv top={top} />
}

export default Line;