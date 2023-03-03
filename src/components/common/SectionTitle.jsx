import React, { useContext } from 'react';
import styled from 'styled-components';
import { MediaContext } from '../../AppWrap';
import Line from '../../components/common/Line';

const Title = styled.div`
	position: relative;
	grid-row: 1/2;
	grid-column: 1/4;
	width: 100%;
	padding: ${({m}) => m.isMobile ? '0 clamp(24px, 7.5vw, 40px)' : '0 40px'};
	margin-bottom: ${({m, info, skills, valuesInWork, interests, cases}) =>
						valuesInWork && !m.isTabletP && !m.isMobile ? '96px'
						: skills || (valuesInWork && m.isMobile) || (interests && !m.isHugeDesk && !m.isDesk) ? '48px'
						: info && m.isMobile ? 'clamp(48px, 14.58vw, 76px)'
						: cases ? '0'
						: '76px'};
	h3 {
		position: relative;
		margin-bottom: 48px;
		font-family: 'AccentFontR', sans-serif;
		font-weight: normal;
		font-size: ${({m}) => m.isHugeDesk || m.isDesk ? 18 : 16}px;
		text-align: center;
		text-transform: uppercase;
	}
`
const SectionTitle = ({ children, info, skills, valuesInWork, interests, cases }) => {

	const media = useContext(MediaContext)

	return <Title m={media} info={info} skills={skills} valuesInWork={valuesInWork} interests={interests} cases={cases}>
		<h3 className='animItems _anim-show-opacity'>{children}</h3>
		<Line />
	</Title>
}

export default SectionTitle;