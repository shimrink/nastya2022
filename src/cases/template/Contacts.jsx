import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import { commonTheme } from '../../styles/theme';
import LetterByLetter from '../../components/common/LetterByLetter';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	align-items: end;
	width: 100%;
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin: ${ ({m}) => m.isHugeDesk ? '202px 0 40px 0'
							: m.isDesk ? '160px 0 40px 0'
							: m.isMobile ? '152px 0 24px 0'
							: '120px 0 24px 0'};
`
const Copywriting = styled.div`
	grid-row: ${({m}) => m.isMobile ? '2/3' : '1/2'};
	grid-column: ${({m}) => m.isMobile ? '1/3' : '1/2'};
	display: flex;
	flex-direction: column;
	font-size: ${ ({m}) => m.isHugeDesk || m.isDesk ? '16px'
								: m.isMobile ? 'clamp(12px, 3.125vw, 14px)'
								: '14px'};
	color: ${commonTheme.colors.secondary};
`
const Team = styled(Copywriting)`
	grid-column: ${({m}) => m.isMobile ? '3/5' : '4/5'};
	text-align: end;
`
const Links = styled.div`
	grid-row: 1/2;
	grid-column: ${({m}) => m.isMobile ? '1/5' : '2/4'};
	display: flex;
	justify-content: ${({m}) => m.isMobile ? 'space-between' : 'center'};
	margin-bottom: ${({m}) => m.isMobile ? 'clamp(24px, 8.125vw, 46px)' : '0'};
	a {
		margin-right: ${ ({m}) => m.isMobile ? 0
										: m.isTabletP ? 16
										: 24}px;
		font-size: ${({m}) => m.isMobile ? 'clamp(14px, 3.61vw, 16px)' : '16px'};
	}
	a:last-child {
		margin-right: 0;
	}
`
const Contacts = ({ c }) => {

	const media = useContext(MediaContext)

	return <Wrapper m={media}>
		<Copywriting m={media}>
			<span>©2023</span>
			<span>ASYADULOVA</span>
		</Copywriting>
		<Links m={media}>
			<a className='linkUnderLine' href="https://vk.com/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter>Vk</LetterByLetter>
			</a>
			<a className='linkUnderLine' href="https://t.me/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter>Telegramm</LetterByLetter>
			</a>
			<a className='linkUnderLine' href="https://www.instagram.com/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter>Ig</LetterByLetter>
			</a>
			<a className='linkUnderLine' href="https://www.behance.net/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter>Behance</LetterByLetter>
			</a>
			<a className='linkUnderLine' href="https://experts.tilda.cc/asyadulova" target="_blank" rel="noreferrer">
				<LetterByLetter>Tilda experts</LetterByLetter>
			</a>
		</Links>
		<Team m={media}>
			<span>Design {c.design.name}</span>
			<span>Development {c.dev.name}</span>
		</Team>
	</Wrapper>
}

export default Contacts;