import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	margin-bottom: 64px;
	text-align: center;
	@media ${({ theme }) => theme.common.media.tablet} {
		margin-bottom: 0;
	}
`
const Title = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: 18px;
	text-transform: uppercase;
	margin-bottom: 24px;
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
	}
`
const Slogan = styled.span`
	font-family: 'AccentFontM', sans-serif;
	font-size: 48px;
	color: ${({ theme }) => theme.ac.dark};
	text-transform: uppercase;
	margin-bottom: 12px;
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: clamp(30px, 10vw, 48px);
	}
`
const Explanation = styled.span`
	font-size: 18px;
	color: ${({ theme }) => theme.ac.dark};
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: clamp(16px, 3.75vw, 18px);
	}
`
const Philosophy = () => {
	return (
		<Wrap>
			<Title className='animItems _anim-show-opacity'>Моя философия —</Title>
			<Slogan className='animItems _anim-show-opacity'>Less is more</Slogan>
			<Explanation className='animItems _anim-show-opacity'>
				(меньше значит больше)
			</Explanation>
		</Wrap>
	)
}

export default Philosophy
