import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';
import LetterByLetter from '../common/LetterByLetter';
import Line from '../common/Line';

const RowWrap = styled.div`
	display: grid;
	justify-items: center;
	width: 100%;
	overflow: hidden;
	transition: height ${commonTheme.durations.short}s;
`
const RowContent = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
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
	display: flex;
	flex-direction: column;
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
const LineWrap = styled.div`
	position: absolute;
	grid-row: 1/2;
	grid-column: 1/2;
	align-self: end;
	width: 100%;
	padding: 0 40px;
`
gsap.registerPlugin(CustomEase);

const Row = ({ c, scrollTopV, casesRef, caseData, pageTransition }) => {

	const media = useContext(MediaContext)
	const [hovering, setHovering] = useState(false)
	const imgRef = useRef()

	useEffect(() => {
		const el = casesRef.current
		const moveImg = e => {
			let crd = casesRef.current.getBoundingClientRect()
			if (crd.top <= e.clientY
			&& e.clientY <= crd.bottom
			&& crd.left <= e.clientX
			&& e.clientX <= crd.right) {
				for (let i = 0; i < caseData.length; i++) {
					gsap.to(imgRef.current, {
						left: e.clientX,
						top: e.clientY + scrollTopV,
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
		el.addEventListener('mousemove', moveImg)

		return () => el.removeEventListener('mousemove', moveImg)
	}, [casesRef, scrollTopV, caseData])

	useEffect(() => {
		const el = casesRef.current
		const moveImgH = e => {
			let st = e.deltaY > 0 ? 100 : -100
			gsap.to(imgRef.current, {
				top: e.clientY + scrollTopV + st,
				duration: commonTheme.durations.long,
				ease: 'power4.out',
			})
		}
		el.addEventListener('wheel', moveImgH)

		return () => el.removeEventListener('wheel', moveImgH)
	}, [casesRef, scrollTopV])

	const showImg = e => {
		gsap.to(imgRef.current, {
			opacity: 1,
			duration: commonTheme.durations.short,
			ease: 'power4.out',
		})
		setHovering(true)
	}

	const hideImg = e => {
		gsap.to(imgRef.current, {
			opacity: 0,
			duration: commonTheme.durations.short,
			ease: 'power4.out',
		})
		setHovering(false)
	}

	return <RowWrap className='rowItem'>
		<RowContent m={media}>
			<Name>
				<LetterByLetter wavy showAnim titleSize hovering={hovering}>{c.title}</LetterByLetter>
			</Name>
			<Tags className='animItems _anim-show-opacity'>
				{c.tags.map((t, ind) => <span key={ind}>{t}</span>)}
			</Tags>
			<Year className='animItems _anim-show-opacity'>{c.publishedAt.split('-')[0]}</Year>
			<Img ref={imgRef} src={c.mobileImage.asset.url} alt={c.slug.current} />
			<RowArea onClick={e => pageTransition(`/cases/${c.slug.current}`)}
						onMouseOver={showImg}
						onMouseOut={hideImg} />
		</RowContent>
		<LineWrap><Line /></LineWrap>
	</RowWrap>
}

export default Row;