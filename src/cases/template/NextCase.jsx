import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import LetterByLetter from "../../components/common/LetterByLetter";
import Line from '../../components/common/Line';
import Contacts from './Contacts';

const moveX = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-25%);
	}
`
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`
const Title = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: ${({m}) => m.isMobile ? 'clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin: ${ ({m}) => m.isHugeDesk ? '164px 0'
							: m.isDesk ? '132px 0 120px 0'
							: m.isMobile ? 'clamp(176px, 49.445vw, 240px) 0 clamp(108px, 30.415vw, 148px) 0'
							: '140px 0 96px 0'};
	h3 {
		margin-bottom: 48px;
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		text-transform: uppercase;
	}
`
const Info = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	width: ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%'};
	align-items: end;
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: m.isDesk ? '0 80px'
							: m.isHugeDesk ? '0'
							: '0 40px'};
	img {
		position: relative;
		grid-row: 1/2;
		grid-column: ${({m}) => m.isMobile ? '1/13' : '4/10'};
		width: 100%;
		aspect-ratio: ${({m}) => m.isTabletP || m.isMobile ? '2/3' : '16/9'};
		object-fit: cover;
		margin-bottom: ${({m}) => m.isMobile ? 'clamp(48px, 12.08vw, 52px)' : '0'};
		cursor: pointer;
		z-index: 2;
	}
	a {
		grid-row: ${({m}) => m.isMobile ? '2/3' : '1/2'};
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	}
	.allWorks {
		grid-column: ${({m}) => m.isMobile ? '1/7' : '1/4'};
		justify-self: start;
	}
	.orderProject {
		grid-column: ${({m}) => m.isMobile ? '7/13' : '10/13'};
		justify-self: end;
	}
`
const NameWrap = styled.div`
	position: absolute;
	left: 0;
	display: flex;
	align-self: ${({m}) => m.isMobile ? 'flex-start' : 'center'};
	z-index: 1;
	animation: ${moveX} 10s linear infinite;
`
const Name = styled.h2`
	margin-top: ${({m}) => m.isMobile ? 'clamp(-101px, -21.77vw, -81px)' : 0};
	color: ${ ({theme}) => theme.text };
	font-size: ${ ({m}) => m.isHugeDesk || m.isDesk ? '96px'
								: m.isTabletA ? '76px'
								: m.isMobile ? 'clamp(30px, 9.165vw, 48px)'
								: '48px'};
	text-transform: uppercase;
	white-space: nowrap;
	margin-right: ${({m}) => m.isHugeDesk || m.isDesk ? 30 : 22}px;
`
const Circle = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 146px;
	height: 146px;
	font-family: 'AccentFontB',sans-serif;
	color: ${commonTheme.colors.primary};
	background-color: ${ ({ac}) => ac.dark };
	border-radius: 50%;
	cursor: none;
	z-index: 3;
	transform: translate(-50%, -50%) scale(0);
`
const NextCase = ({ c, i, caseData, pageTransition }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const [nextCaseI, setNextCaseI] = useState(0)
	const wrapperRef = useRef()
	const cirlceRef = useRef()
	const imgRef = useRef()

	useEffect(() => {
		if (i < caseData.length - 1) { setNextCaseI(i + 1) }
		else { setNextCaseI(0) }
	}, [i, caseData])

	useEffect(() => {
		if (media.isHugeDesk || media.isDesk) {
			const el = wrapperRef.current
			const moveCirc = e => {
				gsap.to(cirlceRef.current, {
					top: e.pageY,
					left: e.pageX,
					duration: commonTheme.durations.middle,
					ease: 'power4.out',
				})
				let crd = imgRef.current.getBoundingClientRect()
				if (crd.top <= e.clientY
				&& e.clientY <= crd.bottom
				&& crd.left <= e.clientX
				&& e.clientX <= crd.right) {
					gsap.to(cirlceRef.current, {
						scale: 1,
						duration: commonTheme.durations.short,
						ease: 'power4.out',
					})
				} else {
					gsap.to(cirlceRef.current, {
						scale: 0,
						duration: commonTheme.durations.short,
						ease: 'power4.out',
					})
				}
			}
			el.addEventListener('mousemove', moveCirc)
			return () => el.removeEventListener('mousemove', moveCirc)
		}
	}, [media])

	return <Wrapper ref={wrapperRef}>
		<Title m={media}>
			<h3>Следующий кейс</h3>
			<Line />
		</Title>
		<Info m={media}>
			<NameWrap m={media}>
				{[...Array(4)].map((v, ind) => <Name key={ind} m={media}>{caseData[nextCaseI].title} /</Name>)}
			</NameWrap>
			<img src={ media.isTabletP || media.isMobile ? caseData[nextCaseI].mobileImage.asset.url
																		: caseData[nextCaseI].mainImage.asset.url}
					alt={caseData[nextCaseI].slug.current}
					ref={imgRef}
					onClick={e => pageTransition(e, `/cases/${caseData[nextCaseI].slug.current}`)} />
			<NavLink to='/portfolio' onClick={e => pageTransition(e, '/portfolio')} className='allWorks linkUnderLine'>
				<LetterByLetter>Все работы</LetterByLetter>
			</NavLink>
			<NavLink to='/contacts' onClick={e => pageTransition(e, '/contacts')} className='orderProject linkUnderLine'>
				<LetterByLetter>Заказать проект</LetterByLetter>
			</NavLink>
		</Info>
		<Contacts c={c} />
		{(media.isHugeDesk || media.isDesk) && <Circle ref={cirlceRef} onClick={e => pageTransition(e, `/cases/${caseData[nextCaseI].slug.current}`)} ac={accentColor}>Смотреть</Circle>}
	</Wrapper>
}

export default NextCase;