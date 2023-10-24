import React, { useRef, useEffect, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useCursor, Gltf } from '@react-three/drei'

import { useGlobalState } from './../../GlobalState'

export default function Model({ name, path, matrix = null, rebuilt = false }) {
	const selected = useGlobalState((state) => state.sceneNoPersist.selected)
	const setSelected = useGlobalState((state) => state.sceneNoPersist.setSelected)
	const transformSelected = useGlobalState((state) => state.sceneNoPersist.transformSelected)
	const setTransformSelected = useGlobalState((state) => state.sceneNoPersist.setTransformSelected)
	const transformInitRot = useGlobalState((state) => state.sceneNoPersist.transforms.transformInitRot)

	// update sceneObjects on currentProject
	const updateCurrentProject = useGlobalState((state) => state.projectStore.updateCurrentProject)
	const currentProjectSceneObjectData = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectData)

	const [hovered, setHovered] = useState(false)
	useCursor(hovered)

	const mesh = useRef()

	useEffect(() => {
		if (!mesh.current) return
		if (selected?.name === name) {
			// console.log('ham_____________')
			return
		}

		let box3 = new THREE.Box3().setFromObject(mesh.current)
		let size = new THREE.Vector3()

		// add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		mesh.current.size = box3.getSize(size)

		if (transformInitRot !== null) {
			mesh.current.rotation.set(transformInitRot.x, transformInitRot.y, transformInitRot.z)
		}

		if (rebuilt) {
			matrix.decompose(mesh.current.position, mesh.current.quaternion, mesh.current.scale)
		} else {
			setSelected(mesh.current)

			const newObj = {
				name: name,
				matrix: mesh.current.matrix.elements,
				storedPath: path,
				type: 'model',
			}
			updateCurrentProject({ sceneObjectData: [...currentProjectSceneObjectData, newObj] })
		}

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
			// no need to set visibility to true in raycaster for rebuilt objects
			visible={rebuilt ? true : false}>
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
