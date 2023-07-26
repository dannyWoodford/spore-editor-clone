import React from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import useMousePosition from '../helpers/useMousePosition'


const Raycasting = () => {
	const { scene, camera } = useThree()

	const pointer = new THREE.Vector2()
	const raycaster = new THREE.Raycaster()

	// ------ Mouse ---------------------------------------------------------------------------------------------------------------------------------------
	const { mouseX, mouseY } = useMousePosition()

	// ------ Raycasting ---------------------------------------------------------------------------------------------------------------------------------------
	const rayCasterObjects = () => {
		let raycastList = []
		scene.traverse((child) => {
			if (child.type === 'Group' && child.name !== '') {
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
		const intersects = raycaster.intersectObjects(rayCasterObjects(), true)

		if (intersects.length > 0) {
			if (intersects[0].object.name === 'NavigableLocation') {
				console.log('%cNavigableLocation', 'color:red;font-size:14px;')
			} else {
				console.log('%cELSE', 'color:red;font-size:14px;')
			}
		} else {
			return;
		}
	}

		useFrame(() => {
			onNavObjectMove()
		})

	return <></>
}

export default Raycasting;
