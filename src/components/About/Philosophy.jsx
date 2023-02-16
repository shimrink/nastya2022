import React, { useContext } from 'react';
import styled from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin: 549px 0 380px 0;
	text-align: center;
`
const Title = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	text-transform: uppercase;
	margin-bottom: 24px;
`
const Slogan = styled.span`
	font-family: 'AccentFontI', sans-serif;
	font-size: ${({m}) => m.isMobile ? 'clamp(30px, 10vw, 48px)' : '48px'};
	color: ${ ({accentColor}) => accentColor.dark };
	text-transform: uppercase;
	margin-bottom: 12px;
`
const Explanation = styled.span`
	font-size: ${({m}) => m.isMobile ? 'clamp(16px, 3.75vw, 18px)' : '18px'};
	color: ${ ({accentColor}) => accentColor.dark };
`
const Philosophy = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	return <Wrap>
		<Title m={media}>Моя философия —</Title>
		<Slogan m={media} accentColor={accentColor}>Less is more</Slogan>
		<Explanation m={media} accentColor={accentColor}>(меньше значит больше)</Explanation>
	</Wrap>
}

export default Philosophy;