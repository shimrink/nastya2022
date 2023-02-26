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
			if (wrapRef.current.offsetHeight - window.innerHeight - scrollTopValue >= scrollStep)
				setScrollTopValue(prevState => prevState + scrollStep)
			else
				setScrollTopValue(wrapRef.current.offsetHeight - window.innerHeight)
		}
	}, [scrollTopValue])

	const textAnimate = () => {
		// Text animate
		const animItems = document.querySelectorAll('.animItems')

		if (animItems.length > 0) {
			const offset = (el) => {
				const rect = el.getBoundingClientRect()
				const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
				const scrollTop = window.pageYOffset || document.documentElement.scrollTop
				return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
			}

			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index]
				const animItemHeight = animItem.offsetHeight
				const animItemOffset = offset(animItem).top
				const animStart = 4 // the animation will work when (1/animStart) of the element height enters the viewport

				let animItemPoint = window.innerHeight - animItemHeight / animStart
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart
				}

				if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
					animItem.classList.add('_active')
				} else {
					if (animItem.classList.contains('reAnim')) {
						animItem.classList.remove('_active')
					}
				}
			}
		}
	}

	useEffect(() => {
		setTimeout(() => {
			textAnimate()
		}, 600)
	}, [])

	useEffect(() => {
		const el = wrapRef.current
		const onWheel = e => {
			e.preventDefault()
			e.deltaY > 0 ? down() : up()

			textAnimate()
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