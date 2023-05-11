import React from 'react'
import {
	ColumnImg,
	Device,
	Main,
	Text,
	Title,
	WhatsDone,
} from './template/styledTemplate'
import tablet from '../assets/images/devices/tablet.png'
import smartphone from '../assets/images/devices/iphone14.png'

import long from '../assets/images/cases/dolgservis/long.webp'
import t1 from '../assets/images/cases/dolgservis/t1.webp'
import s1 from '../assets/images/cases/dolgservis/s1.webp'
import s2 from '../assets/images/cases/dolgservis/s2.webp'
import s3 from '../assets/images/cases/dolgservis/s3.webp'

const Dolgservis = ({ c }) => {
	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone>
				<Title>Что сделано?</Title>
				<Text>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Изображение 10/12 колонок */}
			<ColumnImg gc='2/12'>
				<img src={long} alt='case' />
			</ColumnImg>

			{/* Смартфоны */}
			<Device>
				<div className='container'>
					<img src={s1} alt='vk' className='case caseMobile' />
					<img src={s2} alt='vk' className='case caseMobile' />
					<img src={s3} alt='vk' className='case caseMobile' />
				</div>
				<div className='container'>
					<img src={smartphone} alt='smartphone' />
					<img src={smartphone} alt='smartphone' />
					<img src={smartphone} alt='smartphone' />
				</div>
			</Device>

			{/* Планшет */}
			<Device>
				<img src={t1} alt='vk tablet' className='case caseTablet' />
				<img src={tablet} alt='tablet' />
			</Device>
		</Main>
	)
}

export default Dolgservis
