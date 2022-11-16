import { useEffect, useState } from "react"

export const useColorMode = () => {

	const [theme, setTheme] = useState('light')
	const [accentColor, setAccentColor] = useState('purple')
	const [mountedComponent, setMountedComponent] = useState(false)

	const setMode = mode => {
		window.localStorage.setItem('theme', mode)
		setTheme(mode)
	}

	const setAccent = accent => {
		window.localStorage.setItem('accentColor', accent)
		setAccentColor(accent)
	}

	const themeToggler = () => {
		theme === 'light' ? setMode('dark') : setMode('light')
	}

	const accentColorToggler = (id) => {
		switch (id) {
			case 'blue':
				setAccent('blue')
				break
			case 'green':
				setAccent('green')
				break
			case 'orange':
				setAccent('orange')
				break
			default:
				setAccent('purple')
				break
		}
	}

	useEffect( () => {
		const localTheme = window.localStorage.getItem('theme')
		const localAccent = window.localStorage.getItem('accentColor')
		localTheme && setTheme(localTheme)
		localAccent && setAccentColor(localAccent)
		setMountedComponent(true)
	}, [])

	return [theme, accentColor, accentColorToggler, themeToggler, mountedComponent]
}