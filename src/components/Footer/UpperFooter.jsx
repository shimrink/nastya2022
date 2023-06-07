import React from 'react'
import styled, { keyframes } from 'styled-components'
import LetterByLetter from '../common/LetterByLetter'
import asyaImg from '../../assets/images/footerCover.webp'

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
	grid-template-rows: 1fr 1fr 1fr;
	grid-template-columns: repeat(12, 1fr);
	grid-row-gap: 48px;
	grid-column-gap: 24px;
	width: ${({ theme }) => theme.common.gridWidth}px;
	font-size: 18px;
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-template-rows: auto;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: clamp(24px, 7.5vw, 40px);
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const TitleWrap = styled.div`
	position: absolute;
	left: 0;
	display: flex;
	align-self: center;
	overflow: hidden;
	z-index: 1;
	animation: ${moveX} 10s linear infinite;
	@media ${({ theme }) => theme.common.media.tablet} {
		align-self: flex-start;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin-top: 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin-top: 96px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-top: -100.8px;
	}
`
const Title = styled.h2`
	color: ${({ theme }) => theme.mode.text};
	font-size: 96px;
	text-transform: uppercase;
	white-space: nowrap;
	margin-right: 30px;
	transition: color ${({ theme }) => theme.common.durations.short}s;
	span {
		font-family: 'AccentFontM', sans-serif;
		font-weight: 500;
		color: ${({ theme }) => theme.ac.dark};
		transition: color ${({ theme }) => theme.common.durations.short}s;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		margin-right: 22px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 76px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		font-size: 48px;
	}
`
const Img = styled.img`
	grid-row: 1/4;
	grid-column: 5/9;
	width: 100%;
	z-index: 2;
	@media ${({ theme }) => theme.common.media.tabletA} {
		grid-column: 3/7;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 1/3;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 1/2;
	}
`
const Text = styled.p`
	grid-row: 3/4;
	grid-column: 1/5;
	@media ${({ theme }) => theme.common.media.tabletA} {
		grid-column: 7/11;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 3/5;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/3;
	}
`
const Contacts = styled.div`
	grid-row: 3/4;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	font-family: 'AccentFontM', sans-serif;
	a {
		margin-bottom: 4px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		grid-row: 2/3;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		justify-content: center;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		justify-content: flex-start;
	}
`
const Messengers = styled(Contacts)`
	grid-column: 10/12;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 9/11;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		grid-column: 7/9;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 3/4;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/2;
	}
`
const Social = styled(Contacts)`
	grid-column: 12/13;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 11/13;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		grid-column: 9/13;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 4/5;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 2/3;
	}
`
const UpperFooter = () => {
	return (
		<Wrap>
			<TitleWrap>
				{[...Array(4)].map((v, i) => (
					<Title key={i}>
						Расскажите <span>о своей задаче</span> /
					</Title>
				))}
			</TitleWrap>
			<Text>
				Я&nbsp;на&nbsp;связи в&nbsp;рабочее время: отвечу на&nbsp;возникшие
				вопросы, сориентирую в&nbsp;области онлайн-упаковки бизнеса и пойму,
				что вам необходимо!
			</Text>
			<Messengers>
				<a href='https://vk.com/asyadulova' target='_blank' rel='noreferrer'>
					<LetterByLetter wavy>Vk</LetterByLetter>
				</a>
				<a href='https://t.me/asyadulova' target='_blank' rel='noreferrer'>
					<LetterByLetter wavy>Telegramm</LetterByLetter>
				</a>
				<a href='mailto:me@asyadulova.ru?subject=Запись на консультацию'>
					<LetterByLetter wavy>Email</LetterByLetter>
				</a>
			</Messengers>
			<Social>
				<a
					href='https://www.instagram.com/asyadulova'
					target='_blank'
					rel='noreferrer'
				>
					<LetterByLetter wavy>Ig*</LetterByLetter>
				</a>
				<a
					href='https://www.behance.net/asyadulova'
					target='_blank'
					rel='noreferrer'
				>
					<LetterByLetter wavy>Behance</LetterByLetter>
				</a>
				<a
					href='https://experts.tilda.cc/asyadulova'
					target='_blank'
					rel='noreferrer'
				>
					<LetterByLetter wavy>Tilda experts</LetterByLetter>
				</a>
			</Social>
			<Img src={asyaImg} alt='Asya' />
		</Wrap>
	)
}

export default UpperFooter
