import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import gsap from 'gsap';
import Line from '../common/Line';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import state from '../../store';

const Cases = styled.div`
	padding: 120px 40px;
	margin-top: ${({topBlockH}) => topBlockH}px;
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
	width: ${ ({media}) => media === 'hugeDesk' ? state.home.gridWidth + 'px' : '100%' };
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
	font-size: ${commonTheme.fontSizes.title.tabletA}px;
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
const Rows = ({ caseData, topBlockH }) => {

	const navigate = useNavigate()

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const imgRef = useRef([])
	const nameRef = useRef([])
	const casesRef = useRef()

	useEffect(() => {
		if (caseData && casesRef) {
			const onMouseMove = e => {
				let crd = casesRef.current.getBoundingClientRect()
				if (crd.top <= e.clientY
				&& e.clientY <= crd.bottom
				&& crd.left <= e.clientX
				&& e.clientX <= crd.right) {
					for (let i = 0; i < caseData.length; i++) {
						if (imgRef.current[i]) {
							gsap.to(imgRef.current[i], {
								left: e.pageX + 'px',
								top: e.pageY + 'px',
								duration: commonTheme.durations.middle / 1000,
								ease: 'power4.out',
							})
							gsap.to(imgRef.current[i], {
								scale: 1,
								duration: 0,
								ease: 'linear',
							})
						}
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

			window.addEventListener('mousemove', onMouseMove)

			return () => window.removeEventListener('mousemove', onMouseMove)
		}
	})

	const showImg = i => {
		nameRef.current[i].classList.add('nameActive')
		gsap.to(imgRef.current[i], {
			opacity: 1,
			duration: commonTheme.durations.short / 1000,
			ease: 'power4.out',
		})
	}

	const hideImg = i => {
		nameRef.current[i].classList.remove('nameActive')
		gsap.to(imgRef.current[i], {
			opacity: 0,
			duration: commonTheme.durations.short / 1000,
			ease: 'power4.out',
		})
	}

	return <Cases ref={casesRef} topBlockH={topBlockH}>
		<Line />
		{caseData.map((c, i) => c.isPortfolio &&
			<RowWrap className='rowItem' key={i}>
				<RowContent media={media} accentColor={accentColor}>
					<Name ref={el => nameRef.current[i] = el}>{c.title}</Name>
					<Tags>
						{c.tags.map((t, ind) => <span key={ind}> {t} <br/> </span>)}
					</Tags>
					<Year>{c.year}</Year>
					<Img ref={el => imgRef.current[i] = el} src={c.mobileImage.asset.url} alt={c.slug.current} />
					<RowArea onMouseOver={() => showImg(i)}
								onMouseOut={() => hideImg(i)}
								onClick={() => navigate(`cases/${c.slug.current}`)} />
				</RowContent>
				<Line />
			</RowWrap>
		)}
	</Cases>
}

export default Rows;