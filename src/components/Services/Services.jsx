import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'
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
	padding: ${({ m }) => (m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px')};
	margin: ${({ m }) =>
		m.isHugeDesk || m.isDesk ? '288px 0 176px 0' : '196px 0 120px 0'};
	color: ${({ theme }) => theme.mode.text};
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 48 : 30)}px;
	text-align: center;
	text-transform: uppercase;
	transition: color ${commonTheme.durations.short}s;
`
const ProcessOfWorkContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: ${({ m }) =>
		m.isHugeDesk || m.isDesk
			? 'clamp(324px, 25.78vw, 504px)'
			: m.isTabletA || m.isTabletP
			? '120px'
			: 'clamp(62px, 22.775vw, 136px)'};
	margin-bottom: ${({ m }) => (m.isMobile ? 160 : m.isTabletP ? 220 : 480)}px;
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
			<Title m={media}>
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
			{servicesData.map((servicesBlock, index) => (
				<Sections key={index} servicesBlock={servicesBlock} />
			))}
			<ProcessOfWorkContainer m={media}>
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
			<FAQ m={media}>
				<SectionTitle
					mbHugeDesk='0'
					mbDesk='0'
					mbTabletA='0'
					mbTabletP='0'
					mbMobile='0'
				>
					ЧАВО
				</SectionTitle>
				{FAQData.map((f, i) => (
					<FAQRows key={i} f={f} />
				))}
			</FAQ>
			<Footer />
		</Main>
	)
}

export default Services
