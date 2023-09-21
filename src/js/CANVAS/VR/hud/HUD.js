import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useController, useXREvent, useXR } from '@react-three/xr'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import Panel from './Panel'

export default function HUD() {
	const { player } = useXR()

	const [showHUD, setShowHUD] = useState(false)
	const leftController = useController('left')

	const ref = useRef()

	useFrame(() => {
		if (!leftController) {
			return
		}

		const rayDir = {
			pos: new THREE.Vector3(),
			dir: new THREE.Vector3(),
		}

		const camera = player.children[0]

		const { grip: controller } = leftController
		const forward = new THREE.Vector3(0, 0, -0.5)
		forward.applyQuaternion(controller.quaternion)

		controller.getWorldPosition(rayDir.pos)
		controller.getWorldDirection(rayDir.dir)
		rayDir.dir.multiplyScalar(-1)

		let forwardMinus = new THREE.Vector3(rayDir.dir.x, 0.2, rayDir.dir.z)
		let lookAtPlayer = new THREE.Vector3(player.position.x, camera.position.y, player.position.z)

		const position = rayDir.pos.add(forwardMinus)
		ref.current.position.set(position.x, position.y, position.z)
		ref.current.lookAt(lookAtPlayer)
	})

	const showHUDHandler = useCallback((bol) => setShowHUD(bol), [])

	useXREvent('squeezestart', () => showHUDHandler(true), { handedness: 'left' })
	useXREvent('squeezeend', () => showHUDHandler(false), { handedness: 'left' })

	return (
		<mesh
			ref={ref}
			// visible={showHUD}
			name={'HUDGroup'}>
			<Panel />
		</mesh>
	)
}
