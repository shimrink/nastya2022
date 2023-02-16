import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import Line from '../common/Line';

const Case = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: ${({m}) => !m.isMobile ? 72 : 48}px;
	cursor: pointer;
`
const Img = styled.img`
	width: 100%;
	aspect-ratio: 224/277;
	object-fit: cover;
	user-select: none;
	-webkit-user-drag: none;
`
const Name = styled.h3`
	font-size: 30px;
	margin: 24px 0 12px 0;
	text-transform: uppercase;
`
const CaseInfo = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 12px;
`
const Tags = styled.span`
	display: flex;
	font-size: 16px;
	span {
		margin-right: 12px;
	}
	span:last-child {
		margin-right: 0;
	}
`
const Year = styled.span`
	font-size: 16px;
`
const Grid = ({ c, pageTransition }) => {

	const media = useContext(MediaContext)

	return <Case className='rowItem' m={media} onClick={e => pageTransition(e, `cases/${c.slug.current}`)}>
		<Img src={c.mobileImage.asset.url} alt={c.slug.current} />
		<Name>{c.title}</Name>
		<Line />
		<CaseInfo>
			<Tags>
				{c.tags.map((t, i) => <span key={i}> {t} <br/> </span>)}
			</Tags>
			<Year>{c.year}</Year>
		</CaseInfo>
	</Case>
}

export default Grid;