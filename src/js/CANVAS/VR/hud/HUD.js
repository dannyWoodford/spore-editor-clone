import React, { useCallback, useState, useRef, useEffect } from 'react'
import { useController, useXREvent, useXR } from '@react-three/xr'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'

import { useGlobalState } from '../../../GlobalState'

import Panel from './Panel'

export default function HUD() {
	// const isSetup = useGlobalState((state) => state.vr.isSetup)

	const { player } = useXR()

	const [showHUD, setShowHUD] = useState(false)
	const leftController = useController('left')

	const ref = useRef()
	const boxRef = useRef()

	useFrame(() => {
		if (!leftController) return
		// if (!isSetup) return

		const rayDir = {
			pos: new THREE.Vector3(),
			dir: new THREE.Vector3(),
		}

		// const camera = player.children[0]

		const { grip: controller } = leftController

		controller.getWorldPosition(rayDir.pos)
		controller.getWorldDirection(rayDir.dir)
		rayDir.dir.multiplyScalar(-1)

		let forwardMinus = new THREE.Vector3(rayDir.dir.x - 0.0, 0.2, rayDir.dir.z)
		let lookAtPlayer = new THREE.Vector3(player.position.x, player.position.y + 1.6, player.position.z)
		// let lookAtPlayer = new THREE.Vector3(player.position.x, camera.position.y, player.position.z)

		// console.log('player', player.position)
		// console.log('camera', camera.position)

		const position = rayDir.pos.add(forwardMinus)
		ref.current.position.set(position.x, position.y, position.z)
		ref.current.lookAt(lookAtPlayer)

		boxRef.current.position.set(position.x, position.y, position.z)
		boxRef.current.lookAt(lookAtPlayer)
	})

	const showHUDHandler = useCallback((bol) => setShowHUD(bol), [])

	useXREvent('squeezestart', () => showHUDHandler(true), { handedness: 'left' })
	useXREvent('squeezeend', () => showHUDHandler(false), { handedness: 'left' })

	return (
		<>
			<mesh
				ref={ref}
				// visible={showHUD}
				name={'HUDGroup'}>
				<pointLight position={[0, 0.6, 0.3]} args={['white', 1]} />
				<Panel />
			</mesh>

			<Box ref={boxRef} name={'HUD-bounding-box'} args={[0.6, 0.6, 0.25]} visible={false} userData={{ staticObj: true, isHud: true }}>
				<meshBasicMaterial color='lightgrey' transparent={true} opacity={0.3} />
			</Box>
		</>
	)
}
