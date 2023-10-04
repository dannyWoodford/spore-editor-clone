import React, { useRef, useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useCursor, Gltf } from '@react-three/drei'

import { useGlobalState } from './../../GlobalState'

export default function Model({ name, path }) {
	const selected = useGlobalState((state) => state.selected)
	const setSelected = useGlobalState((state) => state.setSelected)
	const transformSelected = useGlobalState((state) => state.transformSelected)
	const setTransformSelected = useGlobalState((state) => state.setTransformSelected)
	const transformInitRot = useGlobalState((state) => state.transforms.transformInitRot)

	const sceneObjects = useGlobalState((state) => state.sceneObjects)
	const setSceneObjects = useGlobalState((state) => state.setSceneObjects)

	const [hovered, setHovered] = useState(false)
	useCursor(hovered)

	const mesh = useRef()

	useEffect(() => {
		if (!mesh.current) return
		if (selected?.name === name) {
			console.log('ham_____________')
			return
		}

		setSelected(mesh.current)

		let box3 = new THREE.Box3().setFromObject(mesh.current)
		let size = new THREE.Vector3()

		// const helper = new THREE.Box3Helper(box3, 0xffff00)
		// mesh.current.add(helper)


		// add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		mesh.current.size = box3.getSize(size)

		// Fix model origin. In real project this should be done on model side in blender
		// mesh.current.children[0].translateX(-(size.x / 2))
		// mesh.current.children[0].translateY(-(size.y / 2))
		// mesh.current.children[0].translateZ(size.z / 2)

		
		if (transformInitRot !== null) {
			mesh.current.rotation.set(transformInitRot.x, transformInitRot.y, transformInitRot.z)
		}

		setSceneObjects([...sceneObjects, mesh.current])

		// eslint-disable-next-line
	}, [])

		const colorHandler = useMemo(() => {
			if (name === selected?.name) {
				return <meshPhysicalMaterial color='green' />
			} else if (name === transformSelected?.name) {
				return <meshPhysicalMaterial color='blue' />
			} else {
				return <meshPhysicalMaterial color='orange' />
			}
		}, [name, selected, transformSelected])

	return (
		// Disable visibility initially and set to true in Raycasting.js once mouse position is converted to 3D space
		<group
			ref={mesh}
			name={name}
			userData={{ moveableObj: true }}
			onClick={(e) => {
				e.stopPropagation()
				setTransformSelected(mesh.current)
			}}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			visible={false}>
			<group name='center-offset'>
				<Gltf 
					src={process.env.PUBLIC_URL + path} 
					castShadow 
					receiveShadow 
					// inject={colorHandler} 
				/>
			</group>
		</group>
	)
}
