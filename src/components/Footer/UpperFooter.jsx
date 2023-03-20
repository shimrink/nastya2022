import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { MediaContext } from '../../AppWrap';
import LetterByLetter from '../common/LetterByLetter';
import asyaImg from '../../assets/images/footerCover.webp';
import { commonTheme } from '../../styles/theme';

const moveX = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-25%);
	}
`
const Wrap = styled.div`
	display: grid;
	grid-template-rows: ${({m}) => m.isMobile ? 'auto' : '1fr 1fr 1fr'};
	grid-template-columns: ${({m}) => m.isTabletP ? 'repeat(4, 1fr)'
												: m.isMobile ? '1fr 1fr'
												: 'repeat(12, 1fr)'};
	grid-row-gap: 48px;
	grid-column-gap: ${({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: m.isTabletP ? '40px'
										: '24px'};
	width: ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%'};
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
	color: ${ ({theme}) => theme.mode.text };
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 96 : m.isTabletA ? 76 : 48}px;
	text-transform: uppercase;
	white-space: nowrap;
	margin-right: ${({m}) => m.isHugeDesk || m.isDesk ? 30 : 22}px;
	transition: color ${commonTheme.durations.short}s;
	span {
		font-family: 'AccentFontM', sans-serif;
		font-weight: 500;
		color: ${ ({theme}) => theme.ac.dark };
		transition: color ${commonTheme.durations.short}s;
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

	return <Wrap m={media}>
		<TitleWrap m={media}>
			{[...Array(4)].map((v, i) => <Title key={i} m={media}>Расскажите <span>о своей задаче</span> /</Title>)}
		</TitleWrap>
		<Text m={media}>Я&nbsp;на&nbsp;связи в&nbsp;рабочее время: отвечу на&nbsp;возникшие вопросы, сориентирую в&nbsp;области онлайн-упаковки бизнеса и пойму, что вам необходимо!</Text>
		<Messengers m={media}>
			<a href="https://vk.com/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter wavy>Vk</LetterByLetter>
			</a>
			<a href="https://t.me/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter wavy>Telegramm</LetterByLetter>
			</a>
			<a href="mailto:me@asyadulova.ru?subject=Запись на консультацию">
				<LetterByLetter wavy>Email</LetterByLetter>
			</a>
		</Messengers>
		<Social m={media}>
			<a href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter wavy>Ig*</LetterByLetter>
			</a>
			<a href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter wavy>Behance</LetterByLetter>
			</a>
			<a href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter wavy>Tilda experts</LetterByLetter>
			</a>
		</Social>
		<Img m={media} src={asyaImg} alt='Asya'/>
	</Wrap>
}

export default UpperFooter;