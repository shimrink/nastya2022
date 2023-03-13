import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { state } from '../../store';
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
`
const Ranks = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({m}) => m.isTabletP ? '3/5'
									: m.isMobile ? '1/5'
									: '7/13'};
	display: flex;
	flex-direction: column;
	margin-bottom: 48px;
`
const Rank = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	text-transform: uppercase;
	margin-bottom: 4px;
	&:last-child {
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
	transform: translateY( ${({m}) => m.isMobile ? 50 : 0}% );
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
	z-index: 1;
`
const Info = () => {

	const media = useContext(MediaContext)

	return <Wrap m={media}>
		<SectionTitle mbMobile='clamp(48px, 14.58vw, 76px)'>Здрасьте, я Настя</SectionTitle>
		<Content m={media}>
			<Ranks m={media} className='animItems _anim-show-opacity'>
				{state.aboutRanks.map((r, i) => <Rank key={i} m={media}>{r}</Rank>)}
			</Ranks>
			<Multi m={media} className='animItems _anim-show-opacity'>Мультидисциплинарный дизайнер</Multi>
			<Text m={media} className='animItems _anim-show-opacity'>Дизайнер-фрилансер с&nbsp;широким спектром навыков.<br/>Помогаю решить задачи вашего бизнеса с помощью дизайна: создаю его комплексную «упаковку» — от логотипа и презентаций до сайта.</Text>
			<Portrait m={media} src={asyaP} alt='Asya' />
			<Landscape m={media} src={asyaA} alt='Asya' />
		</Content>
	</Wrap>
}

export default Info;