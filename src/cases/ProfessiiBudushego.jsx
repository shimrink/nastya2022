import React from 'react'
import {
	Device,
	Img,
	Main,
	Text,
	Title,
	TwoImg,
	WhatsDone,
} from './template/styledTemplate'
import tablet from '../assets/images/devices/tablet.png'
import smartphone from '../assets/images/devices/iphone14.png'

import list1 from '../assets/images/cases/professiiBudushego/1.webp'
import list2 from '../assets/images/cases/professiiBudushego/2.webp'
import list3 from '../assets/images/cases/professiiBudushego/3.webp'
import list4 from '../assets/images/cases/professiiBudushego/4.webp'
import t1 from '../assets/images/cases/professiiBudushego/t1.webp'
import s1 from '../assets/images/cases/professiiBudushego/s1.webp'
import s2 from '../assets/images/cases/professiiBudushego/s2.webp'
import s3 from '../assets/images/cases/professiiBudushego/s3.webp'

const ProfessiiBudushego = ({ c }) => {
	return (
		<Main>
			{/* Два изображения */}
			<TwoImg>
				<Img gr='auto' gc='auto' src={list1} alt='Листовка' />
				<Img gr='auto' gc='auto' src={list2} alt='Листовка' />
			</TwoImg>

			{/* Что сделано? */}
			<WhatsDone>
				<Title>Что сделано?</Title>
				<Text>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Планшет */}
			<Device>
				<img src={t1} alt='vk tablet' className='case caseTablet' />
				<img src={tablet} alt='tablet' />
			</Device>

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

			{/* Два изображения */}
			<TwoImg>
				<Img gr='1/3' gc='1/2' src={list4} alt='Листовка' />
				<Img gr='2/4' gc='2/3' src={list3} alt='Листовка' />
			</TwoImg>
		</Main>
	)
}

export default ProfessiiBudushego
