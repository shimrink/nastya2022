import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Skills from './Skills';
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import Info from './Info';
import Interests from './Interests';
import Philosophy from './Philosophy';
import coverImg from '../../assets/images/aboutCoverDesk.jpg';
import coverImgM from '../../assets/images/aboutCover.jpg';
import Values from './Values';
import Footer from '../Footer/Footer';

const Main = styled.main`
	perspective: 10px;
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
`
const TopBlock = styled.div`
	position: absolute;
	display: grid;
	grid-template-columns: 1fr ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
	width: 100%;
	height: 100vh;
	background-color: ${ ({accentColor}) => accentColor.dark };
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	transition: background-color ${commonTheme.durations.short}s;
`
const TopBlockContent = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk ? '2/3' : '1/4'};
	display: grid;
	align-self: center;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	h2 {
		grid-row: 1/2;
		grid-column: 1/13;
		position: relative;
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		font-size: ${({m}) => m.isMobile ? '8.33vw' : 'clamp(48px, 5.37vw, 76px)'};
		text-transform: uppercase;
		text-align: center;
		margin-bottom: -0.4em;
		z-index: 2;
	}
	h2.name {
		grid-row: 3/4;
		align-self: end;
		font-family: 'AccentFontI', sans-serif;
		font-size: ${({m}) => m.isMobile ? '13.33vw' : 'clamp(70px, 7.6vw, 96px)'};
		letter-spacing: -0.02em;
		margin-top: -0.4em;
		margin-bottom: 0;
	}
`
const Cover = styled.img`
	grid-row: 2/3;
	grid-column: ${({m}) => m.isMobile || m.isTabletP ? '1/13' : '2/12'};
	position: relative;
	width: 100%;
	max-width: ${({m}) => m.isMobile ? '400px' : 'none'};
	aspect-ratio: ${({m}) => m.isMobile || m.isTabletP ? 'auto' : '631/304'};
	justify-self: center;
	object-fit: cover;
	z-index: 1;
`
const About = forwardRef(({ setAboutPageScroll, topBlockH, setTopBlockH, pageTransition }, ref) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const wrapRef = useRef()

	useEffect(() => {
		setTopBlockH(ref.current.getBoundingClientRect().height)
	}, [media, setTopBlockH, ref])

	useEffect(() => {
		let el = wrapRef.current
		const onScroll = () => {
			let halfHeaderHeight = media.isHugeDesk || media.isDesk ? 57.25 : 40
			setAboutPageScroll(!(topBlockH - halfHeaderHeight < el.scrollTop))
		}
		el.addEventListener('scroll', onScroll)

		return () => el.removeEventListener('scroll', onScroll)
	}, [media, setAboutPageScroll, topBlockH])

	return <Main ref={wrapRef}>
		<TopBlock ref={ref} m={media} accentColor={accentColor}>
			<TopBlockContent m={media}>
				<h2>Digital-дизайнер</h2>
				<Cover className='cover' m={media} src={media.isMobile ? coverImgM : coverImg} alt='Asya' />
				<h2 className='name'>Анастасия Дулова</h2>
			</TopBlockContent>
		</TopBlock>
		<Info topBlockH={topBlockH} />
		<Skills />
		<Values pageTransition={pageTransition} />
		<Interests />
		<Philosophy />
		<Footer about />
	</Main>
})

export default About;