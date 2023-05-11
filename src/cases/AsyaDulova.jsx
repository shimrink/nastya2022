import React from 'react'
import {
	Device,
	Main,
	SpecialThanks,
	Text,
	Title,
	WhatsDone,
} from './template/styledTemplate'
import desk from '../assets/images/devices/desk.png'
import laptop from '../assets/images/devices/laptop.png'
import tablet from '../assets/images/devices/tablet.png'
import smartphone from '../assets/images/devices/iphone14.png'

const AsyaDulova = ({ c }) => {
	return (
		<Main>
			{/* Что сделано? */}
			<WhatsDone>
				<Title>Что сделано?</Title>
				<Text>{c.whatsDone}</Text>
			</WhatsDone>

			{/* Компьютер */}
			<Device>
				<img src={c.mainImage.asset.url} alt='case' className='case caseDesk' />
				<img src={desk} alt='desktop' />
			</Device>

			{/* Ноутбук */}
			<Device>
				<img
					src={c.mainImage.asset.url}
					alt='case'
					className='case caseLaptop'
				/>
				<img src={laptop} alt='laptop' />
			</Device>

			{/* Планшет */}
			<Device>
				<img
					src={c.mainImage.asset.url}
					alt='case'
					className='case caseTablet'
				/>
				<img src={tablet} alt='tablet' />
			</Device>

			{/* Смартфоны */}
			<Device>
				<div className='container'>
					<img
						src={c.mobileImage.asset.url}
						alt='case'
						className='case caseMobile'
					/>
					<img
						src={c.mobileImage.asset.url}
						alt='case'
						className='case caseMobile'
					/>
					<img
						src={c.mobileImage.asset.url}
						alt='case'
						className='case caseMobile'
					/>
				</div>
				<div className='container'>
					<img src={smartphone} alt='smartphone' />
					<img src={smartphone} alt='smartphone' />
					<img src={smartphone} alt='smartphone' />
				</div>
			</Device>

			{/*
			Заголовок с линией.
			Отступы снизу по умолчанию:
			mbHugeDesk='76px' mbDesk='76px' mbTabletA='76px' mbTabletP='76px' mbMobile='48px'
		*/}
			{/* <SectionTitle
				mbHugeDesk='0px'
				mbDesk='0px'
				mbTabletA='0px'
				mbTabletP='0px'
				mbMobile='0px'
			>
				Текст
			</SectionTitle> */}

			{/* Особая благодарность */}
			<SpecialThanks>
				<span>Разработка сайта</span>
				<span className='name'>Impulse</span>
			</SpecialThanks>
		</Main>
	)
}

export default AsyaDulova
