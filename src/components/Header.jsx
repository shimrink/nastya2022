import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
	return <header>
		<NavLink to='/'>
			<img src='#' alt='logo' />
		</NavLink>
		<nav>
			<NavLink to='/cases'>Все кейсы</NavLink>
			<NavLink to='/about'>Обо мне</NavLink>
			<NavLink to='/services'>Услуги</NavLink>
			<NavLink to='/contacts'>Контакты</NavLink>
		</nav>
	</header>
}

export default Header;