import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	transform-style: preserve-3d;
`
const SmoothScroll = ({ children, mainRef }) => {

	const scrollStep = 100
	const [scrollTopValue, setScrollTopValue] = useState(0)
	const wrapRef = useRef()

	const up = useCallback(() => {
		if (scrollTopValue > 0) {
			if (scrollTopValue > scrollStep)
				setScrollTopValue(prevState => prevState - scrollStep)
			else
				setScrollTopValue(0)
		}
	}, [scrollTopValue])

	const down = useCallback(() => {
		if (scrollTopValue < wrapRef.current.offsetHeight) {
			if (wrapRef.current.offsetHeight - scrollTopValue >= scrollStep)
				setScrollTopValue(prevState => prevState + scrollStep)
			else
				setScrollTopValue(wrapRef.current.offsetHeight - window.innerHeight)
		}
	}, [scrollTopValue])

	useEffect(() => {
		const el = wrapRef.current
		const onWheel = e => {
			e.preventDefault()
			e.deltaY > 0 ? down() : up()
		}
		el.addEventListener('wheel', onWheel)

		return () => el.removeEventListener('wheel', onWheel)
	}, [up, down])

	useEffect(() => {
		gsap.to(mainRef.current, {
			scrollTop: scrollTopValue,
			duration: 1,
			ease: 'power4.out'
		})
	}, [scrollTopValue, mainRef])

	return <Wrapper ref={wrapRef}>
		{children}
	</Wrapper>
}

export default SmoothScroll;