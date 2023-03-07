import React, { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import SmoothScroll from '../../components/common/SmoothScroll';
import Line from '../../components/common/Line';
import NextCase from './NextCase';

import AsyaDulova from '../AsyaDulova';
import UivProduction from '../UivProduction';

const Main = styled.main`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 3;
`
const MainCover = styled.img`
	width: 100%;
	height: 100vh;
	object-fit: cover;
`
const Title = styled.div`
	width: 100%;
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin: ${ ({m}) => m.isHugeDesk || m.isDesk ? '144px 0 76px 0'
							: m.isTabletA ? '76px 0 76px 0'
							: '144px 0 48px 0'};
	h2 {
		font-size: ${ ({m}) => m.isHugeDesk || m.isDesk ? 96
									: m.isMobile ? 48
									: 76}px;
		color: ${ ({theme}) => theme.mode.text };
		text-transform: uppercase;
		text-align: center;
		margin-bottom: ${({m}) => m.isHugeDesk || m.isDesk ? 120 : 96}px;
	}
`
const Info = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-row-gap: 48px;
	grid-column-gap: ${ ({m}) => m.isTabletP ? '40px'
										: m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
										: '24px'};
	align-self: center;
	width: ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%'};
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: m.isDesk ? '0 80px'
							: m.isHugeDesk ? '0'
							: '0 40px'};
	margin-bottom: ${({m}) => m.isHugeDesk || m.isDesk ? 120 : 96}px;
	h4 {
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		color: ${({theme}) => theme.mode.subText};
		margin-bottom: 12px;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		text-transform: uppercase;
	}
	span {
		margin-bottom: 8px;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	}
	span:last-child {
		margin-bottom: 0;
	}
`
const Cleint = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile ? '1/7' : '1/4'};
`
const Category = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile ? '7/13' : '4/7'};
	display: flex;
	flex-direction: column;
`
const Year = styled.div`
	grid-row: ${({m}) => m.isMobile ? '2/3' : '1/2'};
	grid-column: ${({m}) => m.isMobile ? '1/7' : '7/10'};
`
const Button = styled.a`
	grid-row: ${({m}) => m.isMobile ? '2/3' : '1/2'};
	grid-column: ${({m}) => m.isMobile ? '7/13' : '10/13'};
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${ ({theme}) => theme.ac.light };
	border-radius: 9em;
	align-self: start;
	padding: 16px 0;
	font-family: 'AccentFontM', sans-serif;
	font-weight: 500;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	color: ${commonTheme.colors.white};
	cursor: pointer;
	transition: background-color ${commonTheme.durations.short}s;
	:hover {
		background-color: ${ ({theme}) => theme.ac.dark };
	}
	span {
		margin: 0 12px 0 0;
	}
`
const Case = ({ setPageInitialized, c, i, caseData, pageTransition }) => {

	const media = useContext(MediaContext)
	const {pathname} = useLocation()
	const mainRef = useRef()

	useEffect(() => {
		setPageInitialized(true)
	}, [pathname, setPageInitialized])

	// slug должен совпадать с тем, что в Sanity
	const casesArr = [
		{ slug: 'asyadulova', url: AsyaDulova },
		{ slug: 'uiv-production', url: UivProduction },
	]

	let CurrentCase
	casesArr.forEach((a) => {
		if (a.slug === c.slug.current) {
			CurrentCase = a.url
		}
	})

	return <Main ref={mainRef}>
		<SmoothScroll mainRef={mainRef}>
			<MainCover src={c.mainImage.asset.url} alt={c.slug.current} />
			<Title m={media}>
				<h2>{c.title}</h2>
				<Line />
			</Title>
			<Info m={media}>
				<Cleint m={media}>
					<h4>Клиент</h4>
					<span>{c.client}</span>
				</Cleint>
				<Category m={media}>
					<h4>Категория</h4>
					{c.tags.map((t, i) => <span key={i}>{t}</span>)}
				</Category>
				<Year m={media}>
					<h4>Год</h4>
					<span>{c.publishedAt.split('-')[0]}</span>
				</Year>
				<Button m={media} href={`${c.link}`} target='_blank' rel="noreferrer">
					<span>Посетить</span>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.646447 12.6464C0.451184 12.8417 0.451184 13.1583 0.646447 13.3536C0.841709 13.5488 1.15829 13.5488 1.35355 13.3536L0.646447 12.6464ZM13.5 0.999999C13.5 0.723858 13.2761 0.5 13 0.499999L8.5 0.5C8.22386 0.499999 8 0.723857 8 0.999999C8 1.27614 8.22386 1.5 8.5 1.5L12.5 1.5L12.5 5.5C12.5 5.77614 12.7239 6 13 6C13.2761 6 13.5 5.77614 13.5 5.5L13.5 0.999999ZM1.35355 13.3536L13.3536 1.35355L12.6464 0.646446L0.646447 12.6464L1.35355 13.3536Z" fill="white"/>
					</svg>
				</Button>
			</Info>
			<CurrentCase i={i} caseData={caseData} />
			<NextCase c={c} i={i} mainRef={mainRef} caseData={caseData} pageTransition={pageTransition} />
		</SmoothScroll>
	</Main>
}

export default Case;