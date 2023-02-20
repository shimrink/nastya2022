import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useWindowSize from "./hooks/useWindowSize";

const Ss = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
`
const SmoothScroll = ({ children }) => {
	const windowSize = useWindowSize();

	const scrollingContainerRef = useRef();

	const data = {
		ease: 0.055,
		current: 0,
		previous: 0,
		rounded: 0,
	};

	useEffect(() => {
		setBodyHeight();
	}, [windowSize.height]);

	const setBodyHeight = () => {
		document.body.style.height = `${
			scrollingContainerRef.current.getBoundingClientRect().height
		}px`;
	};

	useEffect(() => {
		requestAnimationFrame(() => smoothScrollingHandler());
	}, []);

	const smoothScrollingHandler = () => {
		data.current = window.scrollY;
		data.previous += (data.current - data.previous) * data.ease;
		data.rounded = Math.round(data.previous * 100) / 100;

		scrollingContainerRef.current.style.transform = `translateY(-${data.rounded}px)`;

		// Recursive call
		requestAnimationFrame(() => smoothScrollingHandler());
	};

	return <Ss ref={scrollingContainerRef}>{children}</Ss>
};

export default SmoothScroll;