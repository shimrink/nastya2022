import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import LetterByLetter from '../common/LetterByLetter';
import Line from '../common/Line';

const RowWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`
const RowContent = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	align-items: center;
	width: ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '100%'};
	padding: ${({m}) => m.isHugeDesk ? '0' : '0 40px'};
`
const RowArea = styled.div`
	grid-row: 1/2;
	grid-column: 1/13;
	position: relative;
	width: 100%;
	height: 100%;
	cursor: pointer;
	z-index: 4;
`
const Name = styled.h3`
	grid-row: 1/2;
	grid-column: 1/10;
	position: relative;
	font-size: 76px;
	margin: 48px 0;
	text-transform: uppercase;
	z-index: 1;
`
const Tags = styled.div`
	grid-row: 1/2;
	grid-column: 10/12;
	position: relative;
	font-size: clamp(16px, 1.1vw, 18px);
	z-index: 1;
`
const Year = styled.span`
	grid-row: 1/2;
	grid-column: 12/13;
	position: relative;
	font-size: clamp(16px, 1.1vw, 18px);
	z-index: 1;
`
const Img = styled.img`
	position: absolute;
	opacity: 0;
	width: 312px;
	height: 386px;
	object-fit: cover;
	transform: translate(-50%, -50%) scale(0);
	user-select: none;
	-webkit-user-drag: none;
	z-index: 2;
`
const RowItem = ({ c, mainRef, casesRef, caseData, pageTransition }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const [active, setActive] = useState(false)
	const imgRef = useRef()

	useEffect(() => {
		const el = casesRef.current
		const onMouseMove = e => {
			let crd = casesRef.current.getBoundingClientRect()
			if (crd.top <= e.clientY
			&& e.clientY <= crd.bottom
			&& crd.left <= e.clientX
			&& e.clientX <= crd.right) {
				for (let i = 0; i < caseData.length; i++) {
					gsap.to(imgRef.current, {
						left: e.clientX,
						top: e.clientY + mainRef.current.scrollTop,
						duration: commonTheme.durations.middle,
						ease: 'power4.out',
					})
					gsap.to(imgRef.current, {
						scale: 1,
						duration: 0,
						ease: 'linear',
					})
				}
			} else {
				for (let i = 0; i < caseData.length; i++) {
					gsap.to(imgRef.current, {
						scale: 0,
						duration: 0,
						ease: 'linear',
					})
				}
			}
		}

		el.addEventListener('mousemove', onMouseMove)

		return () => el.removeEventListener('mousemove', onMouseMove)
	}, [mainRef, casesRef, caseData])

	const showImg = e => {
		gsap.to(imgRef.current, {
			opacity: 1,
			duration: commonTheme.durations.short,
			ease: 'power4.out',
		})
		setActive(true)
	}

	const hideImg = e => {
		gsap.to(imgRef.current, {
			opacity: 0,
			duration: commonTheme.durations.short,
			ease: 'power4.out',
		})
		setActive(false)
	}

	return <RowWrap className='rowItem'>
		<RowContent m={media} accentColor={accentColor}>
			<Name>
				<LetterByLetter titleItem active={active}>{c.title}</LetterByLetter>
			</Name>
			<Tags>
				{c.tags.map((t, ind) => <span key={ind}> {t} <br/> </span>)}
			</Tags>
			<Year>{c.publishedAt.split('-')[0]}</Year>
			<Img ref={imgRef} src={c.mobileImage.asset.url} alt={c.slug.current} />
			<RowArea onMouseOver={showImg}
						onMouseOut={hideImg}
						onClick={e => pageTransition(e, `/cases/${c.slug.current}`)} />
		</RowContent>
		<Line />
	</RowWrap>
}

export default RowItem;