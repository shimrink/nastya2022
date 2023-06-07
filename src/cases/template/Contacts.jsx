import React from 'react'
import styled from 'styled-components'
import LetterByLetter from '../../components/common/LetterByLetter'

const Wrapper = styled.div`
	grid-row: 3/4;
	grid-column: 1/2;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	align-items: end;
	width: 100%;
	padding: 0 40px;
	margin: 202px 0 40px 0;
	@media ${({ theme }) => theme.common.media.desk} {
		margin: 160px 0 40px 0;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		margin: 120px 0 24px 0;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
		margin: 152px 0 24px 0;
	}
`
const Copywriting = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	display: flex;
	flex-direction: column;
	font-size: 16px;
	color: ${({ theme }) => theme.mode.subText};
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 14px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-row: 2/3;
		grid-column: 1/3;
		font-size: clamp(12px, 3.125vw, 14px);
	}
`
const Team = styled(Copywriting)`
	grid-column: 4/5;
	text-align: end;
	a {
		color: ${({ theme }) => theme.mode.subText};
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 3/5;
	}
`
const Links = styled.div`
	grid-row: 1/2;
	grid-column: 2/4;
	display: flex;
	justify-content: center;
	a {
		margin-right: 24px;
		font-size: 16px;
	}
	a:last-child {
		margin-right: 0;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		a {
			margin-right: 16px;
		}
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		grid-column: 1/5;
		justify-content: space-between;
		margin-bottom: clamp(24px, 8.125vw, 46px);
		a {
			margin-right: 0;
			font-size: clamp(14px, 3.61vw, 16px);
		}
	}
`
const Contacts = () => {
	return (
		<Wrapper>
			<Copywriting>
				<span>©2023</span>
				<span>ASYADULOVA</span>
			</Copywriting>
			<Links>
				<a href='https://vk.com/asyadulova' target='_blank' rel='noreferrer'>
					<LetterByLetter wavy>Vk</LetterByLetter>
				</a>
				<a href='https://t.me/asyadulova' target='_blank' rel='noreferrer'>
					<LetterByLetter wavy>Telegramm</LetterByLetter>
				</a>
				<a
					href='https://www.instagram.com/asyadulova'
					target='_blank'
					rel='noreferrer'
				>
					<LetterByLetter wavy>Ig</LetterByLetter>
				</a>
				<a
					href='https://www.behance.net/asyadulova'
					target='_blank'
					rel='noreferrer'
				>
					<LetterByLetter wavy>Behance</LetterByLetter>
				</a>
				<a
					href='https://experts.tilda.cc/asyadulova'
					target='_blank'
					rel='noreferrer'
				>
					<LetterByLetter wavy>Tilda experts</LetterByLetter>
				</a>
			</Links>
			<Team>
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
			</Team>
		</Wrapper>
	)
}

export default Contacts
