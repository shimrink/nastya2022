import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import Tabs from './Tabs';
import Row from './Row';
import Grid from './Grid';
import Footer from '../Footer/Footer';
import Line from '../common/Line';

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 3;
`
const TopBlock = styled.div`
	width: 100%;
	padding-top: ${({m}) => m.isHugeDesk || m.isDesk ? 288 : 196}px;
`
const Title = styled.h2`
	font-size: ${({m}) => m.isMobile ? 30 : 48}px;
	color: ${ ({theme}) => theme.mode.text };
	text-transform: uppercase;
	text-align: center;
	margin-bottom: 48px;
`
const Rows = styled.div`
	padding: 120px 40px;
`
const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({m}) => !m.isMobile && '1fr'};
	grid-column-gap: ${({m}) => m.isTabletP ? '40px' : '24px'};
	width: 100%;
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin-top: ${({m}) => m.isTabletA ? '100px'
								: m.isTabletP ? '80px'
								: 'clamp(68px, 19.655vw, 96px)'};
`
const Portfolio = ({ setPageInitialized, accentColor, caseData, categoriesData, pageTransition }) => {

	useEffect(() => {
		setPageInitialized(true)
	}, [setPageInitialized])

	const media = useContext(MediaContext)
	const rowsRef = useRef()

	return <Main>
		<TopBlock m={media}>
			<Title m={media} className='animItems _anim-show-opacity'>Проекты,&nbsp;созданные<br/>с&nbsp;вниманием и&nbsp;любовью</Title>
			<Tabs accentColor={accentColor} caseData={caseData} categoriesData={categoriesData} />
		</TopBlock>
		{(media.isHugeDesk || media.isDesk)
		?
			<Rows ref={rowsRef}>
				<Line />
				{caseData.map((c, i) => c.isPortfolio &&
					<Row key={i} c={c} rowsRef={rowsRef} caseData={caseData} pageTransition={pageTransition} />
				)}
			</Rows>
		:
			<GridWrapper m={media}>
				{caseData.map((c, i) => c.isPortfolio &&
					<Grid key={i} c={c} pageTransition={pageTransition} />
				)}
			</GridWrapper>
		}
		<Footer />
	</Main>
}

export default Portfolio;