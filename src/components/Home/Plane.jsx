import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { Html, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import lerp from 'lerp';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';
import CustomMaterial from '../../shaders/CustomMaterial';

const Case = styled.div.attrs(({carouselSizes}) => ({
	style: {
		width: carouselSizes.w + 'px',
		height: carouselSizes.h + 'px',
	},
}))`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	justify-items: center;
	box-shadow: 12.3417px 117.182px 68.0764px rgba(30, 30, 30, 0.0404687), 8.59017px 81.5614px 44.0297px rgba(30, 30, 30, 0.03375), 5.63398px 53.4932px 27.3213px rgba(30, 30, 30, 0.0289063), 3.39365px 32.2218px 16.4125px rgba(30, 30, 30, 0.025), 1.78962px 16.992px 9.76465px rgba(30, 30, 30, 0.0210938), 0.74236px 7.04851px 5.83906px rgba(30, 30, 30, 0.01625), 0.172334px 1.63626px 3.09707px rgba(30, 30, 30, 0.00953125), 0px 0px 72.3514px rgba(0, 0, 0, 0.08);
`
const Title = styled.h2`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile ? '1/13' : '2/12'};
	align-self: end;
	font-size: ${ ({m}) => m.isMobile ? '10vw'
								: m.isTabletP || m.isTabletA ? '76px'
								: '96px'};
	text-align: center;
	text-transform: uppercase;
	z-index: 2;
`
const Tags = styled.div`
	grid-row: 2/3;
	grid-column: ${({m}) => m.isMobile ? '1/13' : '3/11'};
	align-self: start;
	font-size: ${({m}) => m.isMobile ? 14 : 16}px;
	text-align: center;
	z-index: 2;
`
const Tag = styled.span`
	color: ${commonTheme.colors.primary};
	text-transform: lowercase;
`
const FilterDiv = styled.div`
	position: absolute;
	grid-row: 1/3;
	grid-column: 1/13;
	width: 100%;
	height: 100%;
	background-color: ${commonTheme.colors.quaternary};
	opacity: 20%;
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
				<FilterDiv />
				<Title m={media}>{post.title}</Title>
				<Tags m={media}>{post.tags.map((t, i) =>
					<Tag key={i}>
						{t}{i < post.tags.length - 1 ? ', ' : ''}
					</Tag>
				)}</Tags>
			</Case>
		</Html>
	</mesh>
}

export default Plane;