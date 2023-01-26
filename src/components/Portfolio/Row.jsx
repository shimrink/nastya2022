import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import gsap from 'gsap';
import Line from '../common/Line';
import { AccentColorContext } from '../../AppWrap';

const RowContent = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	align-items: center;
	width: 100%;
	padding: 0 40px;
	h3.nameActive {
		font-family: 'AccentFontI', sans-serif;
		font-weight: 400;
		color: ${ ({accentColor}) => accentColor.dark };
	}
`
const RowArea = styled.div`
	grid-row: 1/2;
	grid-column: 1/13;
	width: 100%;
	height: 100%;
	z-index: 3;
`
const Name = styled.h3`
	grid-row: 1/2;
	grid-column: 1/10;
	font-size: ${commonTheme.fontSizes.title.tabletA}px;
	margin: 48px 0;
	text-transform: uppercase;
	z-index: 1;
`
const Tags = styled.div`
	grid-row: 1/2;
	grid-column: 10/12;
	font-size: clamp(16px, 1.1vw, 18px);
	z-index: 1;
`
const Year = styled.span`
	grid-row: 1/2;
	grid-column: 12/13;
	font-size: clamp(16px, 1.1vw, 18px);
	z-index: 1;
`
const Img = styled.img`
	position: absolute;
	opacity: 0;
	width: 312px;
	height: 386px;
	object-fit: cover;
	transform: translate(-50%, -50%);
	user-select: none;
	-webkit-user-drag: none;
	z-index: 2;
`
const Row = ({ mainRef, caseData, c, i }) => {

	const navigate = useNavigate()

	const accentColor = useContext(AccentColorContext)

	const [hovering, setHovering] = useState(false)
	const imgRef = useRef([])
	const nameRef = useRef([])

	useEffect(() => {
		if (caseData && mainRef) {
			const el = mainRef.current
			const onMouseMove = e => {
				for (let index = 0; index < caseData.length; index++) {
					if (imgRef.current[index]) {
						gsap.to(imgRef.current[index], {
							left: e.pageX + 'px',
							top: e.pageY + 'px',
							duration: commonTheme.durations.middle / 1000,
							ease: 'power4.out',
						})
					}
				}
			}

			el.addEventListener('mousemove', onMouseMove)

			return () => el.removeEventListener('mousemove', onMouseMove)
		}
	})

		const showImg = i => {
			setHovering(true)
			nameRef.current[i].classList.add('nameActive')
			const tl = gsap.timeline()
			tl.to(imgRef.current[i], {
				scale: 1,
				duration: 0,
				ease: 'none',
			})
			tl.to(imgRef.current[i], {
				opacity: 1,
				duration: commonTheme.durations.short / 1000,
				ease: 'power4.out',
			})
		}

		const hideImg = i => {
			setHovering(false)
			nameRef.current[i].classList.remove('nameActive')
			const tl = gsap.timeline()
			tl.to(imgRef.current[i], {
				opacity: 0,
				duration: commonTheme.durations.short / 1000,
				ease: 'power4.out',
			})
			if (!hovering) {
				tl.to(imgRef.current[i], {
					scale: 0,
					duration: 0,
					ease: 'none',
				})
			}
		}

	return <div className='rowItem'>
		<RowContent accentColor={accentColor}>
			<Name ref={el => nameRef.current[i] = el}>{c.title}</Name>
			<Tags>
				{c.tags.map((t, i) => <span key={i}> {t} <br/> </span>)}
			</Tags>
			<Year>{c.year}</Year>
			<Img ref={el => imgRef.current[i] = el} src={c.mobileImage.asset.url} alt={c.slug.current} />
			<RowArea onMouseOver={() => showImg(i)}
						onMouseOut={() => hideImg(i)}
						onClick={() => navigate(`case/${c.slug.current}`)} />
		</RowContent>
		<Line />
	</div>
}

export default Row;