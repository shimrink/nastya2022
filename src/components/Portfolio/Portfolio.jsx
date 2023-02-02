import React, { forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { commonTheme } from '../../styles/theme';
import { pageTransition, pageVariants } from '../../styles/animations';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import Rows from './Rows';
import Tabs from './Tabs';
import Grid from './Grid';

const Main = styled(motion.main)`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const TopBlock = styled.div`
	width: 100%;
	background-color: ${({accentColor}) => accentColor.dark};
	padding-top: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 288 : 196 }px;
	transition: background-color ${commonTheme.durations.short}ms;
`
const Title = styled.h2`
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	font-size: ${ ({media}) => media === 'mobile' ? 30 : 48 }px;
	color: ${commonTheme.colors.primary};
	text-transform: uppercase;
	text-align: center;
	margin-bottom: 48px;
`
const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr ${ ({media}) => media !== 'mobile' && '1fr' };
	grid-column-gap: 24px;
	width: 100%;
	padding: ${ ({media}) => media === 'tabletA' ? '100px 40px 0 40px'
											: media === 'tabletP' ? '80px 40px 0 40px'
											: 'clamp(68px, 19.655vw, 96px) 24px 0 24px'};
`
const Portfolio = forwardRef(({ caseData, categoriesData, setTopBlockH }, ref) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)

	useEffect(() => {
		setTopBlockH(ref.current.getBoundingClientRect().height)
	}, [media, setTopBlockH, ref])

	return <Main initial='out' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
		<TopBlock media={media} accentColor={accentColor} ref={ref}>
			<Title media={media}>Проекты,&nbsp;созданные<br/>с&nbsp;вниманием и&nbsp;любовью</Title>
			<Tabs caseData={caseData} categoriesData={categoriesData} />
		</TopBlock>
		{(media === 'hugeDesk' || media === 'desk')
		?
			<Rows caseData={caseData} />
		:
			<GridWrapper media={media}>
				{caseData.map((c, i) => c.isPortfolio &&
					<Grid key={i} c={c} />
				)}
			</GridWrapper>
		}
	</Main>
})

export default Portfolio;