import React, { useContext } from 'react';
import styled from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';

const LineDiv = styled.div`
	grid-column: 1/13;
	width: 100%;
	height: 1px;
	background-color: ${ ({accentColor}) => accentColor.light };
`
const Line = ({ top }) => {

	const accentColor = useContext(AccentColorContext)
	const media = useContext(MediaContext)

	return <LineDiv top={top} media={media} accentColor={accentColor} />
}

export default Line;