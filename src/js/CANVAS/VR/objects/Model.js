import React, { useRef, useEffect } from 'react'
import { Gltf } from '@react-three/drei'
import * as THREE from 'three'
import { useXR } from '@react-three/xr'
import { useFrame, useThree } from '@react-three/fiber'

export default function Model({ name, path, useNormal = true }) {
	const { scene} = useThree()

	const mesh = useRef()

	useEffect(() => {
		if (!mesh.current) return

		let box3 = new THREE.Box3().setFromObject(mesh.current)
		let size = new THREE.Vector3()

		// add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		mesh.current.size = box3.getSize(size)

		// Fix model origin. In real project this should be done on model side in blender
		mesh.current.children[0].translateX(-(size.x / 4))
		mesh.current.children[0].translateY(-(size.y / 2))
		mesh.current.children[0].translateZ(size.x / 2)
		// eslint-disable-next-line
	}, [])

	// ------ Raycasting ---------------------------------------------------------------------------------------------------------------------------------------
	const rayCasterObjects = () => {
		let raycastList = []
		scene.traverse((child) => {
			// Only include "ground" objects or created object

			// Explanation of (child.userData.sceneObject === true && child.name !== selected.name)
			// "child.userData.sceneObject === true" allows you to stack sceneObjects
			// and "child.name !== selected.name" makes sure raycaster doesn't hit the current selected object and cause an infinite climb
			if (
				child.name === 'platform' ||
				child.name === 'platform-base' ||
				child.name === 'boundary-sphere' ||
				child.userData.sceneObject === true 
				// || 
				// (child.userData.sceneObject === true && child.name !== name)
			) {
				// console.log('child', child)
				raycastList.push(child)
			}
		})

		// console.log('raycastList', raycastList)

		return raycastList
	}


	// ------ Drag ---------------------------------------------------------------------------------------------------------------------------------------
	const ray = useRef(new THREE.Raycaster())

	const rayDir = useRef({
		pos: new THREE.Vector3(),
		dir: new THREE.Vector3(),
	})

	const { controllers } = useXR()

	useFrame(() => {
		if (controllers.length > 0 && ray.current && mesh.current) {
			// console.log('controllers', controllers)

			controllers[1].controller.getWorldDirection(rayDir.current.dir)
			controllers[1].controller.getWorldPosition(rayDir.current.pos)
			rayDir.current.dir.multiplyScalar(-1)
			ray.current.set(rayDir.current.pos, rayDir.current.dir)

			const intersects = ray.current.intersectObjects(rayCasterObjects())

			// console.log('intersects 111', intersects)

			if (intersects.length > 0) {
				if (useNormal) {
					const p = intersects[0].point

					mesh.current.position.set(0, 0, 0)

					const n = intersects[0].face.normal.clone()
					n.transformDirection(intersects[0].object.matrixWorld)

					mesh.current.lookAt(n)
					mesh.current.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
					mesh.current.position.copy(p)
				} else {
					mesh.current.position.copy(intersects[0].point)
				}
			}
		}
	})

	return (
		<group
			ref={mesh}
			name={name}
			userData={{ sceneObject: true }}
			rotation={[0, Math.PI / 2, 0]}
			castShadow
			receiveShadow>
			<group name='center-offset' castShadow receiveShadow>
				<Gltf
					src={process.env.PUBLIC_URL + path}
					// scale={[0.04, 0.04, 0.04]}
					castShadow
					receiveShadow
				/>
			</group>
		</group>
	)
}
