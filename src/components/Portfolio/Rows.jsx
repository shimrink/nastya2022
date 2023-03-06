import React, { useRef } from 'react';
import styled from 'styled-components';
import Line from '../common/Line';
import Row from './Row';

const Cases = styled.div`
	padding: 120px 40px;
`
const Rows = ({ scrollTopV, mainRef, caseData, pageTransition }) => {

	const casesRef = useRef()

	return <Cases ref={casesRef}>
		<Line />
		{caseData.map((c, i) => c.isPortfolio &&
			<Row key={i} c={c} scrollTopV={scrollTopV} mainRef={mainRef} casesRef={casesRef} caseData={caseData} pageTransition={pageTransition} />
		)}
	</Cases>
}

export default Rows;