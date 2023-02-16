import React, { useContext } from 'react';
import styled from 'styled-components';
import { AccentColorContext } from '../../AppWrap';

const LineDiv = styled.div`
	grid-column: 1/13;
	width: 100%;
	height: 1px;
	background-color: ${ ({accentColor}) => accentColor.light };
`
const Line = ({ top }) => {

	const accentColor = useContext(AccentColorContext)

	return <LineDiv top={top} accentColor={accentColor} />
}

export default Line;