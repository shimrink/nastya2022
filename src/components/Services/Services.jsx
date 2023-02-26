import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const Services = () => {

	const media = useContext(MediaContext)

	return <Main></Main>
}

export default Services;