import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import gsap from 'gsap'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'
import LetterByLetter from '../../components/common/LetterByLetter'
import Contacts from './Contacts'
import SectionTitle from '../../components/common/SectionTitle'

const moveX = keyframes`
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-10%);
	}
`
const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	width: 100%;
	margin-top: ${({ m }) =>
		m.isHugeDesk
			? '164px'
			: m.isDesk
			? '132px'
			: m.isMobile
			? 'clamp(176px, 49.445vw, 240px)'
			: '140px'};
`
const Info = styled.div`
	grid-row: 2/3;
	grid-column: 1/2;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	width: ${({ m }) => (m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%')};
	align-items: end;
	padding: ${({ m }) =>
		m.isMobile
			? '0 clamp(24px, 7.5vw, 40px)'
			: m.isDesk
			? '0 80px'
			: m.isHugeDesk
			? '0'
			: '0 40px'};
`
const NextCover = styled.img`
	position: relative;
	grid-row: 1/2;
	grid-column: ${({ m }) => (m.isMobile ? '1/13' : '4/10')};
	width: 100%;
	aspect-ratio: ${({ m }) => (m.isTabletP || m.isMobile ? '2/3' : '16/9')};
	object-fit: cover;
	margin-bottom: ${({ m }) =>
		m.isMobile ? 'clamp(48px, 12.08vw, 52px)' : '0'};
	cursor: pointer;
	z-index: 2;
`
const CoverArea = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: ${({ m }) => (m.isMobile ? '1/13' : '4/10')};
	width: 100%;
	height: 100%;
	cursor: ${({ m }) => (m.isHugeDesk || m.isDesk ? 'none' : 'pointer')};
	z-index: 4;
`
const NameWrap = styled.div`
	position: absolute;
	left: 0;
	display: flex;
	align-self: ${({ m }) => (m.isMobile ? 'flex-start' : 'center')};
	z-index: 1;
	animation: ${moveX} 10s linear infinite;
`
const Name = styled.h2`
	margin-top: ${({ m }) => (m.isMobile ? 'clamp(-101px, -21.77vw, -81px)' : 0)};
	color: ${({ theme }) => theme.mode.text};
	font-size: ${({ m }) =>
		m.isHugeDesk || m.isDesk
			? '96px'
			: m.isTabletA
			? '76px'
			: m.isMobile
			? 'clamp(30px, 9.165vw, 48px)'
			: '48px'};
	text-transform: uppercase;
	white-space: nowrap;
	margin-right: ${({ m }) => (m.isHugeDesk || m.isDesk ? 30 : 22)}px;
`
const Links = styled.div`
	grid-row: ${({ m }) => (m.isMobile ? '2/3' : '1/2')};
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
	cursor: pointer;
`
const AllWorks = styled(Links)`
	grid-column: ${({ m }) => (m.isMobile ? '1/7' : '1/4')};
	justify-self: start;
`
const OrderProject = styled(Links)`
	grid-column: ${({ m }) => (m.isMobile ? '7/13' : '10/13')};
	justify-self: end;
`
const Circle = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 146px;
	height: 146px;
	font-family: 'AccentFontB', sans-serif;
	color: ${commonTheme.colors.white};
	background-color: ${({ theme }) => theme.ac.dark};
	border-radius: 50%;
	cursor: none;
	z-index: 3;
	transform: translate(-50%, -50%) scale(0);
`
const NextCase = ({ i, caseData, pageTransition }) => {
	const media = useContext(MediaContext)
	const { pathname } = useLocation()
	const [nextCaseI, setNextCaseI] = useState(0)
	const cirlceRef = useRef()
	const imgRef = useRef()

	const circAnim = (e) => {
		if (media.isHugeDesk || media.isDesk) {
			gsap.to(cirlceRef.current, {
				top: e.clientY,
				left: e.clientX,
				duration: commonTheme.durations.middle,
				ease: 'power4.out',
			})
		}
	}

	const showCirc = () => {
		if (media.isHugeDesk || media.isDesk) {
			gsap.to(cirlceRef.current, {
				scale: 1,
				duration: commonTheme.durations.short,
				ease: 'power4.out',
			})
		}
	}

	const hideCirc = () => {
		if (media.isHugeDesk || media.isDesk) {
			gsap.to(cirlceRef.current, {
				scale: 0,
				duration: commonTheme.durations.short,
				ease: 'power4.out',
			})
		}
	}

	useEffect(() => {
		let count = 0
		for (let index = i + 1; index < caseData.length; index++) {
			if (caseData[index].isPortfolio) {
				count++
				setNextCaseI(index)
				break
			}
		}
		if (count === 0) {
			for (let index = 0; index < caseData.length; index++) {
				if (caseData[index].isPortfolio) {
					setNextCaseI(index)
					break
				}
			}
		}
	}, [i, caseData])

	useEffect(() => {
		if (media.isHugeDesk || media.isDesk) {
			gsap.to(cirlceRef.current, {
				scale: 0,
				duration: 0,
			})
		}
	}, [pathname, media])

	return (
		<Wrapper m={media} onMouseMove={circAnim}>
			<SectionTitle
				gc='1/2'
				mbHugeDesk='164px'
				mbDesk='120px'
				mbTabletA='96px'
				mbTabletP='96px'
				mbMobile='clamp(108px, 30.415vw, 148px)'
			>
				Следующий кейс
			</SectionTitle>
			<Info m={media}>
				<NameWrap m={media}>
					{[...Array(10)].map((v, ind) => (
						<Name key={ind} m={media}>
							{caseData[nextCaseI].title} /
						</Name>
					))}
				</NameWrap>
				<NextCover
					m={media}
					src={
						media.isTabletP || media.isMobile
							? caseData[nextCaseI].mobileImage.asset.url
							: caseData[nextCaseI].mainImage.asset.url
					}
					alt={caseData[nextCaseI].slug.current}
					ref={imgRef}
				/>
				<CoverArea
					m={media}
					onMouseOver={showCirc}
					onMouseOut={hideCirc}
					onClick={() =>
						pageTransition(`/cases/${caseData[nextCaseI].slug.current}`)
					}
				/>
				<AllWorks m={media} onClick={() => pageTransition('/portfolio')}>
					<LetterByLetter wavy>Все работы</LetterByLetter>
				</AllWorks>
				<OrderProject m={media} onClick={() => pageTransition('/contacts')}>
					<LetterByLetter wavy>Заказать проект</LetterByLetter>
				</OrderProject>
			</Info>
			<Contacts />
			{(media.isHugeDesk || media.isDesk) && (
				<Circle
					ref={cirlceRef}
					onClick={() =>
						pageTransition(`/cases/${caseData[nextCaseI].slug.current}`)
					}
				>
					Смотреть
				</Circle>
			)}
		</Wrapper>
	)
}

export default NextCase
