import { useRef, useState, useMemo } from 'react'
import { useXR, useController } from '@react-three/xr'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

import { useKeyboardControls } from './useKeyboardControls'

// mapping
// 1: Trigger
// 2: Grip
// 4: Stick Buttons
// 5: A/X
// 6: B/Y

// axes
// 2: XStick
// 3: YStick

export default function MovementController({
	hand = 'right',
	zeroY = true,
	horizontalSensitivity = 0.5,
	forwardSensistivity = 0.5,
	rotationSensitivity = 0.05,
	deadzone = 0.05,
	horizontalAxis = 2,
	forwardAxis = 3,
	rotationAxis = 2,
	applyForward = true,
	applyHorizontal = false,
	applyRotation = true,
}) {
	const { player } = useXR()
	const controller = useController(hand)
	const forward = useRef(new THREE.Vector3())
	const horizontal = useRef(new THREE.Vector3())

	const [textColor, setTextColor] = useState('red')
	const [textContent, setTextContent] = useState('')

	const text = useRef()

	const setText = useMemo(() => {
		return textContent
	}, [textContent])

	const { moveForward, moveBackward, moveLeft, moveRight, rotateLeft, rotateRight } = useKeyboardControls()

	useFrame(() => {
		if (controller && player) {
			const { axes, buttons } = controller.inputSource?.gamepad
			const camera = player.children[0]
			const cameraMatrix = camera.matrixWorld.elements

			forward.current.set(-cameraMatrix[8], -cameraMatrix[9], -cameraMatrix[10]).normalize()

			text.current.lookAt(player.position)

			if (zeroY) {
				forward.current.y = 0
				horizontal.current.y = 0
			}

			if (applyHorizontal) {
				horizontal.current.copy(forward.current)
				horizontal.current.cross(camera.up).normalize()
				player.position.add(horizontal.current.multiplyScalar((Math.abs(axes[horizontalAxis]) > deadzone ? axes[horizontalAxis] : 0) * horizontalSensitivity))
			}

			if (applyForward) {
				player.position.add(forward.current.multiplyScalar((Math.abs(axes[forwardAxis]) > deadzone ? -axes[forwardAxis] : 0) * forwardSensistivity))
			}

			if (applyRotation) {
				player.rotation.y -= (Math.abs(axes[rotationAxis]) > deadzone ? axes[rotationAxis] : 0) * rotationSensitivity
				// player.lookAt(center)
				// player.rotation.y = 0
				// console.log('player.rotation', player.rotation)

				// console.log('player.position', player.position)
				// console.log('forward.current', forward.current)
				// console.log('axes', axes)
				// console.log('forwardAxis', forwardAxis)
				// console.log('deadzone', deadzone)
				// console.log('forwardSensistivity', forwardSensistivity)
			}

			if (moveForward) {
				player.position.z -= 1 * forwardSensistivity
			}
			if (moveBackward) {
				player.position.z += 1 * forwardSensistivity
			}
			if (moveLeft) {
				player.position.x -= 1 * forwardSensistivity
			}
			if (moveRight) {
				player.position.x += 1 * forwardSensistivity
			}

			if (rotateLeft) {
				player.rotation.y += 1 * rotationSensitivity
			}
			if (rotateRight) {
				player.rotation.y -= 1 * rotationSensitivity
			}

			if (buttons[4].pressed) {
				// go up
				player.position.y += 1 * forwardSensistivity
			}
			if (buttons[5].pressed) {
				// go down
				player.position.y -= 1 * forwardSensistivity
			}

			// console.log('buttons', buttons)

			// if (buttons[0].pressed) {
			// 	setTextContent('0')
			// 	setTextColor('blue')
			// }
		}
	})

	return (
		<>
			<Text ref={text} position={[0, 1, 0]} fontSize={0.9} color={textColor} anchorX='center' anchorY='middle'>
				MovementController:
				{setText}
			</Text>
		</>
	)
}
