import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import state from '../../store';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import Line from '../common/Line';

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: clamp(356px, 26.095vw, 468px);
`
const Title = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${ ({media}) => media === 'mobile' ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px' };
	margin-bottom: 76px;
`
const Hi = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16}px;
	text-transform: uppercase;
	text-align: center;
	padding-bottom: 48px;
`
const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr ${ ({media}) => media === 'hugeDesk' ? state.gridWidth + 'px' : '1fr' } 1fr;
`
const Container = styled.div`
	grid-row: 1/2;
	grid-column: ${ ({media}) => media === 'hugeDesk' ? '2/3' : '1/4' };
	padding: ${ ({media}) => media === 'hugeDesk' ? '0'
									: media === 'desk' ? '0 80px'
									: media === 'mobile' ? '0 clamp(24px, 7.5vw, 40px)'
									: '0 40px'};
`
const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: ${({media}) => media === 'tabletP' ? '40px'
											: media === 'mobile' ? '(24px, 7.5vw, 40px)'
											: '24px'};
	color: rgba(30, 30, 30, 0.5);
	margin-bottom: ${ ({last, media}) => last ? 0
													: media === 'hugeDesk' || media === 'desk' ? 96
													: media === 'tabletA' ? 76
													: 48}px;
	transition: color ${commonTheme.durations.short}ms;
	&.active {
		color: rgba(30, 30, 30, 1);
	}
	h2 {
		grid-row: 1/2;
		grid-column: ${ ({media}) => media === 'mobile' ? '1/13'
											: media === 'desk' ? '1/8'
											: '1/7' };
		font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 'clamp(40px, 2.815vw, 48px)'
										: media === 'mobile' ? 'clamp(22px, 6.18vw, 30px)'
										: 'clamp(24px, 3.065vw, 30px)'};
		color: inherit;
		text-transform: uppercase;
		margin-bottom: ${ ({media}) => media === 'mobile' ? 20 : 0}px;
	}
	span {
		grid-row: ${ ({media}) => media === 'mobile' ? '2/3' : '1/2' };
		grid-column: ${ ({media}) => media === 'hugeDesk' ? '7/11'
											: media === 'desk' ? '8/13'
											: media === 'mobile' ? '1/13'
											: '7/13'};
		font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16}px;
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
	margin-top: ${ ({media}) => media === 'tabletA' ? 96
										: media === 'tabletP' ? 76
										: media === 'mobile' ? 48
										: 168}px;
	border: 1px solid;
	border-color: ${({accentColor}) => accentColor.light};
	border-radius: 9em;
	background-color: rgba(0, 0, 0, 0);
	font-family: 'AccentFontM', sans-serif;
	font-size: ${ ({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16}px;
	cursor: pointer;
	transition: border-color ${commonTheme.durations.short}ms,
					background-color ${commonTheme.durations.short}ms;
	:hover {
		background-color: ${({accentColor}) => accentColor.dark};
		border-color: ${({accentColor}) => accentColor.dark};
	}
`
gsap.registerPlugin(ScrollTrigger)

const valuesContent = [
	{title: 'Эмоциональный дизайн', text: 'Я тщательно прорабатываю все детали и анимации, стремясь эстетикой дизайна вызвать яркие эмоции, которые невозможно забыть.'},
	{title: 'Понятная структура', text: 'В креативных решениях опираюсь на логику и стратегию решения задачи. Только так можно создать эффективный дизайн, а не только «красивую картинку».'},
	{title: 'Основа — аутентичность', text: 'Помогаю брендам транслировать особенную идею и ценности, быть искренними к себе и своим клиентам,  и этим выделяться среди конкурентов.'},
	{title: 'Комплексный подход', text: 'Создаю все виды дизайна для бренда: логотипы, презентации, оформление соцсетей, сайты, — формируя единый образ, повышая узнаваемость и доверие.'},
]

const Values = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const navigate = useNavigate()
	const rowsRef = useRef([])

	useEffect(() => {
		setInterval(() => {
			for (let i = 0; i < valuesContent.length; i++)
				ScrollTrigger.create({
					trigger: rowsRef.current[i],
					start: "top 55%",
					end: "bottom 45%",
					toggleClass: "active",
				})
		}, 300)
	}, [])

	return <Wrap>
		<Title media={media}>
			<Hi media={media}>Ценности в работе</Hi>
			<Line />
		</Title>
		<Content media={media}>
			<Container media={media}>
				{valuesContent.map((v, i) => (
					<Row ref={el => rowsRef.current[i] = el} media={media} key={i}>
						<h2>{v.title}</h2>
						<span>{v.text}</span>
					</Row>
				))}
			</Container>
			<Button media={media} accentColor={accentColor} onClick={()=>navigate('/services')}>Перейти к услугам</Button>
		</Content>
	</Wrap>
}

export default Values;