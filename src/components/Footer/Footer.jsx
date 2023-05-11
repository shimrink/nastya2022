import React from 'react'
import styled from 'styled-components'
import UpperFooter from './UpperFooter'
import UnderFooter from './UnderFooter'

const FooterWrapper = styled.footer`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	min-height: 100vh;
	padding-top: clamp(204px, 14.535vw, 252px);
	z-index: 3;
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding-top: 258px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding-top: clamp(219px, 57.185vw, 257px);
	}
`
const DevGrid = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	width: ${({ theme }) => theme.common.gridWidth}px;
	margin: 144px 0 40px 0;
	z-index: 2;
	@media ${({ theme }) => theme.common.media.desk} {
		width: 100%;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		padding: 0 40px;
		margin: 128px 0 24px 0;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-template-columns: repeat(4, 1fr);
		margin: 198px 0 24px 0;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-template-columns: 1fr 1fr;
		padding: 0 clamp(24px, 7.5vw, 40px);
		margin: clamp(180px, 49.585vw, 236px) 0 24px 0;
	}
`
const Dev = styled.div`
	grid-row: 1/2;
	grid-column: 10/13;
	display: flex;
	flex-direction: column;
	font-size: 16px;
	color: ${({ theme }) => theme.mode.subText};
	a {
		color: ${({ theme }) => theme.mode.subText};
	}
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 9/13;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		grid-column: 7/13;
		font-size: 14px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		grid-column: 3/5;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/3;
	}
`
const Footer = () => {
	return (
		<FooterWrapper>
			<UpperFooter />
			<UnderFooter />
			<DevGrid>
				<Dev>
					<span>Design asyadulova</span>
					<span>
						Development{' '}
						<a
							href='https://impvlse.asyadulova.ru'
							target='_blank'
							rel='noreferrer'
						>
							Impvlse
						</a>
					</span>
				</Dev>
			</DevGrid>
		</FooterWrapper>
	)
}

export default Footer
