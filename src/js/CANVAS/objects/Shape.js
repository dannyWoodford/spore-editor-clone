import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useCursor } from '@react-three/drei'

export default function Shape({ shape, setSelectedHandler, setTransformSelectedHandler, selected, name }) {
	const [hovered, setHovered] = useState(false)
	useCursor(hovered)

	const mesh = useRef()

	const allShapes = {
		box: new THREE.BoxGeometry(.5, .5, .5),
		sphere: new THREE.SphereGeometry(.5),
		cone: new THREE.ConeGeometry(.5, .8),
		cylinder: new THREE.CylinderGeometry(.5, .5, .8),
		octahedron: new THREE.OctahedronGeometry(.5, 1),
		icosahedron: new THREE.IcosahedronGeometry(.5, 1),
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

		setSelectedHandler(mesh.current)

		let box3 = new THREE.Box3().setFromObject(mesh.current)
		let size = new THREE.Vector3()

		// add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		mesh.current.size = box3.getSize(size)

		// eslint-disable-next-line
	}, [])

	return (
		// Disable visibility initially and set to true in Raycasting.js once mouse position is converted to 3D space
		<mesh
			ref={mesh}
			name={name}
			userData={{ sceneObject: true }}
			onClick={() => setTransformSelectedHandler(mesh.current)}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			visible={false}
			castShadow
			receiveShadow>
			<primitive object={allShapes[shape]} />
			<meshLambertMaterial color={allColors[shape]} />
		</mesh>
	)
}
