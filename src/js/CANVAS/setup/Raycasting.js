import React from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGlobalState } from './../../GlobalState'

import useMousePosition from '../helpers/useMousePosition'

const Raycasting = () => {
	const selected = useGlobalState((state) => state.selected)
	const prevSelected = useGlobalState((state) => state.prevSelected)
	const initialDragCreate = useGlobalState((state) => state.initialDragCreate)

	const { scene, camera, invalidate } = useThree()

	const pointer = new THREE.Vector2()
	const raycaster = new THREE.Raycaster()

	// ------ Mouse ---------------------------------------------------------------------------------------------------------------------------------------
	const { mouseX, mouseY } = useMousePosition()

	// ------ Raycasting ---------------------------------------------------------------------------------------------------------------------------------------
	const rayCasterObjects = () => {
		let raycastList = []
		scene.traverse((child) => {
			// Only include "ground" objects or created object
			if (child.name === 'platform' || child.name === 'platform-base' || child.name === 'boundry-sphere' || child.userData.shape === true) {
				raycastList.push(child)
			}
		})

		return raycastList
	}

	const onNavObjectMove = () => {
		pointer.x = (mouseX / window.innerWidth) * 2 - 1
		pointer.y = -(mouseY / window.innerHeight) * 2 + 1

		raycaster.setFromCamera(pointer, camera)

		// See if the ray from the camera into the world hits one of our meshes
		const intersects = raycaster.intersectObjects(rayCasterObjects())

		if (intersects.length > 0) {
			if (!selected) return

			if (prevSelected === selected.name) return

			if (intersects[0].object.name === selected.name && intersects.length > 1) {
				selected.position.set(intersects[1].point.x, intersects[1].point.y, intersects[1].point.z)
			} else {
				selected.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z)
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
