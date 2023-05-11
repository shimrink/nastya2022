import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import SectionTitle from '../common/SectionTitle'
import ProcessOfWork from './ProcessOfWork'
import FAQRows from './FAQRows'
import Sections from './Sections'
import Footer from '../Footer/Footer'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 3;
`
const Title = styled.h1`
	padding: 0 40px;
	margin: 288px 0 176px 0;
	color: ${({ theme }) => theme.mode.text};
	font-size: 48px;
	text-align: center;
	text-transform: uppercase;
	transition: color ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin: 196px 0 120px 0;
		font-size: 30px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const ProcessOfWorkContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: clamp(324px, 25.78vw, 504px) 0 480px 0;
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin-top: 120px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin-bottom: 220px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin: clamp(62px, 22.775vw, 136px) 0 160px 0;
	}
`
const FAQ = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 200px;
`
const Services = ({ setPageInitialized, servicesData, FAQData }) => {
	useEffect(() => {
		setPageInitialized(true)
		document.title = 'asyadulova: брендинг, дизайн, разработка'
	}, [setPageInitialized])

	const media = useContext(MediaContext)

	return (
		<Main>
			<Title>
				Экспертиза, дизайн, разработка —<br />
				весь комплекс услуг для упаковки бизнеса
			</Title>
			{!media.isMobile && (
				<SectionTitle
					mbHugeDesk='48px'
					mbDesk='48px'
					mbTabletA='48px'
					mbTabletP='48px'
				>
					Услуги и компетенции
				</SectionTitle>
			)}
			{servicesData.map((servicesBlock) => (
				<Sections key={servicesBlock.title} servicesBlock={servicesBlock} />
			))}
			<ProcessOfWorkContainer>
				<SectionTitle
					mbHugeDesk='0'
					mbDesk='0'
					mbTabletA='0'
					mbTabletP='0'
					mbMobile='36px'
				>
					Порядок работы
				</SectionTitle>
				<ProcessOfWork />
			</ProcessOfWorkContainer>
			<FAQ>
				<SectionTitle
					mbHugeDesk='0'
					mbDesk='0'
					mbTabletA='0'
					mbTabletP='0'
					mbMobile='0'
				>
					ЧАВО
				</SectionTitle>
				{FAQData.map((f) => (
					<FAQRows key={f.question} f={f} />
				))}
			</FAQ>
			<Footer />
		</Main>
	)
}

export default Services
