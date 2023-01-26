import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import state from '../../store';
import { pageTransition, pageVariants } from '../../styles/animations';
import { MediaContext } from '../../AppWrap';
import Row from './Row';
import Line from '../common/Line';
import Tabs from './Tabs';
import Grid from './Grid';

const Main = styled(motion.main)`
	display: flex;
	flex-direction: column;
	width: ${ ({media}) => media === 'hugeDesk' ? state.home.gridWidth + 'px' : '100%' };
	padding: ${({media}) => media === 'hugeDesk' ? '0'
								: media === 'mobile' ? '0 24px'
								: '0 40px'
	};
	margin-top: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 288 : 196 }px;
`
const Title = styled.h2`
	font-size: ${ ({media}) => media === 'mobile' ? 30 : 48 }px;
	color: ${ ({theme}) => theme.text };
	text-transform: uppercase;
	text-align: center;
	margin-bottom: 48px;
`
const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr ${ ({media}) => media !== 'mobile' && '1fr' };
	grid-column-gap: 24px;
	width: 100%;
`
const Portfolio = ({ caseData, categoriesData }) => {

	const media = useContext(MediaContext)

	const mainRef = useRef()

	return caseData && <Main media={media} ref={mainRef} initial='out' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
		<Title media={media}>Проекты,&nbsp;созданные<br/>с&nbsp;вниманием и&nbsp;любовью</Title>
		<Tabs caseData={caseData} categoriesData={categoriesData} />
		<Line top />

		{(media === 'hugeDesk' || media === 'desk')
		?
			caseData.map((c, i) => c.isPortfolio &&
				<Row key={i} mainRef={mainRef} caseData={caseData} c={c} i={i} />
			)
		:
			<GridWrapper media={media}>
				{caseData.map((c, i) => c.isPortfolio &&
					<Grid key={i} c={c} i={i} />
				)}
			</GridWrapper>
		}
	</Main>
}

export default Portfolio;