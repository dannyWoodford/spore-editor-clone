import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Gltf, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { Interactive } from '@react-three/xr'

export default function Model2({ path, position }) {
	const { scene } = useThree()

	const [test, setTest] = useState(false)

	const mesh = useRef()
	const helper = useRef()

	useEffect(() => {
		if (!mesh.current) return

		// let box3 = new THREE.Box3().setFromObject(mesh.current)
		// let size = new THREE.Vector3()

		// // add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		// mesh.current.size = box3.getSize(size)

		// // Fix model origin. In real project this should be done on model side in blender
		// mesh.current.children[0].translateX(-(size.x / 4))
		// mesh.current.children[0].translateY(-(size.y / 2))
		// mesh.current.children[0].translateZ(size.x / 2)
		// mesh.current.children[0].translateZ(5)

		// helper.current = new THREE.Box3Helper(box3, 0xffff00)

		// scene.add(helper.current)

		// const meshWorldPos = new THREE.Vector3(0, 0, 0)
		// mesh.current.children[0].getWorldPosition(meshWorldPos)

		// const helperWorldPos = new THREE.Vector3(0, 0, 0)
		// helper.current.getWorldPosition(helperWorldPos)

		// console.log('center-offset', mesh.current.children[0])
		// console.log('meshWorldPos', meshWorldPos)
		// console.log('helper', helper.current)
		// console.log('helperWorldPos', helperWorldPos)

		// console.log('size', size)
		// console.log('mesh.current.children[0]', mesh.current.children[0])

		// eslint-disable-next-line
	}, [])

	// useFrame(() => {
	// 	// helper.position.set(meshWorldPos)
	// 	helper.current.updateMatrixWorld(true)

	// 	// console.log('helper', helper.current)

	// })

	const groupRef = useRef()
	const grabbingController = useRef()
	const previousTransform = useMemo(() => new THREE.Matrix4(), [])

	useFrame(() => {
		const controller = grabbingController.current
		const group = groupRef.current
		if (!controller) return

		// group.removeFromParent()

		group.applyMatrix4(previousTransform)
		group.applyMatrix4(controller.matrixWorld)
		group.updateMatrixWorld()

		console.log('controller', controller)
		console.log('controller.matrixWorld', controller.matrixWorld)
		console.log('group', group)
		console.log('previousTransform', previousTransform)

		previousTransform.copy(controller.matrixWorld).invert()
	})

	const selectStartHandler = (e) => {
		grabbingController.current = e.target.controller
		previousTransform.copy(e.target.controller.matrixWorld).invert()
		setTest(true)
	}

	const selectEndHandler = (e) => {
		if (e.target.controller === grabbingController.current) {
			grabbingController.current = undefined
		}

		setTest(false)
	}

	return (
		<group
			ref={mesh}
			// userData={{ sceneObject: true }}
			rotation={[0, Math.PI / 2, 0]}
			castShadow
			receiveShadow
			position={position}>
			<Sphere args={[1]} position={[0, 0.1, 0]}>
				<meshBasicMaterial color={test ? 'red' : 'white'} />
			</Sphere>
			<group name='center-offset' castShadow receiveShadow>
				<Interactive ref={groupRef} onSelectStart={(e) => selectStartHandler(e)} onSelectEnd={(e) => selectEndHandler(e)}>
					<Gltf src={process.env.PUBLIC_URL + path} castShadow receiveShadow />
				</Interactive>
			</group>
		</group>
	)
}
