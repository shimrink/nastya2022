import React, { Fragment, useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import Line from '../common/Line'

const Case = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: ${({ m }) => (!m.isMobile ? 72 : 48)}px;
	cursor: pointer;
`
const CaseLink = styled.a`
	display: flex;
	flex-direction: column;
	margin-bottom: ${({ m }) => (!m.isMobile ? 72 : 48)}px;
	cursor: pointer;
`
const Img = styled.img`
	width: 100%;
	aspect-ratio: ${({ m }) => (m.isMobile ? '2/3' : '224/277')};
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
const Content = ({ c }) => {
	const media = useContext(MediaContext)

	return (
		<Fragment>
			<Img m={media} src={c.mobileImage.asset.url} alt={c.slug.current} />
			<Name className='animItems _anim-show-opacity'>{c.title}</Name>
			<Line />
			<CaseInfo>
				<Tags>
					{c.categories.map((t, i) => (
						<span key={i} className='animItems _anim-show-opacity'>
							{t.title}
						</span>
					))}
				</Tags>
				<Year className='animItems _anim-show-opacity'>
					{c.publishedAt.split('-')[0]}
				</Year>
			</CaseInfo>
		</Fragment>
	)
}

const Grid = ({ c, pageTransition }) => {
	const media = useContext(MediaContext)

	return c.isPortfolio ? (
		<Case
			className='rowItem'
			m={media}
			onClick={() => pageTransition(`cases/${c.slug.current}`)}
		>
			<Content c={c} />
		</Case>
	) : (
		<CaseLink
			className='rowItem'
			m={media}
			href={c.link}
			target='_blank'
			rel='noreferrer'
		>
			<Content c={c} />
		</CaseLink>
	)
}

export default Grid
