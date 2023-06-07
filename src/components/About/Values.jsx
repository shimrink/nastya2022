import React from 'react'
import styled from 'styled-components'
import { state } from '../../store'
import SectionTitle from '../common/SectionTitle'
import Value from './Value'

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: clamp(376px, 26.88vw, 468px);
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin-top: 328px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin-top: 354px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-top: 264px;
	}
`
const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({ theme }) => theme.common.gridWidth}px 1fr;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-template-columns: 1fr 1fr 1fr;
	}
`
const Container = styled.div`
	grid-row: 1/2;
	grid-column: 2/3;
	@media ${({ theme }) => theme.common.media.desk} {
		grid-column: 1/4;
		padding: 0 80px;
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		padding: 0 40px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const Button = styled.button`
	grid-row: 2/3;
	grid-column: 1/4;
	display: flex;
	align-items: center;
	justify-self: center;
	justify-content: center;
	width: 234px;
	padding: 16px 0;
	margin-top: 168px;
	border: 1px solid;
	border-color: ${({ theme }) => theme.ac.light};
	border-radius: 9em;
	background-color: rgba(0, 0, 0, 0);
	font-family: 'AccentFontM', sans-serif;
	font-size: 18px;
	color: ${({ theme }) => theme.mode.text};
	cursor: pointer;
	transition: border-color ${({ theme }) => theme.common.durations.short}s,
		background-color ${({ theme }) => theme.common.durations.short}s,
		color ${({ theme }) => theme.common.durations.short}s;
	:hover {
		background-color: ${({ theme }) => theme.ac.dark};
		border-color: ${({ theme }) => theme.ac.dark};
		color: ${({ theme }) => theme.common.colors.white};
	}
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.tabletA} {
		margin-top: 96px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin-top: 76px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin-top: 48px;
	}
`
const Values = ({ pageTransition }) => {
	return (
		<Wrap>
			<SectionTitle mbHugeDesk='96px' mbDesk='96px' mbTabletA='96px'>
				Ценности в работе
			</SectionTitle>
			<Content>
				<Container>
					{state.aboutValues.map((v, i) => (
						<Value key={v.title} v={v} />
					))}
				</Container>
				<Button onClick={() => pageTransition('/services')}>
					Перейти к услугам
				</Button>
			</Content>
		</Wrap>
	)
}

export default Values
