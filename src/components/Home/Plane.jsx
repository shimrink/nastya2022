import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { Html, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import lerp from 'lerp';
import { commonTheme } from '../../styles/theme';
import { MediaContext } from '../../AppWrap';
import CustomMaterial from '../../shaders/CustomMaterial';

const Case = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	justify-items: center;
	width: ${ ({planeW}) => planeW }px;
	height: ${ ({planeH}) => planeH }px;
`
const Title = styled.h2`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'mobile' ? '1/13' : '2/12'};
	align-self: end;
	font-size: ${ ({media}) => media === 'mobile' ? '10vw' : commonTheme.fontSizes.title[media] + 'px'};
	text-align: center;
	text-transform: uppercase;
	z-index: 2;
`
const Tags = styled.div`
	grid-row: 2/3;
	grid-column: ${ ({media}) => media === 'mobile' ? '1/13' : '3/11'};
	align-self: start;
	font-size: ${ ({media}) => commonTheme.fontSizes.tag[media]}px;
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

const Plane = ({ post, index, caseData, planeW, planeH, planeI, hovering }) => {

	const media = useContext(MediaContext)

	const covers = useTexture(caseData.map(c => c.mainImage.asset.url))
	const coversMobile = useTexture(caseData.map(c => c.mobileImage.asset.url))

	const materialRef = useRef()

	let last = 0
	useFrame(({camera}) => {
		let zoom = 0
		media === 'mobile' ? zoom = 0.95 : zoom = 0.85
		hovering
		? materialRef.current.uZoom = lerp(materialRef.current.uZoom, 1, 0.05)
		: materialRef.current.uZoom = lerp(materialRef.current.uZoom, zoom, 0.05)
		materialRef.current.uScale = lerp(materialRef.current.uScale, (camera.position.x - (planeW + planeI) * index) / 4000, 0.05)
		materialRef.current.uShift = lerp(materialRef.current.uShift, ((camera.position.x - (planeW + planeI) * index) - last) / 2000, 0.05)
		last = (camera.position.x - (planeW + planeI) * index)
	})

	return <mesh position={[index * (planeW + planeI), -index * planeH, -110]}>
		<planeGeometry args={[planeW, planeH, 16, 16]} attach='geometry' />
		<customMaterial ref={materialRef} uTexture={media === 'mobile' ? coversMobile[index] : covers[index]} attach='material' />
		<Html center position={[0, 0, -100]}>
			<Case planeW={planeW} planeH={planeH}>
				<FilterDiv />
				<Title media={media}>{post.title}</Title>
				<Tags media={media}>{post.tags.map((t, i) =>
					<Tag key={i}>
						{t}{i < post.tags.length - 1 ? ', ' : ''}
					</Tag>
				)}</Tags>
			</Case>
		</Html>
	</mesh>
}

export default Plane;