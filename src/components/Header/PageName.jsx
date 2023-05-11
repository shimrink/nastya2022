import React, { useContext } from 'react'
import styled from 'styled-components'
import { MediaContext } from '../../AppWrap'

const Favorites = styled.h4`
	grid-row: 1/2;
	grid-column: 1/6;
	font-family: 'AccentFontR', sans-serif;
	font-weight: 400;
	font-size: 18px;
	margin-left: 57px;
	opacity: ${({ colorsOpen }) => (colorsOpen ? 0 : 1)};
	transition: opacity ${({ theme }) => theme.common.durations.short}s;
	@media ${({ theme }) => theme.common.media.tabletA} {
		grid-column: 1/4;
		font-family: 'AccentFontM', sans-serif;
		font-weight: 500;
		font-size: 16px;
		margin-left: 53px;
	}
	@media ${({ theme }) => theme.common.media.tabletP} {
		margin-left: 41px;
	}
`
const PageName = ({ colorsOpen }) => {
	const media = useContext(MediaContext)
	return (
		<Favorites colorsOpen={colorsOpen}>
			{media.isMobile ? 'Избранное' : 'Избранные проекты'}
		</Favorites>
	)
}

export default PageName
