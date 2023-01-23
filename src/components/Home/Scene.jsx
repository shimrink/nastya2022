import React, { Suspense, useState } from 'react';
import { OrthographicCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import Plane from './Plane';

const Scene = ({ currentIndex, caseData, scrollCount, planeW, planeH, planeI, hovering }) => {

	const [prevIndex, setPrevIndex] = useState(0)

	// Move camera on scroll
	useFrame(({camera}) => {
		if (prevIndex !== currentIndex) {
			gsap.to(camera.position, {
				x: (planeW + planeI) * currentIndex / scrollCount,
				y: -planeH * currentIndex / scrollCount,
				duration: 1,
				ease: 'power4.out',
			})
			setPrevIndex(currentIndex)
		}
	})

	return <Suspense fallback={null}>
		<OrthographicCamera makeDefault position={[0, 0, 100]} />
		{caseData.map((post, index) => post.isMainSlider &&
			<Plane key={post.slug.current}
						post={post}
						index={index}
						currentIndex={currentIndex}
						caseData={caseData}
						planeW={planeW}
						planeH={planeH}
						planeI={planeI}
						hovering={hovering} />
		)}
	</Suspense>
}

export default Scene;