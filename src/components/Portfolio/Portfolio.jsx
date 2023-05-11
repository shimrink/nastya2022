import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import Tabs from './Tabs'
import Row from './Row'
import Grid from './Grid'
import Footer from '../Footer/Footer'
import Line from '../common/Line'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 3;
`
const TopBlock = styled.div`
	width: 100%;
	padding-top: 288px;
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding-top: 196px;
	}
`
const Title = styled.h2`
	font-size: 48px;
	color: ${({ theme }) => theme.mode.text};
	text-transform: uppercase;
	text-align: center;
	margin-bottom: 48px;
	@media ${({ theme }) => theme.common.media.mobile} {
		font-size: 30px;
	}
`
const Rows = styled.div`
	padding: 120px 40px;
`
const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 24px;
	width: 100%;
	padding: 0 40px;
	margin-top: clamp(68px, 19.655vw, 96px);
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin-top: 100px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
		margin-top: 80px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-template-columns: 1fr;
		grid-column-gap: 24px;
		padding: 0 clamp(24px, 7.5vw, 40px);
		margin-top: clamp(68px, 19.655vw, 96px);
	}
`
const Portfolio = ({
	setPageInitialized,
	accentColor,
	caseData,
	categoriesData,
	pageTransition,
}) => {
	useEffect(() => {
		setPageInitialized(true)
		document.title = 'asyadulova: все кейсы'
	}, [setPageInitialized])

	const media = useContext(MediaContext)
	const rowsRef = useRef()

	return (
		<Main>
			<TopBlock>
				<Title className='animItems _anim-show-opacity'>
					Проекты,&nbsp;созданные
					<br />
					с&nbsp;вниманием и&nbsp;любовью
				</Title>
				<Tabs
					accentColor={accentColor}
					caseData={caseData}
					categoriesData={categoriesData}
				/>
			</TopBlock>
			{media.isHugeDesk || media.isDesk ? (
				<Rows ref={rowsRef}>
					<Line />
					{caseData.map((c) => (
						<Row
							key={c.slug.current}
							c={c}
							rowsRef={rowsRef}
							caseData={caseData}
							pageTransition={pageTransition}
						/>
					))}
				</Rows>
			) : (
				<GridWrapper>
					{caseData.map((c) => (
						<Grid key={c.slug.current} c={c} pageTransition={pageTransition} />
					))}
				</GridWrapper>
			)}
			<Footer />
		</Main>
	)
}

export default Portfolio
