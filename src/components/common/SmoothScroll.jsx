import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	transform-style: preserve-3d;
`
const SmoothScroll = ({ children, mainRef, setScrollTopV }) => {

	const {pathname} = useLocation()
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

	const offset = (el) => {
		const rect = el.getBoundingClientRect()
		const scrollLeft = window.scrollX || document.documentElement.scrollLeft
		const scrollTop = window.scrollY || document.documentElement.scrollTop
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	const textAnimate = useCallback((val) => {
		const animItems = document.querySelectorAll('.animItems')

		if (animItems.length > 0) {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index]
				const animItemHeight = animItem.offsetHeight
				const animItemOffset = offset(animItem).top
				const animStart = 4 // the animation will work when (1/animStart) of the element height enters the viewport

				let animItemPoint = window.innerHeight - val - animItemHeight / animStart
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - val - window.innerHeight / animStart
				}

				if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
					animItem.style.transform = 'translate(0)'
					animItem.style.opacity = '1'
				} else {
					if (animItem.classList.contains('reAnim')) {
						animItem.style.opacity = '0'
					}
				}
			}
		}
	}, [])

	// preventDefault for keyboard arrows, space and middle mouse button
	const mouseDownHandler = e => { e.preventDefault() }
	const keyDownHandler = e => {
		if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
			e.preventDefault()
		}
	}

	// Animate text on mobile devices
	const touchMoveHandler = e => { textAnimate(200) }

	// up() or down() on scroll
	useEffect(() => {
		const el = wrapRef.current
		const wheelHandler = e => {
			e.preventDefault()
			e.deltaY > 0 ? down() : up()

			textAnimate(200)
		}
		el.addEventListener('wheel', wheelHandler)

		return () => el.removeEventListener('wheel', wheelHandler)
	}, [up, down, textAnimate])

	// Smooth scroll when scrollTopValue changing
	useEffect(() => {
		if (setScrollTopV) setScrollTopV(scrollTopValue)
		gsap.to(mainRef.current, {
			scrollTop: scrollTopValue,
			duration: 1,
			ease: 'power4.out'
		})
	}, [scrollTopValue, mainRef, setScrollTopV])

	// Scroll top on new page
	useEffect(() => {
		gsap.to(mainRef.current, {
			scrollTop: 0,
			duration: 0,
		})
		setScrollTopValue(0)
	}, [pathname, mainRef])

	// auto animation on new page
	useEffect(() => {
		setTimeout(() => {
			textAnimate(0)
		}, 600)
	}, [textAnimate])

	return <Wrapper ref={wrapRef}
						onMouseDown={mouseDownHandler}
						onKeyDown={keyDownHandler}
						onTouchMove={touchMoveHandler}>
		{children}
	</Wrapper>
}

export default SmoothScroll;