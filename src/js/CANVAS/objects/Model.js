import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
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

		let box3 = new THREE.Box3().setFromObject(mesh.current)
		let size = new THREE.Vector3()

		// add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		mesh.current.size = box3.getSize(size)

		// Fix model origin. In real project this should be done on model side in blender
		mesh.current.children[0].translateX(-(size.x / 2))
		mesh.current.children[0].translateY(-(size.y / 2))
		mesh.current.children[0].translateZ(size.z / 2)

		// eslint-disable-next-line
	}, [])

	return (
		// Disable visibility initially and set to true in Raycasting.js once mouse position is converted to 3D space
		<group
			ref={mesh}
			name={name}
			userData={{ sceneObject: true }}
			onClick={() => setTransformSelectedHandler(mesh.current)}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			visible={false}
			castShadow
			receiveShadow>
			<group name='center-offset' castShadow receiveShadow>
				<Gltf src={process.env.PUBLIC_URL + path} castShadow receiveShadow />
			</group>
		</group>
	)
}
