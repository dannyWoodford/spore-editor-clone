import React, { useState, useRef, useEffect } from 'react'
import { Gltf, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { Interactive } from '@react-three/xr'

import { useGlobalState } from '../../../GlobalState'

export default function HudModel({ name, path, type, rotation }) {
	const sceneObjects = useGlobalState((state) => state.sceneObjects)
	const setSceneObjects = useGlobalState((state) => state.setSceneObjects)

	const [test, setTest] = useState(false)

	const modelGroup = useRef()

	useEffect(() => {
		if (!modelGroup.current) return

		let box3 = new THREE.Box3().setFromObject(modelGroup.current)
		let size = new THREE.Vector3()

		// add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		modelGroup.current.size = box3.getSize(size)

		// Fix model origin. In real project this should be done on model side in blender
		modelGroup.current.children[0].translateX(-(size.x / 4))
		modelGroup.current.children[0].translateY(-(size.y / 2))
		modelGroup.current.children[0].translateZ(size.x / 2)

		// eslint-disable-next-line
	}, [])

	const selectStartHandler = () => {
		let objData = {
			name: name,
			type: type,
			path: path,
		}

		setSceneObjects([...sceneObjects, objData])

		setTest(true)
	}

	const selectEndHandler = () => {
		setTest(false)
	}

	return (
		<Interactive onSelectStart={() => selectStartHandler()} onSelectEnd={() => selectEndHandler()} ref={modelGroup}>
			{/* <Sphere args={[1]} position={[0, 0.1, 0]} scale={[0.01, 0.01, 0.01]}>
				<meshBasicMaterial color={test ? 'red' : 'white'} />
			</Sphere> */}

			<group name='center-offset' rotation={rotation}>
				<Gltf src={process.env.PUBLIC_URL + path} scale={[0.04, 0.04, 0.04]} />
			</group>
		</Interactive>
	)
}
