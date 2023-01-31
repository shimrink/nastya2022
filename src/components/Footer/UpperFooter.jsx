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
	grid-template-rows: ${({media}) => media === 'mobile' ? 'auto' : '1fr 1fr 1fr' };
	grid-template-columns: ${({media}) => media === 'tabletP' ? 'repeat(4, 1fr)'
								: media === 'mobile' ? '1fr 1fr'
								: 'repeat(12, 1fr)'};
	grid-row-gap: 48px;
	grid-column-gap: 24px;
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16 }px;
	padding: ${({media}) => media === 'hugeDesk' ? '0'
								: media === 'mobile' ? '0 24px'
								: '0 40px'};
`
const TitleWrap = styled.div`
	position: absolute;
	left: 0;
	display: flex;
	align-self: ${ ({media}) => media === 'tabletA' || media === 'tabletP' ? 'flex-start' : 'center' };
	margin-top: ${({media}) => media === 'tabletA' ? '40'
									: media === 'tabletP' ? '96'
									: 'mobile' ? '100'
									: '0'}px;
	overflow: hidden;
	z-index: ${ ({media}) => media === 'mobile' ? 3 : 1 };
	animation: ${moveX} 10s linear infinite;
`
const Title = styled.h2`
	color: ${ ({theme}) => theme.text };
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 96 : media === 'tabletA' ? 76 : 48 }px;
	text-transform: uppercase;
	white-space: nowrap;
	margin-right: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 30 : 22 }px;
	span {
		font-family: 'AccentFontI', sans-serif;
		color: ${ ({accentColor}) => accentColor.dark };
	}
`
const Img = styled.img`
	grid-row: ${ ({media}) => media === 'mobile' ? '1/2' : '1/4' };
	grid-column: ${ ({media}) => media === 'tabletA' ? '3/7'
										: media === 'tabletP' ? '1/3'
										: media === 'mobile' ? '1/3'
										: '5/9'};
	width: 100%;
	z-index: 2;
`
const Text = styled.p`
	grid-row: 3/4;
	grid-column: ${ ({media}) => media === 'tabletA' ? '7/11'
										: media === 'tabletP' ? '3/5'
										: media === 'mobile' ? '1/3'
										: '1/5'};
`
const Contacts = styled.div`
	grid-row: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? '3/4' : '2/3' };
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: ${ ({media}) => media === 'tabletP' ? 'center' : 'flex-start' };
	font-family: 'AccentFontM', sans-serif;
	a {
		margin-bottom: 4px;
	}
`
const Messengers = styled(Contacts)`
	grid-column: ${ ({media}) => media === 'hugeDesk' ? '10/12'
										: media === 'desk' ? '9/11'
										: media === 'tabletA' ? '7/9'
										: media === 'tabletP' ? '3/4'
										: '1/2'};
`
const Social = styled(Contacts)`
	grid-column: ${ ({media}) => media === 'hugeDesk' ? '12/13'
										: media === 'desk' ? '11/13'
										: media === 'tabletA' ? '9/13'
										: media === 'tabletP' ? '4/5'
										: '2/3'};
`
const UpperFooter = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	return <UpperFooterWrap media={media}>
		<TitleWrap media={media}>
			{[...Array(4)].map((v, i) => <Title key={i} media={media} accentColor={accentColor}>Расскажите <span>о своей задаче</span> /</Title>)}
		</TitleWrap>
		<Text media={media}>Я&nbsp;на&nbsp;связи в&nbsp;рабочее время: отвечу на&nbsp;возникшие вопросы, сориентирую в&nbsp;области онлайн-упаковки бизнеса и пойму, что вам необходимо!</Text>
		<Messengers media={media}>
			<a href="https://vk.com/asyadulova" target="_blank" rel="noreferrer">Vk</a>
			<a href="https://t.me/asyadulova" target="_blank" rel="noreferrer">Telegramm</a>
			<a href="mailto:me@asyadulova.ru?subject=Запись на консультацию">Email</a>
		</Messengers>
		<Social media={media}>
			<a href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">Ig*</a>
			<a href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">Behance</a>
			<a href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">Tilda experts</a>
		</Social>
		<Img media={media} src={asyaImg} alt='Asya'/>
	</UpperFooterWrap>
}

export default UpperFooter;