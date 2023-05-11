import React from 'react'
import {
	FullWidthImg,
	Main,
	Text,
	Title,
	WhatsDone,
} from './template/styledTemplate'

import long from '../assets/images/cases/pride/long.webp'

const Pride = ({ c }) => {
	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone>
				<Title>Что сделано?</Title>
				<Text>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Изображение во всю ширину экрана */}
			<FullWidthImg src={long} alt='case' />
		</Main>
	)
}

export default Pride
