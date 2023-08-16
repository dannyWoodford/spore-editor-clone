import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useGlobalState } from './../../GlobalState'

export default function Shape({ shape, name }) {
	const selected = useGlobalState((state) => state.selected)
	const setSelected = useGlobalState((state) => state.setSelected)
	const setTransformSelected = useGlobalState((state) => state.setTransformSelected)

	const { invalidate } = useThree()

	const [hovered, setHovered] = useState(false)
	useCursor(hovered)

	const mesh = useRef()

	const allShapes = {
		box: new THREE.BoxGeometry(2, 2, 2),
		sphere: new THREE.SphereGeometry(2),
		cone: new THREE.ConeGeometry(2, 3),
		cylinder: new THREE.CylinderGeometry(2, 2, 3),
		octahedron: new THREE.OctahedronGeometry(2, 1),
		icosahedron: new THREE.IcosahedronGeometry(2, 1),
	}

	const allColors = {
		box: 'red',
		sphere: 'pink',
		cone: 'green',
		cylinder: 'yellow',
		octahedron: 'orange',
		icosahedron: 'blue',
	}

	useEffect(() => {
		if (!mesh.current) return
		if (selected?.name === name) {
			return
		}

		console.log('fire', name)
		setSelected(mesh.current)

		// invalidate()
	})

	const setTransformSelectedHandler = (mesh) => {
		setTransformSelected(mesh)

		invalidate()
	}

	return (
		// Disable visibility initially and set to true in Raycasting.js once mouse position is converted to 3D space
		<mesh
			ref={mesh}
			name={name}
			userData={{ shape: true }}
			onClick={() => setTransformSelectedHandler(mesh.current)}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			visible={false}>
			<primitive object={allShapes[shape]} />
			<meshLambertMaterial color={allColors[shape]} />
		</mesh>
	)
}
