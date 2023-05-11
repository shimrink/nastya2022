import React from 'react'
import styled from 'styled-components'
import { state } from '../../store'
import SectionTitle from '../common/SectionTitle'
import asyaP from '../../assets/images/aboutInfoPortrait.webp'
import asyaA from '../../assets/images/aboutInfoAlbum.webp'

const Wrap = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr ${({ theme }) => theme.common.gridWidth}px 1fr;
	padding-top: 192px;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding-top: 120px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding-top: clamp(96px, 26.67vw, 120px);
	}
`
const Content = styled.div`
	grid-row: 2/3;
	grid-column: 2/3;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/4;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column-gap: 0;
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const Ranks = styled.div`
	grid-row: 1/2;
	grid-column: 7/13;
	display: flex;
	flex-direction: column;
	margin-bottom: 48px;
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 3/5;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/5;
	}
`
const Rank = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: 18px;
	text-transform: uppercase;
	line-height: 110%;
	margin-bottom: 4px;
	&:last-child {
		margin-bottom: 0;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 16px;
	}
`
const Multi = styled.h2`
	grid-row: 2/3;
	grid-column: 7/13;
	color: ${({ theme }) => theme.ac.dark};
	font-family: 'AccentFontM';
	font-weight: 500;
	font-size: clamp(40px, 2.815vw, 48px);
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: clamp(24px, 3.065vw, 30px);
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 3/5;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/5;
		font-size: clamp(22px, 6.075vw, 29px);
	}
`
const Text = styled.p`
	position: relative;
	grid-row: 3/4;
	grid-column: 7/11;
	font-size: 18px;
	margin: 24px 0 168px 0;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 7/12;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 3/5;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/5;
		margin: 24px 0 76px 0;
	}
`
const Landscape = styled.img`
	position: relative;
	grid-row: 4/5;
	grid-column: 7/12;
	align-self: end;
	width: 100%;
	z-index: 2;
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 3/5;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/4;
		transform: translateY(50%);
	}
`
const Portrait = styled.img`
	position: relative;
	grid-row: 1/5;
	grid-column: 2/6;
	align-self: center;
	width: 100%;
	z-index: 1;
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 1/3;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 4/5;
		grid-column: 2/5;
	}
`
const Info = () => {
	return (
		<Wrap>
			<SectionTitle mbMobile='clamp(48px, 14.58vw, 76px)'>
				Здрасьте, я Настя
			</SectionTitle>
			<Content>
				<Ranks className='animItems _anim-show-opacity'>
					{state.aboutRanks.map((r) => (
						<Rank key={r}>{r}</Rank>
					))}
				</Ranks>
				<Multi className='animItems _anim-show-opacity'>
					Мультидисциплинарный дизайнер
				</Multi>
				<Text className='animItems _anim-show-opacity'>
					Дизайнер с командой и широким спектром навыков. Моя команда
					предоставляет комплекс услуг для упаковки бизнеса: от маркетинговых
					исследований и брендинга до оформления соцсетей и разработки сайта.
				</Text>
				<Portrait src={asyaP} alt='Asya' />
				<Landscape src={asyaA} alt='Asya' />
			</Content>
		</Wrap>
	)
}

export default Info
