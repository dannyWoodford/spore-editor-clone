import { useState, useEffect } from 'react'

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState({ mouseX: null, mouseY: null })

	const updateMousePosition = (ev) => {
		setMousePosition({ mouseX: ev.clientX, mouseY: ev.clientY })
	}

	useEffect(() => {
		window.addEventListener('pointermove', updateMousePosition)

		return () => window.removeEventListener('pointermove', updateMousePosition)
	}, [])

	return mousePosition
}

export default useMousePosition
