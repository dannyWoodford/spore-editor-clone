import React, { useRef, useEffect } from 'react'
import { Gltf } from '@react-three/drei'
import * as THREE from 'three'
import { Interactive, useXREvent } from '@react-three/xr'

import { useGlobalState } from '../../../GlobalState'

export default function HudModel({ name, path, type, rotation }) {
	const contentBrowserItems = useGlobalState((state) => state.sceneStore.contentBrowserItems)
	const setContentBrowserItems = useGlobalState((state) => state.sceneStore.setContentBrowserItems)
	const selected = useGlobalState((state) => state.sceneStore.selected)
	const setPrevSelectedName = useGlobalState((state) => state.sceneStore.setPrevSelectedName)
	const isTransforming = useGlobalState((state) => state.sceneStore.transforms.isTransforming)
	const setIsTransforming = useGlobalState((state) => state.sceneStore.transforms.setIsTransforming)

	const modelGroup = useRef()

	useEffect(() => {
		if (!modelGroup.current) return

		let box3 = new THREE.Box3().setFromObject(modelGroup.current)
		let size = new THREE.Vector3()

		// add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		modelGroup.current.size = box3.getSize(size)

		// Fix model origin. In real project this should be done on model side in blender
		modelGroup.current.children[0].translateX(-(size.x / 2))
		modelGroup.current.children[0].translateY(-(size.y / 2))
		modelGroup.current.children[0].translateZ(size.x / 2)

		// eslint-disable-next-line
	}, [])

	const selectStartHandler = () => {
		setIsTransforming(true)

		let objData = {
			name: name,
			type: type,
			path: path,
		}

		setContentBrowserItems([...contentBrowserItems, objData])
	}

	const selectEndHandler = () => {
		if (isTransforming) {
			setIsTransforming(false)
			setPrevSelectedName(selected?.name)
		}
	}

	useXREvent('selectend', selectEndHandler, { handedness: 'right' })

	return (
		<Interactive ref={modelGroup} onSelectStart={() => selectStartHandler()}>
			<group name='center-offset' rotation={rotation}>
				<Gltf src={process.env.PUBLIC_URL + path} scale={[0.04, 0.04, 0.04]} userData={{ staticObj: true, isHud: true }} />
			</group>
		</Interactive>
	)
}
