import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';

const UnderFooterContainer = styled.div`
	position: absolute;
	left: 0;
	display: ${ ({media}) => media === 'mobile' || media === 'tabletP' ? 'grid' : 'flex' };
	grid-row-gap: 24px;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 16 : 14 }px;
	color: ${commonTheme.colors.secondary};
	padding: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '0 40px 40px 40px'
								: media === 'mobile' ? '0 24px 24px 24px'
								: '0 40px 24px 40px'};
`
const Meta = styled.span`
	grid-row: 1/2;
	grid-column: 1/3;
`
const Year = styled.div`
	grid-row: ${ ({media}) => media === 'tabletP' ? '1/2' : '2/3' };
	grid-column: ${ ({media}) => media === 'tabletP' ? '3/5' : '2/3' };
	display: flex;
	flex-direction: column;
	text-align: end;
`
const UnderFooter = () => {

	const media = useContext(MediaContext)

	return <UnderFooterContainer media={media}>
		<Meta>*Meta Platforms Inc. признана экстремистской<br/>организацией и запрещена на территории РФ</Meta>
		<Year media={media}>
			<span>©2023</span>
			<span>ASYADULOVA</span>
		</Year>
	</UnderFooterContainer>
}

export default UnderFooter;