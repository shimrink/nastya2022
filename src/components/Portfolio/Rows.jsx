import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import Line from '../common/Line';

const Cases = styled.div`
	padding: 120px 40px;
`
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
	h3.nameActive {
		font-family: 'AccentFontI', sans-serif;
		font-weight: 400;
		color: ${ ({accentColor}) => accentColor.dark };
	}
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
const Rows = ({ caseData, pageTransition }) => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const imgRef = useRef([])
	const nameRef = useRef([])
	const casesRef = useRef()

	useEffect(() => {
		const el = casesRef.current
		const onMouseMove = e => {
			let crd = casesRef.current.getBoundingClientRect()
			if (crd.top <= e.clientY
			&& e.clientY <= crd.bottom
			&& crd.left <= e.clientX
			&& e.clientX <= crd.right) {
				for (let i = 0; i < caseData.length; i++) {
					gsap.to(imgRef.current[i], {
						left: e.pageX + 'px',
						top: e.pageY + 'px',
						duration: commonTheme.durations.middle,
						ease: 'power4.out',
					})
					gsap.to(imgRef.current[i], {
						scale: 1,
						duration: 0,
						ease: 'linear',
					})
				}
			} else {
				for (let i = 0; i < caseData.length; i++) {
					gsap.to(imgRef.current[i], {
						scale: 0,
						duration: 0,
						ease: 'linear',
					})
				}
			}
		}

		el.addEventListener('mousemove', onMouseMove)

		return () => el.removeEventListener('mousemove', onMouseMove)
	}, [caseData])

	const showImg = i => {
		nameRef.current[i].classList.add('nameActive')
		gsap.to(imgRef.current[i], {
			opacity: 1,
			duration: commonTheme.durations.short,
			ease: 'power4.out',
		})
	}

	const hideImg = i => {
		nameRef.current[i].classList.remove('nameActive')
		gsap.to(imgRef.current[i], {
			opacity: 0,
			duration: commonTheme.durations.short,
			ease: 'power4.out',
		})
	}

	return <Cases ref={casesRef}>
		<Line />
		{caseData.map((c, i) => c.isPortfolio &&
			<RowWrap className='rowItem' key={i}>
				<RowContent m={media} accentColor={accentColor}>
					<Name ref={el => nameRef.current[i] = el}>{c.title}</Name>
					<Tags>
						{c.tags.map((t, ind) => <span key={ind}> {t} <br/> </span>)}
					</Tags>
					<Year>{c.year}</Year>
					<Img ref={el => imgRef.current[i] = el} src={c.mobileImage.asset.url} alt={c.slug.current} />
					<RowArea onMouseOver={() => showImg(i)}
								onMouseOut={() => hideImg(i)}
								onClick={e => pageTransition(e, `/cases/${c.slug.current}`)} />
				</RowContent>
				<Line />
			</RowWrap>
		)}
	</Cases>
}

export default Rows;