import React, { Fragment } from 'react'
import styled from 'styled-components'
import Line from '../common/Line'

const Case = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 72px;
	cursor: pointer;
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-bottom: 48px;
	}
`
const CaseLink = styled.a`
	display: flex;
	flex-direction: column;
	margin-bottom: 72px;
	cursor: pointer;
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-bottom: 48px;
	}
`
const Img = styled.img`
	width: 100%;
	aspect-ratio: 224/277;
	object-fit: cover;
	user-select: none;
	-webkit-user-drag: none;
	@media ${({ theme }) => theme.common.media.mobile} {
		aspect-ratio: 2/3;
	}
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
	return (
		<Fragment>
			<Img src={c.mobileImage.asset.url} alt={c.slug.current} />
			<Name className='animItems _anim-show-opacity'>{c.title}</Name>
			<Line />
			<CaseInfo>
				<Tags>
					{c.categories.map((t) => (
						<span key={t.title} className='animItems _anim-show-opacity'>
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
	return c.isPortfolio ? (
		<Case
			className='rowItem'
			onClick={() => pageTransition(`cases/${c.slug.current}`)}
		>
			<Content c={c} />
		</Case>
	) : (
		<CaseLink
			className='rowItem'
			href={c.link}
			target='_blank'
			rel='noreferrer'
		>
			<Content c={c} />
		</CaseLink>
	)
}

export default Grid
