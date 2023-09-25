import React, { useMemo, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useXREvent, useController } from '@react-three/xr'

import { useGlobalState } from '../../../GlobalState'

export default function OrbitController() {
	const selected = useGlobalState((state) => state.selected)
	const setHudScale = useGlobalState((state) => state.vr.setHudScale)
	const hudScale = useGlobalState((state) => state.vr.hudScale)

	// const transformSelected = useGlobalState((state) => state.transformSelected)
	// const prevSelectedName = useGlobalState((state) => state.prevSelectedName)
	// const initialDragCreate = useGlobalState((state) => state.initialDragCreate)

	const [orbitDrag, setOrbitDrag] = useState(false)

	const { scene } = useThree()
	const rightController = useController('right')

	const raycaster = useMemo(() => new THREE.Raycaster(), [])

	const rayDir = useRef({
		pos: new THREE.Vector3(),
		dir: new THREE.Vector3(),
	})

	const targetLoc = useRef()

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

		// console.log('raycastList', raycastList)

		return raycastList
	}

	const selectStartHandler = () => {
		// console.log('selected', selected)
		// console.log('transformSelected', transformSelected)
		// console.log('initialDragCreate', initialDragCreate)

		setOrbitDrag(true)
	}

	const selectEndHandler = () => {
		setOrbitDrag(false)
	}

	useXREvent('selectstart', selectStartHandler, { handedness: 'right' })
	useXREvent('selectend', selectEndHandler, { handedness: 'right' })

	const onIndicatorMove = () => {
		if (rightController && targetLoc.current) {
			rightController.controller.getWorldDirection(rayDir.current.dir)
			rightController.controller.getWorldPosition(rayDir.current.pos)
			rayDir.current.dir.multiplyScalar(-1)
			raycaster.set(rayDir.current.pos, rayDir.current.dir)

			const intersects = raycaster.intersectObjects(rayCasterObjects())

			if (intersects.length > 0) {
				if ((intersects[0].object.userData.isHud === true || intersects[0].object.parent.userData.isHud === true) && !hudScale) {
					// console.log('add')
					setHudScale(true)
				} else if ((intersects[0].object.userData.isHud !== true && intersects[0].object.parent.userData.isHud !== true) && hudScale) {
					// console.log('remove', intersects[0].object.parent.userData.isHud)
					setHudScale(false)
				}

				const p = intersects[0].point

				targetLoc.current.position.set(0, 0, 0)

				const n = intersects[0].face.normal.clone()
				n.transformDirection(intersects[0].object.matrixWorld)

				targetLoc.current.lookAt(n)
				targetLoc.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
				targetLoc.current.position.set(p.x, p.y, p.z)
				// targetLoc.current.position.set(p.x, p.y + targetLoc.current.geometry.parameters.height / 2, p.z)
			}
		}
	}

	useFrame(() => {
		// if (initialDragCreate) return

		onIndicatorMove()

		// onNavObjectMove()

		// if (!initialDragCreate) {
		// 	onIndicatorMove()
		// } else {
		// 	onNavObjectMove()
		// }
	})

	return (
		<mesh ref={targetLoc} scale={hudScale ? [0.04, 0.04, 0.04] : [1, 1, 1]} visible={false}>
			<coneGeometry args={[0.5, 1.0, 6]} attach='geometry' />
			<meshBasicMaterial color={orbitDrag ? 'red' : 0xff00ff} />
		</mesh>
	)
}
