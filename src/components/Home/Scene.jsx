import React, { Suspense, useState } from 'react';
import { OrthographicCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import Plane from './Plane';

const Scene = ({ currentIndex, caseData, scrollCount, carouselSizes, hovering }) => {

	const [prevIndex, setPrevIndex] = useState(0)

	// Move camera on scroll
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
						currentIndex={currentIndex}
						caseData={caseData}
						carouselSizes={carouselSizes}
						hovering={hovering} />
		)}
	</Suspense>
}

export default Scene;