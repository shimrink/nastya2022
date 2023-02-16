import React, { useContext } from 'react';
import styled from 'styled-components';
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import Line from '../common/Line';
import SectionTitle from '../common/SectionTitle';
import colorsGif from '../../assets/images/Colors.gif';
import petsGif from '../../assets/images/Cats.gif';
import gamesGif from '../../assets/images/Games.gif';

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 435px;
`
const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({m}) => m.isHugeDesk ? commonTheme.gridWidth + 'px' : '1fr'} 1fr;
`
const Gifs = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isHugeDesk ? '2/3' : '1/4'};
	display: grid;
	grid-template-columns: ${({m}) => m.isMobile || m.isTabletP ? '1fr 1fr' : 'repeat(12, 1fr)'};
	grid-column-gap: ${ ({m}) => m.isMobile ? 0
										: m.isTabletP ? 40
										: 24}px;
	padding: ${({m}) => m.isHugeDesk ? '0'
							: m.isDesk ? '0 80px'
							: m.isMobile ? '0 clamp(24px, 7.5vw, 40px)'
							: '0 40px'};
	img {
		grid-row: 1/2;
		grid-column: ${({m}) => m.isMobile || m.isTabletP ? '1/2' : '2/6'};
		width: 100%;
		opacity: 0;
		transition: opacity ${commonTheme.durations.short}s;
	}
	img.active {
		opacity: 1;
	}
`
const Container = styled.div`
	grid-row: 1/2;
	grid-column: 1/4;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: ${({m}) => m.isMobile || m.isTabletP ? 40 : 24}px;
`
const InnerContainer = styled.div`
	grid-row: 1/2;
	grid-column: 2/3;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-right: ${({m}) => m.isHugeDesk ? '0'
									: m.isDesk ? '80px'
									: m.isMobile ? 'clamp(24px, 7.5vw, 40px)'
									: '40px'};
	margin-left: ${({m}) => m.isTabletP ? -20 : m.isMobile ? 0 : -24}px;
`
const Toggles = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${({m}) => m.isMobile ? 'space-between' : 'flex-start'};
	height: ${({m}) => m.isMobile ? '100%' : 'auto'};
	padding-left: ${({m}) => m.isTabletP ? 20 : m.isMobile ? 0 : 24}px;
	h3 {
		font-size: ${({m}) => m.isMobile ? 'clamp(26px, 7.08vw, 48px)'
													: 'clamp(48px, 3.85vw, 76px)'};
		text-transform: uppercase;
		margin-bottom: ${({m}) => m.isHugeDesk || m.isDesk ? 48 : m.isMobile ? 0 : 20}px;
	}
	h3:last-child {
		margin-bottom: 0;
	}
	h3.active {
		font-family: 'AccentFontI';
		font-weight: normal;
		color: ${({accentColor}) => accentColor.dark};
	}
`
const Text = styled.div`
	grid-row: 2/3;
	grid-column: 1/4;
	display: grid;
	align-items: center;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 24px;
	padding: ${({m}) => m.isTabletP ? '0 0 0 20px'
							: m.isMobile ? '48px 24px 0 24px'
							: '0 0 0 24px'};
	p {
		grid-row: 1/2;
		grid-column: ${({m}) => m.isHugeDesk ? '1/5'
									: m.isDesk || m.isTabletA ? '1/6'
									: '1/7'};
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		white-space: pre-line;
		opacity: 0;
		transition: opacity ${commonTheme.durations.short}s;
	}
	p.active {
		opacity: 1;
	}
`
const Interests = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const gifs = [
		{title: 'Цвета', url: colorsGif, alt: 'Colors', text: 'Меня очень вдохновляют цвета и разнообразные их сочетания: палитры оттенков могут создавать яркие эмоции и окунать в атмосферу и воспоминания.\nВ своих проектах я охотно использую самые разные цвета, а на моем сайте можно с ними даже поиграть!'},
		{title: 'Питомцы', url: petsGif, alt: 'Pets', text: 'В моей жизни всегда было много питомцев. Сейчас у меня 3 любимых кошки: мамины Мишка и Марси, и самая-самая – моя кошка, Клипса!\nА еще мы с моим молодым человеком хотим завести собаку.'},
		{title: 'Игры', url: gamesGif, alt: 'Games', text: 'Иногда в свободное время я позволяю себе немного поиграть. Чаще всего зависаю в многопользовательских шутерах Apex Legends и Overwatch, но иногда прохожу одиночки вроде Life is Strange, Detroit, Ori.'},
		{title: 'Рукоделие', url: gamesGif, alt: 'Handiwork', text: 'С детства обожаю рукоделие и перепробовала, наверное, все виды: рисование, скрапбукинг, квиллинг, вышивка, шитье, вязание, валяние, бисер...\nСейчас в качестве хобби сохранила рисование и лепку украшений из полимерной глины.'},
	]

	const switchGif = e => {
		const titlesArr = document.querySelectorAll('.interest')
		const gifsArr = document.querySelectorAll('.gif')
		const textsArr = document.querySelectorAll('.text')
		for (let i = 0; i < titlesArr.length; i++) {
			titlesArr[i].classList.remove('active')
			gifsArr[i].classList.remove('active')
			textsArr[i].classList.remove('active')
			if (e.target === titlesArr[i]) {
				gifsArr[i].classList.add('active')
				textsArr[i].classList.add('active')
			}
		}
		e.target.classList.add('active')
	}

	return <Wrap>
		<SectionTitle interests>Мои интересы</SectionTitle>
		<Content m={media}>
			<Gifs m={media}>
				{gifs.map((g, i) => <img className={i === 0 ? 'gif active' : 'gif'} key={i} src={g.url} alt={g.alt} />)}
			</Gifs>
			<Container m={media}>
				<InnerContainer m={media}>
					<Toggles accentColor={accentColor} m={media}>
						{gifs.map((g, i) => <h3 className={i === 0 ? 'interest active' : 'interest'} onClick={switchGif} key={i}>{g.title}</h3>)}
					</Toggles>
					{!media.isMobile && <Line />}
					{!media.isMobile && <Text m={media}>
						{gifs.map((g, i) => <p className={i === 0 ? 'text active' : 'text'} key={i}>{g.text}</p>)}
					</Text>}
				</InnerContainer>
			</Container>
			{media.isMobile && <Text m={media}>
				<p>Меня очень вдохновляют цвета и разнообразные их сочетания: палитры оттенков могут создавать яркие эмоции и окунать в атмосферу и воспоминания.<br/>В своих проектах я охотно использую самые разные цвета, а на моем сайте можно с ними даже поиграть!</p>
			</Text>}
		</Content>
	</Wrap>
}

export default Interests;