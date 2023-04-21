import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'
import { state } from '../../store'
import SectionTitle from '../common/SectionTitle'
import Value from './Value'

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: ${({ m }) =>
		m.isMobile
			? '264px'
			: m.isTabletP
			? '354px'
			: m.isTabletA
			? '328px'
			: 'clamp(376px, 26.88vw, 468px)'};
`
const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({ m }) =>
			m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
`
const Container = styled.div`
	grid-row: 1/2;
	grid-column: ${({ m }) => (m.isHugeDesk ? '2/3' : '1/4')};
	padding: ${({ m }) =>
		m.isHugeDesk
			? '0'
			: m.isDesk
			? '0 80px'
			: m.isMobile
			? '0 clamp(24px, 7.5vw, 40px)'
			: '0 40px'};
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
	margin-top: ${({ m }) =>
		m.isTabletA ? 96 : m.isTabletP ? 76 : m.isMobile ? 48 : 168}px;
	border: 1px solid;
	border-color: ${({ theme }) => theme.ac.light};
	border-radius: 9em;
	background-color: rgba(0, 0, 0, 0);
	font-family: 'AccentFontM', sans-serif;
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
	color: ${({ theme }) => theme.mode.text};
	cursor: pointer;
	transition: border-color ${commonTheme.durations.short}s,
		background-color ${commonTheme.durations.short}s,
		color ${commonTheme.durations.short}s;
	:hover {
		background-color: ${({ theme }) => theme.ac.dark};
		border-color: ${({ theme }) => theme.ac.dark};
		color: ${commonTheme.colors.white};
	}
`
const Values = ({ pageTransition }) => {
	const media = useContext(MediaContext)

	return (
		<Wrap m={media}>
			<SectionTitle mbHugeDesk='96px' mbDesk='96px' mbTabletA='96px'>
				Ценности в работе
			</SectionTitle>
			<Content m={media}>
				<Container m={media}>
					{state.aboutValues.map((v, i) => (
						<Value key={v.title} v={v} />
					))}
				</Container>
				<Button m={media} onClick={() => pageTransition('/services')}>
					Перейти к услугам
				</Button>
			</Content>
		</Wrap>
	)
}

export default Values
