import React, { useCallback, useContext, useEffect, useState } from 'react'
import { YMInitializer } from 'react-yandex-metrika'
import useCookies from 'react-cookie/cjs/useCookies'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'

const Notification = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: ${({ m }) => (m.isMobile ? 'column' : 'row')};
	align-items: ${({ m }) => (m.isMobile ? 'normal' : 'center')};
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.mode.bg};
	padding: ${({ m }) =>
		m.isMobile ? '24px clamp(24px, 7.5vw, 40px)' : '24px 40px'};
	z-index: 8;
	transition: background-color ${commonTheme.durations.short}s;
`
const Text = styled.p`
	margin: ${({ m }) => (m.isMobile ? '0 0 24px 0' : '0 24px 0 0')};
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
	color: ${({ theme }) => theme.mode.text};
	transition: color ${commonTheme.durations.short}s;
`
const Ok = styled.button`
	padding: 16px 4.5vw;
	font-family: 'AccentFontR', sans-serif;
	font-size: 16px;
	background-color: ${({ theme }) => theme.mode.bg};
	color: ${({ theme }) => theme.mode.text};
	border: 1px solid;
	border-color: ${({ theme }) => theme.ac.light};
	border-radius: 9em;
	cursor: pointer;
	transition: background-color ${commonTheme.durations.short}s,
		color ${commonTheme.durations.short}s,
		border-color ${commonTheme.durations.short}s;
	&:hover {
		background-color: ${({ theme }) => theme.ac.dark};
		color: ${commonTheme.colors.white};
	}
`
const notificationText =
	'Да, снова куки. Но ничего не поделаешь, без них ни один сайт не работает ;)'

const Cookie = () => {
	const media = useContext(MediaContext)
	const [cookies, setCookies] = useCookies(['agreement'])
	const [counterHidden, setCounterHidden] = useState(false)

	const initCounter = useCallback(() => {
		setCounterHidden(true)

		setCookies('agreement', '1', { path: '/', maxAge: 15768000 })
	}, [setCookies])

	useEffect(() => {
		cookies.agreement === '1' ? initCounter() : setCounterHidden(false)
	}, [cookies, initCounter])

	return counterHidden ? (
		<YMInitializer
			accounts={[88691004]}
			options={{
				defer: true,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true,
			}}
			version='2'
		/>
	) : (
		<Notification m={media}>
			<Text m={media}>{notificationText}</Text>
			<Ok onClick={initCounter}>Ладули</Ok>
		</Notification>
	)
}

export default Cookie
