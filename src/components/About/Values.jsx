import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import SectionTitle from '../common/SectionTitle';

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: clamp(356px, 26.095vw, 468px);
`
const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
`
const Container = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk ? '2/3' : '1/4'};
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
`
const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: ${ ({m}) => m.isTabletP ? '40px'
										: m.isMobile ? '(24px, 7.5vw, 40px)'
										: '24px'};
	color: rgba(30, 30, 30, 0.5);
	margin-bottom: ${({last, m}) => m.isHugeDesk || m.isDesk ? 96
											: m.isTabletA ? 76
											: last ? 0
											: 48}px;
	transition: color ${commonTheme.durations.short}s;
	&.active {
		color: rgba(30, 30, 30, 1);
	}
	h2 {
		grid-row: 1/2;
		grid-column: ${ ({m}) => m.isMobile ? '1/13'
										: m.isDesk ? '1/8'
										: '1/7'};
		font-size: ${ ({m}) => m.isHugeDesk || m.isDesk ? 'clamp(40px, 2.815vw, 48px)'
									: m.isMobile ? 'clamp(22px, 6.18vw, 30px)'
									: 'clamp(24px, 3.065vw, 30px)'};
		color: inherit;
		text-transform: uppercase;
		margin-bottom: ${({m}) => m.isMobile ? 20 : 0}px;
	}
	span {
		grid-row: ${({m}) => m.isMobile ? '2/3' : '1/2'};
		grid-column: ${ ({m}) => m.isHugeDesk ? '7/11'
										: m.isDesk ? '8/13'
										: m.isMobile ? '1/13'
										: '7/13'};
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		color: inherit;
	}
`
const Button = styled.button`
	grid-row: 2/3;
	grid-column: 1/4;
	display: flex;
	align-items: center;
	justify-self: center;
	justify-content: center;
	width: 234px;
	padding: 16px 0;
	margin-top: ${({m}) => m.isTabletA ? 96
								: m.isTabletP ? 76
								: m.isMobile ? 48
								: 168}px;
	border: 1px solid;
	border-color: ${ ({theme}) => theme.ac.light };
	border-radius: 9em;
	background-color: rgba(0, 0, 0, 0);
	font-family: 'AccentFontM', sans-serif;
	font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
	cursor: pointer;
	transition: border-color ${commonTheme.durations.short}s,
					background-color ${commonTheme.durations.short}s,
					color ${commonTheme.durations.short}s;
	:hover {
		background-color: ${ ({theme}) => theme.ac.dark };
		border-color: ${ ({theme}) => theme.ac.dark };
		color: ${commonTheme.colors.primary};
	}
`
const valuesContent = [
	{title: 'Эмоциональный дизайн', text: 'Я тщательно прорабатываю все детали и анимации, стремясь эстетикой дизайна вызвать яркие эмоции, которые невозможно забыть.'},
	{title: 'Понятная структура', text: 'В креативных решениях опираюсь на логику и стратегию решения задачи. Только так можно создать эффективный дизайн, а не только «красивую картинку».'},
	{title: 'Основа — аутентичность', text: 'Помогаю брендам транслировать особенную идею и ценности, быть искренними к себе и своим клиентам,  и этим выделяться среди конкурентов.'},
	{title: 'Комплексный подход', text: 'Создаю все виды дизайна для бренда: логотипы, презентации, оформление соцсетей, сайты, — формируя единый образ, повышая узнаваемость и доверие.'},
]

const Values = ({ pageTransition }) => {

	const media = useContext(MediaContext)
	const rowsRef = useRef([])

	// useEffect(() => {
	// 	setInterval(() => {
	// 		for (let i = 0; i < valuesContent.length; i++)
	// 			ScrollTrigger.create({
	// 				trigger: rowsRef.current[i],
	// 				start: "top 55%",
	// 				end: "bottom 45%",
	// 				toggleClass: "active",
	// 			})
	// 	}, 300)
	// }, [])

	return <Wrap>
		<SectionTitle valuesInWork>Ценности в работе</SectionTitle>
		<Content m={media}>
			<Container m={media}>
				{valuesContent.map((v, i) => (
					<Row ref={el => rowsRef.current[i] = el} m={media} key={i} className='active'>
						<h2>{v.title}</h2>
						<span>{v.text}</span>
					</Row>
				))}
			</Container>
			<Button m={media} onClick={e=>pageTransition(e, '/services')}>Перейти к услугам</Button>
		</Content>
	</Wrap>
}

export default Values;