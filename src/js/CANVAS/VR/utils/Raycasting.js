import React, { useMemo, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useXR } from '@react-three/xr'

import { useGlobalState } from '../../../GlobalState'

export default function Raycasting() {
	const selected = useGlobalState((state) => state.selected)
	const prevSelectedName = useGlobalState((state) => state.prevSelectedName)
	const initialDragCreate = useGlobalState((state) => state.initialDragCreate)

	const { scene } = useThree()
	const { controllers } = useXR()

	const raycaster = useMemo(() => new THREE.Raycaster(), [])

	const rayDir = useRef({
		pos: new THREE.Vector3(),
		dir: new THREE.Vector3(),
	})

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
		if (controllers.length > 0) {
			controllers[1].controller.getWorldDirection(rayDir.current.dir)
			controllers[1].controller.getWorldPosition(rayDir.current.pos)
			rayDir.current.dir.multiplyScalar(-1)
			raycaster.set(rayDir.current.pos, rayDir.current.dir)

			const intersects = raycaster.intersectObjects(rayCasterObjects())

			if (intersects.length > 0) {
				if (!selected) return

				if (prevSelectedName === selected.name) return

				if (intersects[0].object.name === selected.name && intersects.length > 1) {
					// add "selected.size.y / 2" to "intersects[1].point.y" to make sure bottom of object is place on ground
					selected.position.set(intersects[1].point.x, intersects[1].point.y + selected.size.y / 2, intersects[1].point.z)
				} else {
					// add "selected.size.y / 2" to "intersects[1].point.y" to make sure bottom of object is place on ground
					selected.position.set(intersects[0].point.x, intersects[0].point.y + selected.size.y / 2, intersects[0].point.z)
				}
			}
		}
	}

	useFrame(() => {
		if (!initialDragCreate) return

		onNavObjectMove()
	})

	return <></>
}
