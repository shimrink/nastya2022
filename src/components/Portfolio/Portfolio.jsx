import React, { forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import Rows from './Rows';
import Tabs from './Tabs';
import Grid from './Grid';

const Main = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const TopBlock = styled.div`
	width: 100%;
	background-color: ${ ({accentColor}) => accentColor.dark };
	padding-top: ${({m}) => m.isHugeDesk || m.isDesk ? 288 : 196}px;
	transition: background-color ${commonTheme.durations.short}s;
`
const Title = styled.h2`
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	font-size: ${({m}) => m.isMobile ? 30 : 48}px;
	color: ${commonTheme.colors.primary};
	text-transform: uppercase;
	text-align: center;
	margin-bottom: 48px;
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
const Portfolio = forwardRef(({ caseData, categoriesData, setTopBlockH, pageTransition }, ref) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	useEffect(() => {
		setTopBlockH(ref.current.getBoundingClientRect().height)
	}, [media, setTopBlockH, ref])

	return <Main>
		<TopBlock m={media} accentColor={accentColor} ref={ref}>
			<Title m={media}>Проекты,&nbsp;созданные<br/>с&nbsp;вниманием и&nbsp;любовью</Title>
			<Tabs caseData={caseData} categoriesData={categoriesData} />
		</TopBlock>
		{(media.isHugeDesk || media.isDesk)
		?
			<Rows caseData={caseData} pageTransition={pageTransition} />
		:
			<GridWrapper m={media}>
				{caseData.map((c, i) => c.isPortfolio &&
					<Grid key={i} c={c} pageTransition={pageTransition} />
				)}
			</GridWrapper>
		}
	</Main>
})

export default Portfolio;