import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'

const Wrapper = styled.div`
	grid-row: 1/2;
	grid-column: ${({ m }) => (m.isHugeDesk || m.isDesk ? '1/6' : '1/2')};
	display: flex;
	align-items: center;
	justify-content: start;
	z-index: 7;
`
const Svg = styled.svg`
	width: auto;
	height: ${({ m }) => (m.isHugeDesk || m.isDesk ? 30 : 26)}px;
	fill: none;
	cursor: pointer;
`
const Path = styled.path`
	fill: ${({ theme, isMenuMobileOpen }) =>
		isMenuMobileOpen ? commonTheme.colors.white : theme.ac.dark};
	transition: fill ${commonTheme.durations.short}s;
`
const Favorites = styled.h4`
	font-family: 'AccentFontR', sans-serif;
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
	margin-left: ${({ m }) => (m.isMobile ? 12 : 24)}px;
`
const favoritesText = { desk: 'Избранные проекты', mobile: 'Избранное' }

const Logo = ({ isMenuMobileOpen, mobilePageTransition, pageTransition }) => {
	const media = useContext(MediaContext)
	const { pathname } = useLocation()

	const clickHandler = () => {
		media.isHugeDesk || media.isDesk || !isMenuMobileOpen
			? pageTransition('/')
			: mobilePageTransition('/')
	}

	return (
		<Wrapper m={media}>
			<Svg
				m={media}
				onClick={clickHandler}
				viewBox='0 0 103 93'
				xmlns='http://www.w3.org/2000/svg'
			>
				<Path
					isMenuMobileOpen={isMenuMobileOpen}
					fillRule='evenodd'
					clipRule='evenodd'
					d='M102.507 34.3839C99.7617 7.20716 78.3489 -7.80424 46.3389 8.112C44.8894 2.93179 40.9692 0.104167 34.6991 0.00237206C28.6815 -0.0994224 25.6069 3.07883 23.3887 8.81325C22.7189 10.5438 9.57472 47.2463 2.73361 66.4855C-0.319092 75.0814 -3.32787 89.6154 8.64134 92.7258C14.571 94.2753 20.4019 88.9594 24.2123 84.2656C30.2738 76.8006 37.071 61.1356 48.1288 62.8209C50.7642 63.2167 52.6858 63.9858 53.4216 64.5966C54.2451 68.1707 57.3198 81.1325 60.6909 88.0206C62.6236 91.968 66.4669 92.8389 69.7831 92.8389C77.7553 92.8389 82.7626 90.1131 86.4412 86.9575C90.1747 83.7 93.3812 79.7074 95.9836 74.9683C98.652 70.1387 100.508 64.8681 101.716 59.111C103 53.354 103.427 43.4929 102.507 34.3839ZM29.3953 71.1793C24.4539 76.5518 13.7365 84.4239 7.25775 77.0381C4.36976 73.7468 4.97372 67.2659 5.79728 63.2959C6.51105 59.8462 6.50006 59.8801 14.1428 39.2159C16.306 33.3683 19.0293 25.6659 23.0813 13.9595C24.5747 9.65022 27.3528 0.00237217 34.6991 2.30971C37.06 3.05621 38.6742 8.25903 39.8382 12.5796C37.9055 14.1066 35.896 15.9954 34.3587 18.1105C30.1879 23.8727 27.2886 30.0992 26.0791 37.2252C25.3275 41.4601 24.8483 47.1415 27.9129 50.6168C29.9985 52.8527 34.1026 52.3311 35.5995 49.6328C39.2132 42.543 30.8063 35.4335 31.9319 27.9506C32.8219 22.5059 36.3676 18.0025 40.3762 14.5477C41.8373 20.9244 50.0181 50.6168 52.8066 62.4815C43.0446 59.3598 37.9494 61.8934 29.3953 71.1793ZM47.0087 10.3854C53.4216 5.98908 63.0579 4.36279 69.7831 6.56009C90.6639 13.2172 94.7184 43.2046 89.7684 62.8887C88.6925 67.5832 79.7768 95.2952 71.5181 90.4072C69.0913 88.9707 66.29 80.9153 63.0854 69.8989C59.417 57.2877 53.169 31.0497 47.0087 10.3854Z'
				/>
			</Svg>
			{pathname === '/' && (
				<Favorites m={media}>
					{media.isMobile ? favoritesText.mobile : favoritesText.desk}
				</Favorites>
			)}
		</Wrapper>
	)
}

export default Logo
