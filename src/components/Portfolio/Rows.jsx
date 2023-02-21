import React, { useRef } from 'react';
import styled from 'styled-components';
import Line from '../common/Line';
import RowItem from './RowItem';

const Cases = styled.div`
	padding: 120px 40px;
`
const Rows = ({ mainRef, caseData, pageTransition }) => {

	const casesRef = useRef()

	return <Cases ref={casesRef}>
		<Line />
		{caseData.map((c, i) => c.isPortfolio &&
			<RowItem key={i} c={c} mainRef={mainRef} casesRef={casesRef} caseData={caseData} pageTransition={pageTransition} />
		)}
	</Cases>
}

export default Rows;