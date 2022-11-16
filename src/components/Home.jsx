import React, { useEffect, useState } from 'react';
import sanityClient from '../client.js';
import styled from 'styled-components';
import { commonTheme } from '../styles/theme';
import { Link } from 'react-router-dom';

const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	margin: 40px;
`
const Case = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 24px;
	align-items: center;
	justify-items: center;
	width: 1200px;
`
const Cover = styled.img`
	grid-row: 1/3;
	grid-column: 1/7;
	border-radius: 16px;
	z-index: 1;
	filter: brightness(80%);
`
const Title = styled.h2`
	grid-row: 1/2;
	grid-column: 2/6;
	align-self: end;
	text-transform: uppercase;
	z-index: 2;
`
const Tags = styled.div`
	grid-row: 2/3;
	grid-column: 1/7;
	align-self: start;
	z-index: 2;
`
const Tag = styled.span`
	color: ${commonTheme.colors.primary};
	font-style: italic;
`
const Reminder = styled.span`
	position: absolute;
	bottom: 0;
	margin-bottom: 40px;
	color: ${commonTheme.colors.secondary};
	font-style: italic;
`
const Selection = styled.span`
	font-weight: 600;
`
const Home = () => {

	const [caseData, setCaseData] = useState(null)

	useEffect( () => {
		sanityClient.fetch(`*[_type == "post"]{
			title,
			slug,
			mainImage{
				asset->{
					_id,
					url
				},
				alt
			},
			categories[]->
		}`).then( (data) => setCaseData(data) )
		.catch(console.error)
	}, [])

	let countOfSpaces = 0

	return <Main>
		{caseData && caseData.map((post, index) => (
		<Link to={`/case/${post.slug.current}`} key={post.slug.current}>
			<Case key={index}>
				<Cover src={post.mainImage.asset.url} alt={post.mainImage.alt} />
				<Title>{post.title}</Title>
				<Tags>
					{post.categories.map( c => {
						{countOfSpaces++}
						return <Tag key={c._id}>{c.title}{countOfSpaces < post.categories.length ? ', ' : ''}</Tag>
					})}
				</Tags>
			</Case>
		</Link>
		))}
		<Reminder>(<Selection>скролль</Selection>, чтобы увидеть все)</Reminder>
	</Main>
}

export default Home;