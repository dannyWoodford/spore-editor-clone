import React, { useRef, useEffect, useState } from 'react'
import { useCursor, Gltf } from '@react-three/drei'

export default function Model({ setSelectedHandler, setTransformSelectedHandler, selected, name, path }) {
	const [hovered, setHovered] = useState(false)
	useCursor(hovered)

	const mesh = useRef()

	useEffect(() => {
		if (!mesh.current) return
		if (selected?.name === name) {
			return
		}

		setSelectedHandler(mesh.current)

		// eslint-disable-next-line
	}, [])

	return (
		// Disable visibility initially and set to true in Raycasting.js once mouse position is converted to 3D space
		<Gltf
			src={process.env.PUBLIC_URL + path}
			ref={mesh}
			name={name}
			userData={{ sceneObject: true }}
			onClick={() => setTransformSelectedHandler(mesh.current)}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			visible={false}
			castShadow
			receiveShadow
		/>
	)
}
