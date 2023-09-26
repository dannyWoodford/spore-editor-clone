import React, { useRef, useEffect } from 'react'
import { Gltf } from '@react-three/drei'
import * as THREE from 'three'

import { useGlobalState } from '../../../GlobalState'

export default function Model({ name, path }) {
	const selected = useGlobalState((state) => state.selected)
	const setSelected = useGlobalState((state) => state.setSelected)
	const setTransformSelected = useGlobalState((state) => state.setTransformSelected)
	const hudScale = useGlobalState((state) => state.vr.hudScale)

	const mesh = useRef()

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
		mesh.current.children[0].translateZ(size.x / 2)

		// eslint-disable-next-line
	}, [])

	return (
		<group ref={mesh} name={name} userData={{ moveableObj: true }} onClick={() => setTransformSelected(mesh.current)} rotation={[0, Math.PI / 2, 0]}>
			<group name='center-offset'>
				<Gltf src={process.env.PUBLIC_URL + path} castShadow receiveShadow scale={hudScale ? [0.04, 0.04, 0.04] : [1, 1, 1]} />
			</group>
		</group>
	)
}
