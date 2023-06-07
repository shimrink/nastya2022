import React, { useCallback, useEffect, useState } from 'react'
import { YMInitializer } from 'react-yandex-metrika'
import useCookies from 'react-cookie/cjs/useCookies'
import styled from 'styled-components'

const Notification = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.mode.bg};
	padding: 24px 40px;
	z-index: 8;
	transition: background-color ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.mobile} {
		flex-direction: column;
		align-items: normal;
		padding: 24px clamp(24px, 7.5vw, 40px);
	}
`
const Text = styled.p`
	margin: 0 24px 0 0;
	font-size: 18px;
	color: ${({ theme }) => theme.mode.text};
	transition: color ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.tablet} {
		font-size: 16px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		margin: 0 0 24px 0;
	}
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
	transition: background-color ${({ theme }) => theme.common.durations.short}s,
		color ${({ theme }) => theme.common.durations.short}s,
		border-color ${({ theme }) => theme.common.durations.short}s;
	&:hover {
		background-color: ${({ theme }) => theme.ac.dark};
		color: ${({ theme }) => theme.common.colors.white};
	}
`
const notificationText =
	'Да, снова куки. Но ничего не поделаешь, без них ни один сайт не работает ;)'

const Cookie = () => {
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
		<Notification>
			<Text>{notificationText}</Text>
			<Ok onClick={initCounter}>Ладули</Ok>
		</Notification>
	)
}

export default Cookie
