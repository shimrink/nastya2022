import React from 'react'
import {
	ColumnImg,
	Main,
	Text,
	Title,
	WhatsDone,
} from './template/styledTemplate'

import long from '../assets/images/cases/stroiMontazh/long.webp'

const Stroimontazh = ({ c }) => {
	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone>
				<Title>Что сделано?</Title>
				<Text>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Изображение 10/12 колонок */}
			<ColumnImg gc='1/13'>
				<img src={long} alt='case' />
			</ColumnImg>
		</Main>
	)
}

export default Stroimontazh
