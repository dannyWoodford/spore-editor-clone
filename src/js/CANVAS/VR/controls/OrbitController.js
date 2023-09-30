import React, { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useXREvent, useController } from '@react-three/xr'

import { useGlobalState } from '../../../GlobalState'
import RaycasterObjects from '../../helpers/RaycasterObjects'

export default function OrbitController() {
	const setHudScale = useGlobalState((state) => state.vr.setHudScale)
	const hudScale = useGlobalState((state) => state.vr.hudScale)

	const [orbitDrag, setOrbitDrag] = useState(false)

	const rightController = useController('right')

	const raycaster = useMemo(() => new THREE.Raycaster(), [])
	const getRaycasterObjects = RaycasterObjects()

	const rayDir = useRef({
		pos: new THREE.Vector3(),
		dir: new THREE.Vector3(),
	})

	const targetLoc = useRef()

	const selectStartHandler = () => {
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

			const intersects = raycaster.intersectObjects(getRaycasterObjects)

			if (intersects.length > 0) {
				if ((intersects[0].object.userData.isHud === true || intersects[0].object.parent.userData.isHud === true) && !hudScale) {
					// console.log('add')
					setHudScale(true)
				} else if (intersects[0].object.userData.isHud !== true && intersects[0].object.parent.userData.isHud !== true && hudScale) {
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
		// if (isTransforming) return

		onIndicatorMove()

		// onNavObjectMove()

		// if (!isTransforming) {
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
