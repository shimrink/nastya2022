import styled from 'styled-components'

export const Main = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`
export const WhatsDone = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-row-gap: 20px;
	grid-column-gap: 24px;
	width: ${({ theme }) => theme.common.gridWidth}px;
	margin: 120px 0;
	transition: color ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column-gap: clamp(24px, 7.5vw, 40px);
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
export const Title = styled.h2`
	grid-row: 1/2;
	grid-column: 1/7;
	color: ${({ theme }) => theme.mode.text};
	font-size: clamp(40px, 2.815vw, 48px);
	text-transform: uppercase;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/8;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		grid-column: 1/7;
		font-size: clamp(24px, 3.065vw, 30px);
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/13;
		font-size: clamp(22px, 6.18vw, 30px);
	}
`
export const Text = styled.p`
	grid-row: 1/2;
	grid-column: 7/11;
	font-size: 18px;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 8/13;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		grid-column: 7/13;
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		grid-column: 1/13;
	}
`
export const Device = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	justify-items: center;
	width: ${({ theme }) => theme.common.gridWidth}px;
	margin: 150px 0;
	img {
		position: relative;
		grid-row: 1/2;
		grid-column: 2/12;
		width: 100%;
		z-index: 2;
	}
	img.case {
		aspect-ratio: 16/10;
		object-fit: cover;
		z-index: 1;
	}
	img.caseDesk {
		width: 99.3%;
		border-radius: 0.625% / 1%;
		margin-top: 0.5%;
	}
	img.caseLaptop {
		width: 74.8%;
		border-radius: 3% / 5% 5% 0 0;
		margin-top: 0.3%;
	}
	img.caseTablet {
		width: 98.5%;
		border-radius: 5% / 8%;
		margin-top: 1%;
	}
	.container {
		grid-row: 1/2;
		grid-column: 2/12;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 80px;
		justify-items: center;
		width: 100%;
		img {
			grid-column: auto;
		}
		img.caseMobile {
			aspect-ratio: 9/19;
			width: 94%;
			border-radius: 12% / 6%;
			margin-top: 1.75%;
		}
	}
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
		.container {
			grid-column-gap: 40px;
		}
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		img {
			grid-column: 1/13;
		}
		.container {
			grid-column: 1/13;
		}
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
		margin: 50px 0;
		.container {
			grid-column-gap: 20px;
		}
	}
`
export const SpecialThanks = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	span {
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		font-size: 18px;
		text-transform: uppercase;
		margin-bottom: 24px;
	}
	span:last-child {
		margin-bottom: 0;
	}
	.name {
		font-family: 'AccentFontM', sans-serif;
		font-weight: 500;
		font-size: 48px;
		color: ${({ theme }) => theme.ac.dark};
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		span {
			font-size: 16px;
			margin-bottom: 12px;
		}
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		span {
			margin-bottom: clamp(6px, 2.085vw, 12px);
		}
		.name {
			font-size: clamp(30px, 9.165vw, 48px);
		}
	}
`
export const ColumnImg = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	justify-items: center;
	width: ${({ theme }) => theme.common.gridWidth}px;
	margin: 150px 0;
	img {
		grid-row: 1/2;
		grid-column: ${({ gc }) => gc};
		width: 100%;
	}
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 1/13;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
		margin: 50px 0;
	}
`
export const FullWidthImg = styled.img`
	width: 100%;
`
export const TwoImg = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-row-gap: 24px;
	grid-column-gap: 24px;
	width: ${({ theme }) => theme.common.gridWidth}px;
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column-gap: 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-template-columns: 1fr;
		grid-column-gap: clamp(24px, 7.5vw, 40px);
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
export const Img = styled.img`
	grid-row: ${({ gr }) => gr};
	grid-column: ${({ gc }) => gc};
	width: 100%;
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: auto;
		grid-column: auto;
	}
`
