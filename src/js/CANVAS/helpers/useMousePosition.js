import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function useMousePosition () {
	const pointer = useMemo(() => new THREE.Vector2(), [])

	const updateMousePosition = (ev) => {
		pointer.x = (ev.clientX / window.innerWidth) * 2 - 1
		pointer.y = -(ev.clientY / window.innerHeight) * 2 + 1
	}

	useEffect(() => {
		window.addEventListener('drag', updateMousePosition)

		return () => {
			window.removeEventListener('drag', updateMousePosition)
		}
	}, [])

	return pointer
}
