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
		octahedron: 'orange',
		icosahedron: 'blue',
	}

	useEffect(() => {
		if (!mesh.current) return
		if (selected?.name === name) {
			console.log('already selected', name, selected?.name)
			return
		}

		setSelected(mesh.current)
	})

	return (
		// Disable visibility initially and set to true in Raycasting.js once mouse position is converted to 3D space
		<mesh ref={mesh} name={name} userData={{ shape: true }} visible={false} onPointerDown={() => setSelected(mesh.current)}>
			<primitive object={allShapes[shape]} />
			<meshLambertMaterial color={allColors[shape]} />
		</mesh>
	)
}
