import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { Html, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import lerp from 'lerp';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';
import CustomMaterial from '../../shaders/CustomMaterial';

const caseAttrs = ({ carouselSizes }) => ({
	style: {
		width: carouselSizes.w + 'px',
		height: carouselSizes.h + 'px',
	}
})
const Case = styled.div.attrs(caseAttrs)`
	display: grid;
	align-items: end;
	justify-items: center;
`
const Content = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 1/2;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-gap: 24px;
	align-items: end;
	width: 100%;
	padding: 24px;
	color: ${commonTheme.colors.primary};
	z-index: 2;
`
const Tags = styled.div`
	position: relative;
	grid-row: ${({m}) => m.isMobile ? '2/3' : '1/3'};
	grid-column: ${({m}) => m.isMobile ? '1/7' : '1/3'};
	display: flex;
	flex-direction: column;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	z-index: 2;
`
const Year = styled.span`
	position: relative;
	grid-row: ${({m}) => m.isMobile ? '2/3' : '1/3'};
	grid-column: ${({m}) => m.isMobile ? '7/13' : '3/5'};
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	text-align: ${({m}) => m.isMobile ? 'end' : 'start'};
	z-index: 2;
`
const Title = styled.h2`
	position: relative;
	grid-row: ${({m}) => m.isMobile ? '1/2' : '1/3'};
	grid-column: ${({m}) => m.isMobile ? '1/13' : '5/13'};
	font-family: 'AccentFontR', sans-serif;
	font-weight: normal;
	font-size: ${ ({m}) => m.isMobile ? 40
								: m.isTabletP ? 48
								: 76}px;
	text-align: ${({m}) => m.isMobile ? 'start' : 'end'};
	text-transform: uppercase;
	z-index: 2;
`
const FilterDiv = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 1/2;
	width: 100%;
	height: 30%;
	background: linear-gradient(180deg, rgba(30, 30, 30, 0) 0%, ${commonTheme.colors.quaternary} 100%);
	z-index: 1;
`
extend({CustomMaterial})

const Plane = ({ post, index, caseData, carouselSizes, hovering, hoverNum }) => {

	const media = useContext(MediaContext)
	const covers = useTexture(caseData.map(c => c.mainImage.asset.url))
	const coversMobile = useTexture(caseData.map(c => c.mobileImage.asset.url))
	const materialRef = useRef()

	let last = 0
	useFrame(({camera}) => {
		let zoom = 1
		media.isMobile ? zoom = 0.95 : zoom = 0.8
		hovering && hoverNum === index
		? materialRef.current.uZoom = lerp(materialRef.current.uZoom, 0.9, 0.05)
		: materialRef.current.uZoom = lerp(materialRef.current.uZoom, zoom, 0.05)
		materialRef.current.uScale = lerp(materialRef.current.uScale, (camera.position.x - carouselSizes.i * index) / 4000, 0.05)
		materialRef.current.uShift = lerp(materialRef.current.uShift, ((camera.position.x - carouselSizes.i * index) - last) / 2000, 0.05)
		last = (camera.position.x - carouselSizes.i * index)
	})

	return <mesh position={[index * carouselSizes.i, -index * carouselSizes.h, -110]}>
		<planeGeometry args={[carouselSizes.w, carouselSizes.h, 16, 16]} attach='geometry' />
		<customMaterial ref={materialRef} uTexture={media.isMobile ? coversMobile[index] : covers[index]} attach='material' />
		<Html center position={[0, 0, -100]}>
			<Case carouselSizes={carouselSizes}>
				<Content>
					<Tags m={media}>
						{post.tags.map((t, i) => <span key={i}>{t}</span>)}
					</Tags>
					<Year m={media}>{post.publishedAt.split('-')[0]}</Year>
					<Title m={media}>{post.title}</Title>
				</Content>
				<FilterDiv />
			</Case>
		</Html>
	</mesh>
}

export default Plane;