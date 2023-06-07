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
	margin-top: 164px;
	@media ${({ theme }) => theme.common.media.desk} {
		margin-top: 132px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		margin-top: 140px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-top: clamp(176px, 49.445vw, 240px);
	}
`
const Info = styled.div`
	grid-row: 2/3;
	grid-column: 1/2;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	width: ${({ theme }) => theme.common.gridWidth}px;
	align-items: end;
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const NextCover = styled.img`
	position: relative;
	grid-row: 1/2;
	grid-column: 4/10;
	width: 100%;
	aspect-ratio: 6/9;
	object-fit: cover;
	cursor: pointer;
	z-index: 2;
	@media ${({ theme }) => theme.common.media.tabletP} {
		aspect-ratio: 2/3;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/13;
		margin-bottom: clamp(48px, 12.08vw, 52px);
	}
`
const CoverArea = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 4/10;
	width: 100%;
	height: 100%;
	cursor: none;
	z-index: 4;
	@media ${({ theme }) => theme.common.media.tablet} {
		cursor: pointer;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/13;
	}
`
const NameWrap = styled.div`
	position: absolute;
	left: 0;
	display: flex;
	align-self: center;
	z-index: 1;
	animation: ${moveX} 10s linear infinite;
	@media ${({ theme }) => theme.common.media.mobile} {
		align-self: flex-start;
	}
`
const Name = styled.h2`
	margin-right: 30px;
	color: ${({ theme }) => theme.mode.text};
	font-size: 96px;
	text-transform: uppercase;
	white-space: nowrap;
	@media ${({ theme }) => theme.common.media.tablet} {
		margin-right: 22px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		font-size: 76px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		font-size: 48px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-top: clamp(-101px, -21.77vw, -81px);
		font-size: clamp(30px, 9.165vw, 48px);
	}
`
const Links = styled.div`
	grid-row: 1/2;
	font-size: 18px;
	cursor: pointer;
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
	}
`
const AllWorks = styled(Links)`
	grid-column: 1/4;
	justify-self: start;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/7;
	}
`
const OrderProject = styled(Links)`
	grid-column: 10/13;
	justify-self: end;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 7/13;
	}
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
	color: ${({ theme }) => theme.common.colors.white};
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
		<Wrapper onMouseMove={circAnim}>
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
			<Info>
				<NameWrap>
					{[...Array(10)].map((v, ind) => (
						<Name key={ind}>{caseData[nextCaseI].title} /</Name>
					))}
				</NameWrap>
				<NextCover
					src={
						media.isTabletP || media.isMobile
							? caseData[nextCaseI].mobileImage.asset.url
							: caseData[nextCaseI].mainImage.asset.url
					}
					alt={caseData[nextCaseI].slug.current}
					ref={imgRef}
				/>
				<CoverArea
					onMouseOver={showCirc}
					onMouseOut={hideCirc}
					onClick={() =>
						pageTransition(`/cases/${caseData[nextCaseI].slug.current}`)
					}
				/>
				<AllWorks onClick={() => pageTransition('/portfolio')}>
					<LetterByLetter wavy>Все работы</LetterByLetter>
				</AllWorks>
				<OrderProject onClick={() => pageTransition('/contacts')}>
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
