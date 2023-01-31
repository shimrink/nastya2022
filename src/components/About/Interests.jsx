import React, { useContext } from 'react';
import styled from 'styled-components';
import state from '../../store';
import { commonTheme } from '../../styles/theme';
import { AccentColorContext, MediaContext } from '../../AppWrap';
import Line from '../common/Line';
import colorsGif from '../../assets/images/Colors.gif';
import petsGif from '../../assets/images/Cats.gif';
import gamesGif from '../../assets/images/Games.gif';

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 435px;
`
const Title = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '0 40px' : '0 24px'};
	margin-bottom: 76px;
`
const Hi = styled.span`
	font-family: 'AccentFontR', sans-serif;
	font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '18px' : '16px'};
	text-transform: uppercase;
	text-align: center;
	padding-bottom: 48px;
`
const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr ${({media}) => media === 'hugeDesk' ? state.home.gridWidth + 'px' : '1fr'} 1fr;
`
const Gifs = styled.div`
	grid-row: 1/2;
	grid-column: ${({media}) => media === 'hugeDesk' ? '2/3' : '1/4'};
	display: grid;
	grid-template-columns: ${({media}) => media === 'mobile' || media === 'tabletP' ? '1fr 1fr' : 'repeat(12, 1fr)'};
	grid-column-gap: ${({media}) => media === 'mobile' ? 0 : 24}px;
	padding: ${({media}) => media === 'hugeDesk' || media === 'desk' ? '0 40px' : '0 24px'};
	img {
		grid-row: 1/2;
		grid-column: ${({media}) => media === 'mobile' || media === 'tabletP' ? '1/2' : '2/6'};
		width: 100%;
		opacity: 0;
		transition: opacity ${commonTheme.durations.short}ms;
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
	grid-column-gap: 24px;
`
const InnerContainer = styled.div`
	grid-row: 1/2;
	grid-column: 2/3;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-right: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 40 : 24}px;
	margin-left: ${({media}) => media === 'tabletP' ? -12 : media === 'mobile' ? 0 : -24}px;
`
const Toggles = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	padding-left: ${({media}) => media === 'tabletP' ? 12 : media === 'mobile' ? 0 : 24}px;
	h3 {
		font-size: ${({media}) => media === 'mobile' ? 'clamp(26px, 7.08vw, 48px)' : 'clamp(48px, 3.85vw, 76px)'};
		text-transform: uppercase;
		margin-bottom: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 48 : media === 'mobile' ? 0 : 20}px;
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
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 24px;
	padding: ${({media}) => media === 'tabletP' ? ' 0 0 0 12px' : media === 'mobile' ? '48px 24px 0 24px' : '0 0 0 24px'};
	p {
		grid-row: 1/2;
		grid-column: ${({media}) => media === 'hugeDesk' ? '1/5'
											: media === 'desk' || media === 'tabletA' ? '1/6'
											: '1/7'};
		font-size: ${({media}) => media === 'hugeDesk' || media === 'desk' ? 18 : 16}px;
	}
`
const Interests = () => {

	const media = useContext(MediaContext)
	const accentColor = useContext(AccentColorContext)
	const gifs = [
		{title: 'Цвета', url: colorsGif, alt: 'Colors'},
		{title: 'Питомцы', url: petsGif, alt: 'Pets'},
		{title: 'Игры', url: gamesGif, alt: 'Games'},
		{title: 'Рукоделие', url: gamesGif, alt: 'Handiwork'},
	]

	const switchGif = e => {
		const titlesArr = document.querySelectorAll('.interest')
		const gifsArr = document.querySelectorAll('.gif')
		for (let i = 0; i < titlesArr.length; i++) {
			titlesArr[i].classList.remove('active')
			gifsArr[i].classList.remove('active')
			if (e.target === titlesArr[i]) gifsArr[i].classList.add('active')
		}
		e.target.classList.add('active')
	}

	return <Wrap>
		<Title media={media}>
			<Hi media={media}>Мои интересы</Hi>
			<Line />
		</Title>
		<Content media={media}>
			<Gifs media={media}>
				{gifs.map((g, i) => <img className={i === 0 ? 'gif active' : 'gif'} key={i} src={g.url} alt={g.alt} />)}
			</Gifs>
			<Container>
				<InnerContainer media={media}>
					<Toggles accentColor={accentColor} media={media}>
						{gifs.map((g, i) => <h3 className={i === 0 ? 'interest active' : 'interest'} onClick={switchGif} key={i}>{g.title}</h3>)}
					</Toggles>
					{media !== 'mobile' && <Line />}
					{media !== 'mobile' && <Text media={media}>
						<p>Меня очень вдохновляют цвета и разнообразные их сочетания: палитры оттенков могут создавать яркие эмоции и окунать в атмосферу и воспоминания.<br/>В своих проектах я охотно использую самые разные цвета, а на моем сайте можно с ними даже поиграть!</p>
					</Text>}
				</InnerContainer>
			</Container>
			{media === 'mobile' && <Text media={media}>
				<p>Меня очень вдохновляют цвета и разнообразные их сочетания: палитры оттенков могут создавать яркие эмоции и окунать в атмосферу и воспоминания.<br/>В своих проектах я охотно использую самые разные цвета, а на моем сайте можно с ними даже поиграть!</p>
			</Text>}
		</Content>
	</Wrap>
}

export default Interests;