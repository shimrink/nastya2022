import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';
import SmoothScroll from '../common/SmoothScroll';
import Rows from './Rows';
import Tabs from './Tabs';
import Grid from './Grid';
import Footer from '../Footer/Footer';

const Main = styled.main`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
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
	transition: color ${commonTheme.durations.short}s;
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
const Portfolio = ({ setPageInitialized, caseData, categoriesData, pageTransition }) => {

	useEffect(() => {
		setPageInitialized(true)
	}, [setPageInitialized])

	const media = useContext(MediaContext)
	const [scrollTopV, setScrollTopV] = useState(0)
	const mainRef = useRef()

	return <Main ref={mainRef}>
		<SmoothScroll mainRef={mainRef} setScrollTopV={setScrollTopV}>
			<TopBlock m={media}>
				<Title m={media} className='animItems _anim-show-opacity'>Проекты,&nbsp;созданные<br/>с&nbsp;вниманием и&nbsp;любовью</Title>
				<Tabs caseData={caseData} categoriesData={categoriesData} />
			</TopBlock>
			{(media.isHugeDesk || media.isDesk)
			?
				<Rows scrollTopV={scrollTopV} mainRef={mainRef} caseData={caseData} pageTransition={pageTransition} />
			:
				<GridWrapper m={media}>
					{caseData.map((c, i) => c.isPortfolio &&
						<Grid key={i} c={c} pageTransition={pageTransition} />
					)}
				</GridWrapper>
			}
			<Footer />
		</SmoothScroll>
	</Main>
}

export default Portfolio;