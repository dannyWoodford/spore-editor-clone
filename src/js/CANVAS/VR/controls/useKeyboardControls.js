import { useState, useEffect } from 'react'

function actionByKey(key) {
	const keys = {
		ArrowUp: 'moveForward',
		ArrowDown: 'moveBackward',
		ArrowLeft: 'moveLeft',
		ArrowRight: 'moveRight',
		KeyA: 'rotateLeft',
		KeyD: 'rotateRight',
	}
	return keys[key]
}

export const useKeyboardControls = () => {
	const [movement, setMovement] = useState({
		moveForward: false,
		moveBackward: false,
		moveLeft: false,
		moveRight: false,
		rotateLeft: false,
		rotateRight: false,
	})

	useEffect(() => {
		const handleKeyDown = (e) => {
			// Movement key
			if (actionByKey(e.code)) {
				setMovement((state) => ({ ...state, [actionByKey(e.code)]: true }))
			}
		}
		const handleKeyUp = (e) => {
			// Movement key
			if (actionByKey(e.code)) {
				setMovement((state) => ({ ...state, [actionByKey(e.code)]: false }))
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	return movement
}
