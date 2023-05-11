import React, { forwardRef } from 'react'
import styled from 'styled-components'
import LetterByLetter from '../common/LetterByLetter'
import Navigation from './Navigation'

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: none;
	flex-direction: column;
	align-items: center;
	color: ${({ theme }) => theme.common.colors.white};
	width: 100%;
	height: 110%;
	touch-action: none;
	z-index: 6;
`
const RoundedDiv = styled.div`
	width: 120vw;
	height: 10%;
	background-color: ${({ theme }) => theme.ac.dark};
	border-radius: 50% / 0 0 100% 100%;
	margin-top: -4px;
`
const Content = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	font-family: 'AccentFontM', sans-serif;
	padding: 24px 40px;
	background-color: ${({ theme }) => theme.ac.dark};
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 24px clamp(24px, 7.5vw, 40px);
	}
`
const Social = styled.div`
	grid-row: 3/4;
	grid-column: 1/2;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	width: 100%;
	height: 100%;
	a {
		font-size: 16px;
		color: ${({ theme }) => theme.common.colors.white};
		margin: 0 12px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		justify-content: space-between;
		a {
			margin: 0;
			font-size: clamp(14px, 3.855vw, 16px);
		}
	}
`
const MenuMobile = forwardRef(
	({ disableWave, isMenuMobileOpen, mobilePageTransition }, ref) => {
		return (
			<Wrapper ref={ref}>
				<Content>
					<Navigation
						navMobile
						disableWave={disableWave}
						isMenuMobileOpen={isMenuMobileOpen}
						mobilePageTransition={mobilePageTransition}
					/>
					<Social>
						<a
							href='https://vk.com/asyadulova'
							target='_blank'
							rel='noreferrer'
						>
							<LetterByLetter wavy whiteCol>
								Vk
							</LetterByLetter>
						</a>
						<a href='https://t.me/asyadulova' target='_blank' rel='noreferrer'>
							<LetterByLetter wavy whiteCol>
								Telegramm
							</LetterByLetter>
						</a>
						<a
							href='https://www.instagram.com/asyadulova'
							target='_blank'
							rel='noreferrer'
						>
							<LetterByLetter wavy whiteCol>
								Ig
							</LetterByLetter>
						</a>
						<a
							href='https://www.behance.net/asyadulova'
							target='_blank'
							rel='noreferrer'
						>
							<LetterByLetter wavy whiteCol>
								Behance
							</LetterByLetter>
						</a>
						<a
							href='https://experts.tilda.cc/asyadulova'
							target='_blank'
							rel='noreferrer'
						>
							<LetterByLetter wavy whiteCol>
								Tilda experts
							</LetterByLetter>
						</a>
					</Social>
				</Content>
				<RoundedDiv className='roundedDivRef' />
			</Wrapper>
		)
	},
)

export default MenuMobile
