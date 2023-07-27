import { useState, useEffect } from 'react'

const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState({ mouseX: null, mouseY: null })

	const updateMousePosition = (ev) => {
		setMousePosition({ mouseX: ev.clientX, mouseY: ev.clientY })
	}

	useEffect(() => {
		window.addEventListener('drag', updateMousePosition)

		return () => {
			window.removeEventListener('drag', updateMousePosition)
		}
	}, [])

	return mousePosition
}

export default useMousePosition
