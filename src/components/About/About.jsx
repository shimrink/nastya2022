import React, { forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageTransition, pageVariants } from '../../styles/animations';
import Skills from './Skills';
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import state from '../../store';
import Info from './Info';
import Interests from './Interests';
import Philosophy from './Philosophy';
import coverImg from '../../assets/images/aboutCoverDesk.jpg';
import coverImgM from '../../assets/images/aboutCover.jpg';

const Main = styled(motion.main)`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const TopBlock = styled.div`
	position: absolute;
	left: 0;
	display: grid;
	grid-template-columns: 1fr ${({media}) => media === 'hugeDesk' ? state.gridWidth + 'px' : '1fr'} 1fr;
	width: 100%;
	background-color: ${({accentColor}) => accentColor.dark};
	padding: ${ ({media}) => media === 'hugeDesk' ? '196px 0 156px 0'
									: media === 'desk' ? '248px 40px 274px 40px'
									: media === 'tabletA' ? '148px 24px 155px 24px'
									: media === 'tabletP' ? '175px 24px 175px 24px'
									: '102px 24px 60px 24px' };
	transition: background-color ${commonTheme.durations.short}ms;
`
const TopBlockContent = styled.div`
	grid-row: 1/2;
	grid-column: ${({media}) => media === 'hugeDesk' ? '2/3' : '1/4'};
	display: grid;
	grid-template-columns: ${({media}) => media === 'mobile' || media === 'tabletP' ? '1fr' : 'repeat(12, 1fr)'};
	grid-column-gap: 24px;
	h2 {
		grid-row: 1/2;
		grid-column: ${({media}) => media === 'mobile' || media === 'tabletP' ? '1/2' : '1/13'};
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
		font-family: 'AccentFontI', sans-serif;
		font-size: ${({media}) => media === 'mobile' ? '13.33vw' : 'clamp(70px, 7.6vw, 96px)'};
		letter-spacing: -0.02em;
		margin-top: -0.4em;
	}
`
const Cover = styled.img`
	grid-row: 2/3;
	grid-column: ${({media}) => media === 'mobile' || media === 'tabletP' ? '1/2' : '2/12'};
	position: relative;
	width: 100%;
	aspect-ratio: ${({media}) => media === 'mobile' || media === 'tabletP' ? 'auto' : '631/304'};
	object-fit: cover;
	z-index: 1;
`
const About = forwardRef(({ topBlockH, setTopBlockH }, ref) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	useEffect(() => {
		setTopBlockH(ref.current.getBoundingClientRect().height)
	}, [media, setTopBlockH, ref])

	return <Main initial='out' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
		<TopBlock ref={ref} media={media} accentColor={accentColor}>
			<TopBlockContent media={media}>
				<h2>Digital-дизайнер</h2>
				<Cover className='cover' media={media} src={media === 'mobile' ? coverImgM : coverImg} alt='Asya' />
				<h2 className='name'>Анастасия Дулова</h2>
			</TopBlockContent>
		</TopBlock>
		<Info topBlockH={topBlockH} />
		<Skills />
		<Interests />
		<Philosophy />
	</Main>
})

export default About;