import React, { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGlobalState } from '../../GlobalState'

import useMousePosition from '../helpers/useMousePosition'

const Raycasting = () => {
	const selected = useGlobalState((state) => state.selected)
	const prevSelectedName = useGlobalState((state) => state.prevSelectedName)
	const initialDragCreate = useGlobalState((state) => state.initialDragCreate)
	const snapDistance = useGlobalState((state) => state.intro.snapDistance)
	const snapping = useGlobalState((state) => state.intro.snapping)

	const { scene, camera, invalidate } = useThree()

	const raycaster = useMemo(() => new THREE.Raycaster(), [])
	const pointer = useMousePosition()

	// ------ Raycasting ---------------------------------------------------------------------------------------------------------------------------------------
	const rayCasterObjects = () => {
		let raycastList = []
		scene.traverse((child) => {
			// Only include "ground" objects or created object

			// Explanation of (child.userData.moveableObj === true && child.name !== selected.name)
			// "child.userData.moveableObj === true" allows you to stack sceneObjects
			// and "child.name !== selected.name" makes sure raycaster doesn't hit the current selected object and cause an infinite climb
			if (child.userData.staticObj === true || (child.userData.moveableObj === true && child.name !== selected.name)) {
				raycastList.push(child)
			}
		})

		return raycastList
	}

	const onNavObjectMove = () => {
		raycaster.setFromCamera(pointer, camera)

		// See if the ray from the camera into the world hits one of our meshes
		const intersects = raycaster.intersectObjects(rayCasterObjects())

		if (intersects.length > 0) {
			if (!selected) return

			if (prevSelectedName === selected.name) return

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
				// console.log('fire 222', selected.position)

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
		if (!initialDragCreate) return

		onNavObjectMove()
	})

	return <></>
}

export default Raycasting
