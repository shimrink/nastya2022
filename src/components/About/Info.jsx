import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import SectionTitle from '../common/SectionTitle';
import asyaP from '../../assets/images/aboutInfoPortrait.webp';
import asyaA from '../../assets/images/aboutInfoAlbum.webp';

const Wrap = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
	padding-top: ${ ({m}) => m.isHugeDesk || m.isDesk ? '192px'
									: m.isMobile ? 'clamp(96px, 26.67vw, 120px)'
									: '120px'};
	transform-style: preserve-3d;
`
const Content = styled.div`
	grid-row: 2/3;
	grid-column: ${({m}) => m.isHugeDesk ? '2/3' : '1/4'};
	display: grid;
	grid-template-columns: ${({m}) => m.isTabletP || m.isMobile ? 'repeat(4, 1fr)' : 'repeat(12, 1fr)'};
	grid-column-gap: ${ ({m}) => m.isTabletP ? 40
										: m.isMobile ? 0
										: 24}px;
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	transform: ${ ({m, land, port}) => m.isMobile && land ? 'translateZ(2px) scale(0.846)'
												: m.isMobile && port ? 'translateZ(1px) scale(0.923)'
												: land ? 'translateZ(-1px) scale(1.077)'
												: port ? 'translateZ(-2px) scale(1.154)'
												: 'none'};
	img {
		opacity: ${({land, port}) => land || port ? 1 : 0};
	}
`
const Ranks = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({m}) => m.isTabletP ? '3/5'
									: m.isMobile ? '1/5'
									: '7/13'};
	display: flex;
	flex-direction: column;
	margin-bottom: 48px;
	span {
		font-family: 'AccentFontR', sans-serif;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		text-transform: uppercase;
		margin-bottom: 4px;
	}
	span:last-child {
		margin-bottom: 0;
	}
`
const Multi = styled.h2`
	grid-row: 2/3;
	grid-column: ${ ({m}) => m.isTabletP ? '3/5'
									: m.isMobile ? '1/5'
									: '7/13'};
	color: ${ ({theme}) => theme.ac.dark };
	font-family: 'AccentFontM';
	font-weight: 500;
	font-size: ${ ({m}) => m.isTabletA || m.isTabletP ? 'clamp(24px, 3.065vw, 30px)'
								: m.isMobile ? 'clamp(22px, 6.075vw, 29px)'
								: 'clamp(40px, 2.815vw, 48px)'};
	text-transform: uppercase;
	transition: color ${commonTheme.durations.short}s;
`
const Text = styled.p`
	position: relative;
	grid-row: 3/4;
	grid-column: ${ ({m}) => m.isHugeDesk ? '7/11'
									: m.isDesk ? '7/12'
									: m.isTabletA ? '7/12'
									: m.isTabletP ? '3/5'
									: '1/5'};
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	margin: ${({m}) => m.isMobile ? '24px 0 76px 0' : '24px 0 168px 0'};
`
const Landscape = styled.img`
	position: relative;
	grid-row: 4/5;
	grid-column: ${ ({m}) => m.isTabletP ? '3/5'
									: m.isMobile ? '1/4'
									: '7/12'};
	align-self: end;
	width: 100%;
	z-index: 2;
`
const Portrait = styled.img`
	position: relative;
	grid-row: ${({m}) => m.isMobile ? '4/5' : '1/5'};
	grid-column: ${ ({m}) => m.isTabletP ? '1/3'
									: m.isMobile ? '2/5'
									: '2/6'};
	align-self: center;
	width: 100%;
	padding-top: ${({m}) => m.isMobile ? 76 : 0}px;
	z-index: 1;
`
const Info = () => {

	const media = useContext(MediaContext)
	const portraitRef = useRef()

	return <Wrap m={media}>
		<SectionTitle mbMobile='clamp(48px, 14.58vw, 76px)'>Здрасьте, я Настя</SectionTitle>
		<Content m={media}>
			<Ranks m={media}>
				<span className='animItems _anim-show-opacity'>Digital,</span>
				<span className='animItems _anim-show-opacity'>Веб,</span>
				<span className='animItems _anim-show-opacity'>UX/UI,</span>
				<span className='animItems _anim-show-opacity'>SMM,</span>
				<span className='animItems _anim-show-opacity'>Графический —</span>
			</Ranks>
			<Multi m={media} className='animItems _anim-show-opacity'>Мультидисциплинарный дизайнер</Multi>
			<Text m={media} className='animItems _anim-show-opacity'>Дизайнер-фрилансер с&nbsp;широким спектром навыков.<br/>Помогаю решить задачи вашего бизнеса с помощью дизайна: создаю его комплексную «упаковку» — от логотипа и презентаций до сайта.</Text>
			<Portrait ref={portraitRef} m={media} src={asyaP} alt='Asya' />
			<Landscape m={media} src={asyaA} alt='Asya' />
		</Content>
		<Content m={media} land>
			<Landscape m={media} src={asyaA} alt='Asya' />
		</Content>
		<Content m={media} port>
			<Portrait ref={portraitRef} m={media} src={asyaP} alt='Asya' />
		</Content>
	</Wrap>
}

export default Info;