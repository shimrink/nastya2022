import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'
import { commonTheme } from '../../styles/theme'

const Favorites = styled.h4`
	grid-row: 1/2;
	grid-column: ${({ m }) => (m.isHugeDesk || m.isDesk ? '1/6' : '1/4')};
	font-family: ${({ m }) =>
			m.isHugeDesk || m.isDesk ? 'AccentFontR' : 'AccentFontM'},
		sans-serif;
	font-weight: ${({ m }) => (m.isHugeDesk || m.isDesk ? 400 : 500)};
	font-size: ${({ m }) => (m.isHugeDesk || m.isDesk ? 18 : 16)}px;
	margin-left: ${({ m }) =>
		m.isHugeDesk || m.isDesk ? 57 : m.isMobile ? 41 : 53}px;
	opacity: ${({ colorsOpen }) => (colorsOpen ? 0 : 1)};
	transition: opacity ${commonTheme.durations.short}s;
`
const PageName = ({ colorsOpen }) => {
	const media = useContext(MediaContext)
	return (
		<Favorites m={media} colorsOpen={colorsOpen}>
			{media.isMobile ? 'Избранное' : 'Избранные проекты'}
		</Favorites>
	)
}

export default PageName
