import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import asyaImg from '../../assets/images/footerCover.png';

const moveX = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-25%);
	}
`
const UpperFooterWrap = styled.div`
	display: grid;
	grid-template-rows: ${({m}) => m.isMobile ? 'auto' : '1fr 1fr 1fr'};
	grid-template-columns: ${({m}) => m.isTabletP ? 'repeat(4, 1fr)'
												: m.isMobile ? '1fr 1fr'
												: 'repeat(12, 1fr)'};
	grid-row-gap: 48px;
	grid-column-gap: ${({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: m.isTabletP ? '40px'
										: '24px'};
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
`
const TitleWrap = styled.div`
	position: absolute;
	left: 0;
	display: flex;
	align-self: ${({m}) => m.isHugeDesk || m.isDesk ? 'center' : 'flex-start'};
	margin-top: ${({m}) => m.isTabletA ? 40
								: m.isTabletP ? 96
								: m.isMobile ? -100.8
								: 0}px;
	overflow: hidden;
	z-index: 1;
	animation: ${moveX} 10s linear infinite;
`
const Title = styled.h2`
	color: ${ ({theme}) => theme.text };
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 96 : m.isTabletA ? 76 : 48}px;
	text-transform: uppercase;
	white-space: nowrap;
	margin-right: ${({m}) => m.isHugeDesk || m.isDesk ? 30 : 22}px;
	span {
		font-family: 'AccentFontI', sans-serif;
		color: ${ ({accentColor}) => accentColor.dark };
	}
`
const Img = styled.img`
	grid-row: ${({m}) => m.isMobile ? '1/2' : '1/4'};
	grid-column: ${ ({m}) => m.isTabletA ? '3/7'
									: m.isTabletP ? '1/3'
									: m.isMobile ? '1/3'
									: '5/9'};
	width: 100%;
	z-index: 2;
`
const Text = styled.p`
	grid-row: 3/4;
	grid-column: ${ ({m}) => m.isTabletA ? '7/11'
									: m.isTabletP ? '3/5'
									: m.isMobile ? '1/3'
									: '1/5'};
`
const Contacts = styled.div`
	grid-row: ${({m}) => m.isHugeDesk || m.isDesk ? '3/4' : '2/3'};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: ${({m}) => m.isTabletP ? 'center' : 'flex-start'};
	font-family: 'AccentFontM', sans-serif;
	a {
		margin-bottom: 4px;
	}
`
const Messengers = styled(Contacts)`
	grid-column: ${ ({m}) => m.isHugeDesk ? '10/12'
									: m.isDesk ? '9/11'
									: m.isTabletA ? '7/9'
									: m.isTabletP ? '3/4'
									: '1/2'};
`
const Social = styled(Contacts)`
	grid-column: ${ ({m}) => m.isHugeDesk ? '12/13'
									: m.isDesk ? '11/13'
									: m.isTabletA ? '9/13'
									: m.isTabletP ? '4/5'
									: '2/3'};
`
const UpperFooter = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	return <UpperFooterWrap m={media}>
		<TitleWrap m={media}>
			{[...Array(4)].map((v, i) => <Title key={i} m={media} accentColor={accentColor}>Расскажите <span>о своей задаче</span> /</Title>)}
		</TitleWrap>
		<Text m={media}>Я&nbsp;на&nbsp;связи в&nbsp;рабочее время: отвечу на&nbsp;возникшие вопросы, сориентирую в&nbsp;области онлайн-упаковки бизнеса и пойму, что вам необходимо!</Text>
		<Messengers m={media}>
			<a className='linkUnderLine' href="https://vk.com/asyadulova" target="_blank" rel="noreferrer">Vk</a>
			<a className='linkUnderLine' href="https://t.me/asyadulova" target="_blank" rel="noreferrer">Telegramm</a>
			<a className='linkUnderLine' href="mailto:me@asyadulova.ru?subject=Запись на консультацию">Email</a>
		</Messengers>
		<Social m={media}>
			<a className='linkUnderLine' href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">Ig*</a>
			<a className='linkUnderLine' href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">Behance</a>
			<a className='linkUnderLine' href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">Tilda experts</a>
		</Social>
		<Img m={media} src={asyaImg} alt='Asya'/>
	</UpperFooterWrap>
}

export default UpperFooter;