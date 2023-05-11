import React from 'react'
import {
	FullWidthImg,
	Main,
	Text,
	Title,
	WhatsDone,
} from './template/styledTemplate'

import long from '../assets/images/cases/krasivyiBiznes/long.webp'
import short from '../assets/images/cases/krasivyiBiznes/short.webp'

const KrasivyiBiznes = ({ c }) => {
	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone>
				<Title>Что сделано?</Title>
				<Text>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Изображение во всю ширину экрана */}
			<FullWidthImg src={long} alt='case' />
			<FullWidthImg src={short} alt='case' />
		</Main>
	)
}

export default KrasivyiBiznes
