import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MediaContext } from '../../App';
import Line from './Line';

const Case = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: ${ ({media}) => media !== 'mobile' ? 72 : 48 }px;
	cursor: pointer;
`
const Img = styled.img`
	width: 100%;
	height: ${ ({imgH}) => imgH }px;
	object-fit: cover;
	user-select: none;
	-webkit-user-drag: none;
`
const Name = styled.h3`
	font-family: 'WinterEL', sans-serif;
	font-weight: 200;
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
const Grid = ({ c, i }) => {

	const media = useContext(MediaContext)

	const navigate = useNavigate()
	const [imgH, setImgH] = useState(0)

	const CalcH = () => {
		const firstImg = document.querySelectorAll('.mobileCaseImg')[0]
		setImgH(firstImg.getBoundingClientRect().width * 1.235)
	}

	useEffect(() => {
		CalcH()
	}, [])

	useEffect(() => {
		window.addEventListener('resize', CalcH)
		return () => window.removeEventListener('resize', CalcH)
	})

	return <Case className='rowItem' media={media} onClick={() => navigate(`case/${c.slug.current}`)}>
		<Img className='mobileCaseImg' imgH={imgH} src={c.mobileImage.asset.url} alt={c.slug.current} />
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