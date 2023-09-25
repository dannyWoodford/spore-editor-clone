import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useCursor, Gltf } from '@react-three/drei'

import { useGlobalState } from './../../GlobalState'

export default function Model({ name, path }) {
	const selected = useGlobalState((state) => state.selected)
	const setSelected = useGlobalState((state) => state.setSelected)
	const setTransformSelected = useGlobalState((state) => state.setTransformSelected)

	const [hovered, setHovered] = useState(false)
	useCursor(hovered)

	const mesh = useRef()
	const model = useRef()

	useEffect(() => {
		if (!mesh.current) return
		if (selected?.name === name) {
			return
		}

		setSelected(mesh.current)

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
			userData={{ moveableObj: true }}
			onClick={() => setTransformSelected(mesh.current)}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			visible={false}>
			<group name='center-offset'>
				<Gltf ref={model} src={process.env.PUBLIC_URL + path} castShadow receiveShadow />
			</group>
		</group>
	)
}
