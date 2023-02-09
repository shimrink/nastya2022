import React, { forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Skills from './Skills';
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import state from '../../store';
import Info from './Info';
import Interests from './Interests';
import Philosophy from './Philosophy';
import coverImg from '../../assets/images/aboutCoverDesk.jpg';
import coverImgM from '../../assets/images/aboutCover.jpg';
import Values from './Values';

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const TopBlock = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({media}) => media === 'hugeDesk' ? state.gridWidth + 'px' : '1fr'} 1fr;
	width: 100%;
	height: 100vh;
	background-color: ${({accentColor}) => accentColor.dark};
	padding: ${ ({media}) => media === 'hugeDesk' ? '0'
									: media === 'desk' ? '0 80px'
									: media === 'mobile' ? '0 clamp(24px, 7.5vw, 40px)'
									: '0 40px'};
	transition: background-color ${commonTheme.durations.short}ms;
`
const TopBlockContent = styled.div`
	grid-row: 1/2;
	grid-column: ${({media}) => media === 'hugeDesk' ? '2/3' : '1/4'};
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
		font-size: ${({media}) => media === 'mobile' ? '8.33vw' : 'clamp(48px, 5.37vw, 76px)'};
		text-transform: uppercase;
		text-align: center;
		margin-bottom: -0.4em;
		z-index: 2;
	}
	h2.name {
		grid-row: 3/4;
		align-self: end;
		font-family: 'AccentFontI', sans-serif;
		font-size: ${({media}) => media === 'mobile' ? '13.33vw' : 'clamp(70px, 7.6vw, 96px)'};
		letter-spacing: -0.02em;
		margin-top: -0.4em;
		margin-bottom: 0;
	}
`
const Cover = styled.img`
	grid-row: 2/3;
	grid-column: ${({media}) => media === 'mobile' || media === 'tabletP' ? '1/13' : '2/12'};
	position: relative;
	width: 100%;
	max-width: ${({media}) => media === 'mobile' ? '400px' : 'none'};
	aspect-ratio: ${({media}) => media === 'mobile' || media === 'tabletP' ? 'auto' : '631/304'};
	justify-self: center;
	object-fit: cover;
	z-index: 1;
`
const About = forwardRef(({ setTopBlockH }, ref) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	useEffect(() => {
		setTopBlockH(ref.current.getBoundingClientRect().height)
	}, [media, setTopBlockH, ref])

	return <Main>
		<TopBlock ref={ref} media={media} accentColor={accentColor}>
			<TopBlockContent media={media}>
				<h2>Digital-дизайнер</h2>
				<Cover className='cover' media={media} src={media === 'mobile' ? coverImgM : coverImg} alt='Asya' />
				<h2 className='name'>Анастасия Дулова</h2>
			</TopBlockContent>
		</TopBlock>
		<Info />
		<Skills />
		<Values />
		<Interests />
		<Philosophy />
	</Main>
})

export default About;