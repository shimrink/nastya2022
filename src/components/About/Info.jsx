import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AccentColorContext, MediaContext } from '../../AppWrap';
import Line from '../common/Line';
import asyaP from '../../assets/images/aboutInfoPortrait.jpg';
import asyaA from '../../assets/images/aboutInfoAlbum.jpg';
import state from '../../store';

const Wrap = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({media}) => media === 'hugeDesk' ? state.gridWidth + 'px' : '1fr'} 1fr;
	padding-top: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '192px' : 'clamp(96px, 26.67vw, 120px)' };
`
const Title = styled.div`
	grid-row: 1/2;
	grid-column: 1/4;
	display: flex;
	flex-direction: column;
	padding: ${ ({media}) => media === 'mobile' ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px' };
`
const Hi = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '18px' : '16px' };
	text-transform: uppercase;
	text-align: center;
	padding-bottom: 48px;
`
const Content = styled.div`
	grid-row: 2/3;
	grid-column: ${ ({media}) => media === 'hugeDesk' ? '2/3' : '1/4' };
	display: grid;
	grid-template-columns: ${({media}) => media === 'tabletP' || media === 'mobile' ? 'repeat(4, 1fr)' : 'repeat(12, 1fr)'};
	grid-column-gap: ${({media}) => media === 'tabletP' ? 40
											: media === 'mobile' ? 0
											: 24}px;
	padding: ${ ({media}) => media === 'hugeDesk' ? '0'
									: media === 'desk' ? '0 80px'
									: media === 'mobile' ? '0 clamp(24px, 7.5vw, 40px)'
									: '0 40px'};
`
const Ranks = styled.div`
	grid-row: 1/2;
	grid-column: ${({media}) => media === 'tabletP' ? '3/5'
										: media === 'mobile' ? '1/5'
										: '7/13'};
	display: flex;
	flex-direction: column;
	margin: 76px 0 48px 0;
	span {
		font-family: 'AccentFontR', sans-serif;
		font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '18px' : '16px'};
		text-transform: uppercase;
		margin-bottom: 4px;
	}
	span:last-child {
		margin-bottom: 0;
	}
`
const Multi = styled.h2`
	grid-row: 2/3;
	grid-column: ${({media}) => media === 'tabletP' ? '3/5'
										: media === 'mobile' ? '1/5'
										: '7/13'};
	color: ${({accentColor}) => accentColor.dark};
	font-family: 'AccentFontI';
	font-weight: normal;
	font-size: clamp(30px, 3.13vw, 48px);
	text-transform: uppercase;
`
const Text = styled.p`
	grid-row: 3/4;
	grid-column: ${({media}) => media === 'hugeDesk' ? '7/11'
										: media === 'desk' ? '7/12'
										: media === 'tabletA' ? '7/12'
										: media === 'tabletP' ? '3/5'
										: '1/5'};
	font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '18px' : '16px'};
	margin: ${({media}) => media === 'mobile' ? '24px 0 76px 0' : '24px 0 168px 0'};
`
const Landscape = styled.img`
	grid-row: 4/5;
	grid-column: ${({media}) => media === 'tabletP' ? '3/5'
										: media === 'mobile' ? '1/4'
										: '7/12'};
	position: relative;
	width: 100%;
	align-self: end;
	z-index: 2;
`
const Portrait = styled.img`
	grid-row: ${({media}) => media === 'mobile' ? '4/5' : '1/5'};;
	grid-column: ${({media}) => media === 'tabletP' ? '1/3'
										: media === 'mobile' ? '2/5'
										: '2/6'};
	position: relative;
	width: 100%;
	align-self: center;
	z-index: 1;
`
gsap.registerPlugin(ScrollTrigger)
const Info = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const portraitRef = useRef()

	useEffect(() => {
		if (portraitRef) {
			gsap.to(portraitRef.current, {
				scrollTrigger: {
					trigger: portraitRef.current,
					start: "top bottom",
					end: "650px top",
					scrub: true
				},
				yPercent: 50,
				duration: 1,
				ease: "linear"
			})
		}
	}, [])

	return <Wrap media={media}>
		<Title media={media}>
			<Hi media={media}>Здрасьте, я Настя</Hi>
			<Line />
		</Title>
		<Content media={media}>
			<Ranks media={media}>
				<span>Digital,</span>
				<span>Веб,</span>
				<span>UX/UI,</span>
				<span>SMM,</span>
				<span>Графический —</span>
			</Ranks>
			<Multi media={media} accentColor={accentColor}>Мультидисциплинарный дизайнер</Multi>
			<Text media={media}>Дизайнер-фрилансер с&nbsp;широким спектром навыков.<br/>Помогаю решить задачи вашего бизнеса с помощью дизайна: создаю его комплексную «упаковку» — от логотипа и презентаций до сайта.</Text>
			<Landscape media={media} src={asyaA} alt='Asya' />
			<Portrait ref={portraitRef} media={media} src={asyaP} alt='Asya' />
		</Content>
	</Wrap>
}

export default Info;