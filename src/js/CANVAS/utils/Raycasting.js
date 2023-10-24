import React, { useMemo, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGlobalState } from '../../GlobalState'

import useMousePosition from '../helpers/useMousePosition'
import RaycasterObjects from '../helpers/RaycasterObjects'
import { updateObjectInArray } from '../helpers/HelperFunctions'

const Raycasting = () => {
	const selected = useGlobalState((state) => state.sceneNoPersist.selected)
	const prevSelectedName = useGlobalState((state) => state.sceneNoPersist.prevSelectedName)
	const isTransforming = useGlobalState((state) => state.sceneNoPersist.transforms.isTransforming)
	const snapDistance = useGlobalState((state) => state.intro.snapDistance)
	const snapping = useGlobalState((state) => state.intro.snapping)

	// update sceneObjects on currentProject
	const currentProjectSceneObjectData = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectData)
	const updateCurrentProject = useGlobalState((state) => state.projectStore.updateCurrentProject)

	const { camera, invalidate } = useThree()

	const raycaster = useMemo(() => new THREE.Raycaster(), [])
	const pointer = useMousePosition()
	const getRaycasterObjects = RaycasterObjects()

	const onNavObjectMove = () => {
		raycaster.setFromCamera(pointer, camera)

		// See if the ray from the camera into the world hits one of our meshes
		const intersects = raycaster.intersectObjects(getRaycasterObjects)

		if (intersects.length > 0) {
			if (!selected) return

			if (prevSelectedName === selected.name) {
				// console.log('%cprevSelectedName === selected.name', 'color:red;font-size:14px;', prevSelectedName === selected.name)
				return
			}

			if (intersects[0].object.name === selected.name && intersects.length > 1) {
				// console.log('fire 111')

				if (snapping) {
					let offsetX = Math.round(intersects[0].point.x / snapDistance + -selected.size.x / 2) * snapDistance
					let offsetZ = Math.round(intersects[0].point.z / snapDistance + selected.size.z / 2) * snapDistance

					selected.position.set(offsetX, intersects[1].point.y, offsetZ)
				} else {
					selected.position.set(intersects[1].point.x + -selected.size.x / 2, intersects[1].point.y, intersects[1].point.z + selected.size.z / 2)
				}
			} else {
				// console.log('fire 222')

				if (snapping) {
					let offsetX = Math.round(intersects[0].point.x / snapDistance + -selected.size.x / 2) * snapDistance
					let offsetZ = Math.round(intersects[0].point.z / snapDistance + selected.size.z / 2) * snapDistance

					selected.position.set(offsetX, intersects[0].point.y, offsetZ)
				} else {
					selected.position.set(intersects[0].point.x + -selected.size.x / 2, intersects[0].point.y, intersects[0].point.z + selected.size.z / 2)
				}
			}

			// Object Visibility
			if (!selected.visible) {
				// Visibility is initially false. Once mouse position is converted to 3D space set to true.
				selected.visible = true
			}

			invalidate()
		}
	}

	useFrame(() => {
		if (!isTransforming) return

		onNavObjectMove()
	})

	useEffect(() => {
		if (!isTransforming) {
			if (!selected) return

			const getObject = currentProjectSceneObjectData.find((obj) => obj.name === selected.name)

			getObject.matrix = selected.matrix.elements

			const updatedData = updateObjectInArray(currentProjectSceneObjectData, getObject)

			updateCurrentProject({ sceneObjectData: updatedData })
		}

		// eslint-disable-next-line
	}, [isTransforming])

	return <></>
}

export default Raycasting
