import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Shape({ shape, setSelected, selected, name }) {
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
		octahedron: 'grey',
		icosahedron: 'blue',
	}

	useEffect(() => {
		if (!mesh.current) return
		if (selected?.name === name) return

		// console.log('setSelected', name, selected?.name)
		setSelected(mesh.current)
	}, [])

	return (
		// Disable visibility initially and set to true in Raycasting.js once mouse position is converted to 3D space
		<mesh ref={mesh} name={name} userData={{ shape: true }} visible={false}>
			<primitive object={allShapes[shape]} />
			<meshStandardMaterial color={allColors[shape]} />
		</mesh>
	)
}
