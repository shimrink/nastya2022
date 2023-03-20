import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import LetterByLetter from '../common/LetterByLetter';
import Info from './Info';
import Skills from './Skills';
import Values from './Values';
import Interests from './Interests';
import Philosophy from './Philosophy';
import Footer from '../Footer/Footer';
import coverImg from '../../assets/images/aboutCover.webp';

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
	background-position-x: ${({m}) => m.isTabletP ? '20%' : '10%'};
	background-size: cover;
	background-attachment: ${({iosDevice}) => iosDevice ? 'scroll' : 'fixed'};
`
const TopBlockContent = styled.div`
	display: grid;
	grid-row-gap: ${({m}) => m.isMobile ? 'clamp(48px, 14.165vw, 72px)' : 0};
	align-items: end;
	width: 100%;
`
const Title = styled.div`
	grid-row: ${({m}) => m.isMobile ? '1/2' : '1/3'};
	grid-column: 1/2;
	justify-self: ${({m}) => m.isMobile ? 'start' : 'end'};
	padding: ${({m}) => m.isTabletA ? '0 40px 24px 0'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px 40px 0'};
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	font-size: ${({m}) => m.isMobile ? 14 : 7.9}vw;
	line-height: 0.8;
	letter-spacing: -0.02em;
	text-transform: uppercase;
`
const Contacts = styled.div`
	grid-row: ${({m}) => m.isMobile ? '2/3' : '1/3'};
	grid-column: 1/2;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-self: start;
	padding: ${({m}) => m.isTabletA ? '0 0 24px 40px'
							: m.isMobile ? ' 0 0 clamp(24px, 7.5vw, 40px) clamp(24px, 7.5vw, 40px)'
							: '0 0 40px 40px'};
	a {
		margin-bottom: 4px;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	}
	a:last-child {
		margin-bottom: 0;
	}
`
const About = ({ setPageInitialized, pageTransition }) => {

	useEffect(() => {
		setPageInitialized(true)
	}, [setPageInitialized])

	const media = useContext(MediaContext)
	const iosDevice = useRef(false)

	useEffect(() => {
		if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|ipod)/)) iosDevice.current = true
	}, [iosDevice])

	return <Main>
		<TopBlock m={media} iosDevice={iosDevice.current}>
			<TopBlockContent m={media}>
				<Contacts m={media} className='animItems _anim-show-opacity'>
					<a href="https://dribbble.com/asyadulova" target="_blank" rel="noreferrer">
						<LetterByLetter wavy>Dribble</LetterByLetter>
					</a>
					<a href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">
						<LetterByLetter wavy>Behance</LetterByLetter>
					</a>
					<a href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">
						<LetterByLetter wavy>Instagram*</LetterByLetter>
					</a>
					<a href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">
						<LetterByLetter wavy>Tilda experts</LetterByLetter>
					</a>
				</Contacts>
				<Title m={media}>
					<LetterByLetter showAnim regular whiteCol>AsyaDulova</LetterByLetter>
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
}

export default About;