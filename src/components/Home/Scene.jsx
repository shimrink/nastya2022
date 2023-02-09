import React, { Suspense, useState } from 'react';
import { OrthographicCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import Plane from './Plane';

const Scene = ({ currentIndex, caseData, scrollCount, carouselSizes, hovering, hoverNum }) => {

	const [prevIndex, setPrevIndex] = useState(0)

	useFrame(({camera}) => {
		if (prevIndex !== currentIndex) {
			gsap.to(camera.position, {
				x: carouselSizes.i * currentIndex / scrollCount,
				y: -carouselSizes.h * currentIndex / scrollCount,
				duration: 1,
				ease: 'power4.out',
			})
			setPrevIndex(currentIndex)
		}
	})

	return <Suspense fallback={null}>
		<OrthographicCamera makeDefault position={[0, 0, 100]} />
		{caseData.map((p, i) => p.isMainSlider &&
			<Plane key={p.slug.current}
						post={p}
						index={i}
						caseData={caseData}
						carouselSizes={carouselSizes}
						hovering={hovering}
						hoverNum={hoverNum} />
		)}
	</Suspense>
}

export default Scene;