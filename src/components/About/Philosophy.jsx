import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	margin-bottom: ${({m}) => m.isHugeDesk || m.isDesk ? 64 : 0}px;
	text-align: center;
`
const Title = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	text-transform: uppercase;
	margin-bottom: 24px;
`
const Slogan = styled.span`
	font-family: 'AccentFontM', sans-serif;
	font-size: ${({m}) => m.isMobile ? 'clamp(30px, 10vw, 48px)' : '48px'};
	color: ${ ({theme}) => theme.ac.dark };
	text-transform: uppercase;
	margin-bottom: 12px;
`
const Explanation = styled.span`
	font-size: ${({m}) => m.isMobile ? 'clamp(16px, 3.75vw, 18px)' : '18px'};
	color: ${ ({theme}) => theme.ac.dark };
`
const Philosophy = () => {

	const media = useContext(MediaContext)

	return <Wrap m={media}>
		<Title m={media} className='animItems _anim-show-opacity'>Моя философия —</Title>
		<Slogan m={media} className='animItems _anim-show-opacity'>Less is more</Slogan>
		<Explanation m={media} className='animItems _anim-show-opacity'>(меньше значит больше)</Explanation>
	</Wrap>
}

export default Philosophy;