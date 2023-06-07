import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import Line from '../../components/common/Line'
import NextCase from './NextCase'

import AsyaDulova from '../AsyaDulova'
import ProfessiiBudushego from '../ProfessiiBudushego'
import Dolgservis from '../Dolgservis'
import Pride from '../Pride'
import Cei from '../Cei'
import PrezentaciiDlyaEksperta from '../PrezentaciiDlyaEksperta'
import Stroimontazh from '../Stroimontazh'
import KrasivyiBiznes from '../KrasivyiBiznes'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 3;
`
const MainCover = styled.img`
	width: 100%;
	height: 100vh;
	object-fit: cover;
`
const TitleWrap = styled.div`
	width: 100%;
	padding: 0 40px;
	margin: 144px 0 76px 0;
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin: 76px 0;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin: 144px 0 48px 0;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const Title = styled.h2`
	font-size: 96px;
	color: ${({ theme }) => theme.mode.text};
	text-transform: uppercase;
	text-align: center;
	margin-bottom: 120px;
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 76px;
		margin-bottom: 96px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		font-size: 48px;
	}
`
const Info = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-row-gap: 48px;
	grid-column-gap: 24px;
	align-self: center;
	width: ${({ theme }) => theme.common.gridWidth}px;
	margin-bottom: 120px;
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
		margin-bottom: 96px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column-gap: clamp(24px, 7.5vw, 40px);
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const InfoName = styled.h4`
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	color: ${({ theme }) => theme.mode.subText};
	margin-bottom: 12px;
	font-size: 18px;
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
	}
`
const InfoDesc = styled.span`
	margin-bottom: 8px;
	font-size: 18px;
	&:last-child {
		margin-bottom: 0;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
	}
`
const Cleint = styled.div`
	grid-row: 1/2;
	grid-column: 1/4;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/7;
	}
`
const Category = styled.div`
	grid-row: 1/2;
	grid-column: 4/7;
	display: flex;
	flex-direction: column;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 7/13;
	}
`
const Year = styled.div`
	grid-row: 1/2;
	grid-column: 7/10;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		grid-column: 1/7;
	}
`
const Button = styled.a`
	grid-row: 1/2;
	grid-column: 10/13;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.ac.light};
	border-radius: 9em;
	align-self: start;
	padding: 16px 0;
	font-family: 'AccentFontM', sans-serif;
	font-weight: 500;
	font-size: 18px;
	color: ${({ theme }) => theme.common.colors.white};
	cursor: pointer;
	transition: background-color ${({ theme }) => theme.common.durations.short}s;
	:hover {
		background-color: ${({ theme }) => theme.ac.dark};
	}
	span {
		margin-right: 12px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		grid-column: 7/13;
	}
`
const Case = ({ setPageInitialized, c, i, caseData, pageTransition }) => {
	const media = useContext(MediaContext)
	const { pathname } = useLocation()

	useEffect(() => {
		setPageInitialized(true)
		document.title = `asyadulova: ${c.title}`
	}, [pathname, setPageInitialized, c])

	// slug должен совпадать с тем, что в Sanity
	const casesArr = [
		{ slug: 'asyadulova', url: AsyaDulova },
		{ slug: 'professii-budushego', url: ProfessiiBudushego },
		{ slug: 'dolgservis', url: Dolgservis },
		{ slug: 'pride', url: Pride },
		{ slug: 'prezentacii-dlya-cei', url: Cei },
		{ slug: 'prezentacii-dlya-eksperta', url: PrezentaciiDlyaEksperta },
		{ slug: 'stroimontazh', url: Stroimontazh },
		{ slug: 'krasivyi-biznes', url: KrasivyiBiznes },
	]

	let CurrentCase
	casesArr.forEach((a) => {
		if (a.slug === c.slug.current) {
			CurrentCase = a.url
		}
	})

	return (
		<Main>
			<MainCover
				src={media.isMobile ? c.mobileImage.asset.url : c.mainImage.asset.url}
				alt={c.slug.current}
			/>
			<TitleWrap>
				<Title>{c.title}</Title>
				<Line />
			</TitleWrap>
			<Info>
				<Cleint>
					<InfoName>Клиент</InfoName>
					<InfoDesc>{c.client}</InfoDesc>
				</Cleint>
				<Category>
					<InfoName>Категория</InfoName>
					{c.categories.map((t) => (
						<InfoDesc key={t.title}>{t.title}</InfoDesc>
					))}
				</Category>
				<Year>
					<InfoName>Год</InfoName>
					<InfoDesc>{c.publishedAt.split('-')[0]}</InfoDesc>
				</Year>
				{c.link && (
					<Button href={`${c.link}`} target='_blank' rel='noreferrer'>
						<span>Посетить</span>
						<svg
							width='14'
							height='14'
							viewBox='0 0 14 14'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M0.646447 12.6464C0.451184 12.8417 0.451184 13.1583 0.646447 13.3536C0.841709 13.5488 1.15829 13.5488 1.35355 13.3536L0.646447 12.6464ZM13.5 0.999999C13.5 0.723858 13.2761 0.5 13 0.499999L8.5 0.5C8.22386 0.499999 8 0.723857 8 0.999999C8 1.27614 8.22386 1.5 8.5 1.5L12.5 1.5L12.5 5.5C12.5 5.77614 12.7239 6 13 6C13.2761 6 13.5 5.77614 13.5 5.5L13.5 0.999999ZM1.35355 13.3536L13.3536 1.35355L12.6464 0.646446L0.646447 12.6464L1.35355 13.3536Z'
								fill='white'
							/>
						</svg>
					</Button>
				)}
			</Info>
			<CurrentCase c={c} />
			<NextCase i={i} caseData={caseData} pageTransition={pageTransition} />
		</Main>
	)
}

export default Case
