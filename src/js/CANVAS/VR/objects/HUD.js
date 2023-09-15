import React, { useEffect, useCallback, useState } from 'react'
import { useController, useXREvent } from '@react-three/xr'
import { useBox } from '@react-three/cannon'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import Panel from './hud/Panel'

const HUD = () => {
	const [showHUD, setShowHUD] = useState(false)
	const leftController = useController('left')
	const [ref, api] = useBox(() => ({ type: 'Kinematic', args: [0.17, 0.05, 0.175] }))

	useEffect(() => {
		if (leftController) {
			console.log('leftController', leftController)
			console.log('api', api)
		}
	}, [leftController])

	useFrame((state) => {
		if (!leftController) {
			return
		}
		const { grip: controller } = leftController
		const forward = new THREE.Vector3(0, 0, -0.5)
		forward.applyQuaternion(controller.quaternion)
		const position = new THREE.Vector3().copy(controller.position).add(forward)
		api.position.set(position.x, position.y, position.z)
		// api.rotation.set(controller.rotation.x, controller.rotation.y, controller.rotation.z)
		// api.rotation.set(-Math.PI / 8, 0, 0)
	})


	const showHUDHandler = useCallback((bol) => setShowHUD(bol), [])

	useXREvent('squeezestart', () => showHUDHandler(true), { handedness: 'left' })
	useXREvent('squeezeend', () => showHUDHandler(false), { handedness: 'left' })

	return (
		<mesh
			ref={ref}
			// visible={showHUD}
		>
			<group name={'HUDGroup'}>
				<Panel />
			</group>
		</mesh>
	)
}

export default HUD
