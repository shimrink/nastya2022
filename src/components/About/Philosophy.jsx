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
	font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16}px;
	text-transform: uppercase;
	margin-bottom: 24px;
`
const Slogan = styled.span`
	font-family: 'AccentFontI', sans-serif;
	font-size: ${({media}) => media === 'mobile' ? 'clamp(30px, 10vw, 48px)' : '48px'};
	color: ${({accentColor}) => accentColor.dark};
	text-transform: uppercase;
	margin-bottom: 12px;
`
const Explanation = styled.span`
	font-size: ${({media}) => media === 'mobile' ? 'clamp(16px, 3.75vw, 18px)' : '18px'};
	color: ${({accentColor}) => accentColor.dark};
`
const Philosophy = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	return <Wrap>
		<Title media={media}>Моя философия —</Title>
		<Slogan media={media} accentColor={accentColor}>Less is more</Slogan>
		<Explanation media={media} accentColor={accentColor}>(меньше значит больше)</Explanation>
	</Wrap>
}

export default Philosophy;