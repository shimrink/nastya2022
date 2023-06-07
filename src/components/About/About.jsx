import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import LetterByLetter from '../common/LetterByLetter'
import Info from './Info'
import Skills from './Skills'
import Values from './Values'
import Interests from './Interests'
import Philosophy from './Philosophy'
import Footer from '../Footer/Footer'
import coverImg from '../../assets/images/aboutCover.webp'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 3;
`
const TopBlock = styled.div`
	display: flex;
	align-items: end;
	width: 100%;
	height: 100vh;
	background-image: url(${coverImg});
	background-position-x: 10%;
	background-size: cover;
	background-attachment: ${({ iosDevice }) => (iosDevice ? 'scroll' : 'fixed')};
	@media ${({ theme }) => theme.common.media.tabletP} {
		background-position-x: 20%;
	}
`
const TopBlockContent = styled.div`
	display: grid;
	align-items: end;
	width: 100%;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row-gap: clamp(48px, 14.165vw, 72px);
	}
`
const Title = styled.div`
	grid-row: 1/3;
	grid-column: 1/2;
	justify-self: end;
	padding: 0 40px 40px 0;
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	font-size: 7.9vw;
	line-height: 0.8;
	letter-spacing: -0.02em;
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding: 0 40px 24px 0;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		padding: 0 40px 40px 0;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 1/2;
		justify-self: start;
		padding: 0 clamp(24px, 7.5vw, 40px);
		font-size: 14vw;
	}
`
const Contacts = styled.div`
	grid-row: 1/3;
	grid-column: 1/2;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-self: start;
	padding: 0 0 40px 40px;
	a {
		margin-bottom: 4px;
		font-size: 18px;
	}
	a:last-child {
		margin-bottom: 0;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		a {
			font-size: 16px;
		}
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding: 0 0 24px 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		padding: 0 0 40px 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		padding: 0 0 clamp(24px, 7.5vw, 40px) clamp(24px, 7.5vw, 40px);
	}
`
const About = ({ setPageInitialized, pageTransition }) => {
	useEffect(() => {
		setPageInitialized(true)
		document.title = 'Об asyadulova'
	}, [setPageInitialized])

	const iosDevice = useRef(false)

	useEffect(() => {
		if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|ipod)/))
			iosDevice.current = true
	}, [iosDevice])

	return (
		<Main>
			<TopBlock iosDevice={iosDevice.current}>
				<TopBlockContent>
					<Contacts className='animItems _anim-show-opacity'>
						<a
							href='https://dribbble.com/asyadulova'
							target='_blank'
							rel='noreferrer'
						>
							<LetterByLetter wavy>Dribble</LetterByLetter>
						</a>
						<a
							href='https://www.behance.net/asyadulova'
							target='_blank'
							rel='noreferrer'
						>
							<LetterByLetter wavy>Behance</LetterByLetter>
						</a>
						<a
							href='https://www.instagram.com/asyadulova'
							target='_blank'
							rel='noreferrer'
						>
							<LetterByLetter wavy>Instagram*</LetterByLetter>
						</a>
						<a
							href='https://experts.tilda.cc/asyadulova'
							target='_blank'
							rel='noreferrer'
						>
							<LetterByLetter wavy>Tilda experts</LetterByLetter>
						</a>
					</Contacts>
					<Title>
						<LetterByLetter showAnim whiteCol topFont='AccentFontR'>
							AsyaDulova
						</LetterByLetter>
					</Title>
				</TopBlockContent>
			</TopBlock>
			<Info />
			<Skills />
			<Values pageTransition={pageTransition} />
			<Interests />
			<Philosophy />
			<Footer />
		</Main>
	)
}

export default About
