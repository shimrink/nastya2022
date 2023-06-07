import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import gsap from 'gsap'
import { MediaContext } from '../../AppWrap'
import ThemeToggler from './ThemeToggler'
import AccentColorToggler from './AccentColorToggler'
import Navigation from './Navigation'
import Logo from './Logo'
import MenuMobile from './MenuMobile'
import PageName from './PageName'

const Wrapper = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-column-gap: 24px;
	align-items: center;
	font-family: 'AccentFontM', sans-serif;
	touch-action: none;
	padding: 0 40px;
	margin-top: 40px;
	z-index: 5;
	@media ${({ theme }) => theme.common.media.tablet} {
		margin-top: 24px;
	}
	@media ${({ theme }) => theme.common.media.mobile} {
		padding: 0 clamp(24px, 7.5vw, 40px);
	}
`
const TogglersAndNav = styled.div`
	grid-row: 1/2;
	grid-column: 6/13;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-column-gap: 24px;
	align-items: center;
	@media ${({ theme }) => theme.common.media.tablet} {
		grid-column: 4/13;
		grid-template-columns: auto;
		grid-column-gap: 0;
		justify-self: end;
	}
`
const ThemeTogglerContainer = styled.div`
	grid-row: 1/2;
	grid-column: 1/2;
	display: flex;
	justify-content: flex-end;
	@media ${({ theme }) => theme.common.media.tablet} {
		grid-column: 2/3;
		margin-right: 18px;
		padding: 6px;
		cursor: pointer;
	}
`
const AccentColorTogglerContainer = styled.div`
	grid-row: 1/2;
	justify-self: start;
	grid-column: 2/4;
	@media ${({ theme }) => theme.common.media.tablet} {
		grid-column: 1/2;
	}
`
const Burger = styled.span`
	grid-row: 1/2;
	grid-column: 3/4;
	justify-self: end;
	font-size: 16px;
	color: ${({ theme, isMenuMobileOpen }) =>
		isMenuMobileOpen ? theme.common.colors.white : theme.mode.text};
	cursor: pointer;
	z-index: 7;
	transition: color ${({ theme }) => theme.common.durations.short}s;
`
const Header = ({
	pageInitialized,
	setPageInitialized,
	pageTransition,
	accentColor,
	themeToggler,
	accentColorToggler,
}) => {
	const media = useContext(MediaContext)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [isMenuMobileOpen, setMenuMobileOpen] = useState(false)
	const [navDisable, setNavDisable] = useState(false)
	const [disableWave, setDisableWave] = useState(true)
	const [disableBurger, setDisableBurger] = useState(false)
	const [colorsOpen, setColorsOpen] = useState(false)
	const menuMobileRef = useRef()

	const openMenu = () => {
		setDisableBurger(true)
		document.querySelector('body').style.overflowY = 'hidden'
		menuMobileRef.current.style.display = 'flex'
		gsap.to(menuMobileRef.current, {
			yPercent: 0,
			duration: 0.7,
			ease: 'power4.inOut',
		})
		gsap.to(document.querySelector('.roundedDivRef'), {
			height: '10%',
			duration: 0.7,
			ease: 'power4.inOut',
		})
		setMenuMobileOpen(true)

		setTimeout(() => {
			setDisableWave(false)
		}, 900)
		setTimeout(() => {
			setDisableBurger(false)
		}, 700)
	}

	const closeMenu = useCallback(() => {
		setDisableBurger(true)
		setDisableWave(true)
		document.querySelector('body').style.overflowY = 'visible'
		gsap.to(menuMobileRef.current, {
			yPercent: -100,
			duration: 0.7,
			ease: 'power4.inOut',
		})
		gsap.to(document.querySelector('.roundedDivRef'), {
			height: 0,
			duration: 0.7,
			ease: 'power4.inOut',
		})
		setMenuMobileOpen(false)

		setTimeout(() => {
			setDisableBurger(false)
			menuMobileRef.current.style.display = 'none'
		}, 700)
	}, [])

	const mobilePageTransition = (path) => {
		if (pathname !== path && !navDisable) {
			setPageInitialized(false)
			setNavDisable(true)
			navigate(path)
		}
	}

	useEffect(() => {
		if (!media.isHugeDesk && !media.isDesk && pageInitialized) {
			setNavDisable(false)
			setTimeout(() => {
				closeMenu()
			}, 200)
		}
	}, [pageInitialized, closeMenu, media])

	useEffect(() => {
		if (isMenuMobileOpen) setMenuMobileOpen(!media.isHugeDesk && !media.isDesk)
	}, [media, isMenuMobileOpen])

	return (
		<Wrapper>
			<Logo
				isMenuMobileOpen={isMenuMobileOpen}
				mobilePageTransition={mobilePageTransition}
				pageTransition={pageTransition}
			/>
			{pathname === '/' && <PageName colorsOpen={colorsOpen} />}
			<TogglersAndNav>
				<ThemeTogglerContainer
					onClick={media.isHugeDesk || media.isDesk ? () => {} : themeToggler}
				>
					<ThemeToggler toggleTheme={themeToggler} />
				</ThemeTogglerContainer>
				<AccentColorTogglerContainer>
					<AccentColorToggler
						accentColor={accentColor}
						toggleAccentColor={accentColorToggler}
						setColorsOpen={setColorsOpen}
					/>
				</AccentColorTogglerContainer>
				{media.isHugeDesk || media.isDesk ? (
					<Navigation pageTransition={pageTransition} />
				) : isMenuMobileOpen ? (
					<Burger
						onClick={() => {
							!disableBurger && closeMenu()
						}}
						isMenuMobileOpen={isMenuMobileOpen}
					>
						Закрыть
					</Burger>
				) : (
					<Burger
						onClick={() => {
							!disableBurger && openMenu()
						}}
						isMenuMobileOpen={isMenuMobileOpen}
					>
						Меню
					</Burger>
				)}
			</TogglersAndNav>
			{!media.isHugeDesk && !media.isDesk && (
				<MenuMobile
					ref={menuMobileRef}
					disableWave={disableWave}
					isMenuMobileOpen={isMenuMobileOpen}
					mobilePageTransition={mobilePageTransition}
				/>
			)}
		</Wrapper>
	)
}

export default Header
