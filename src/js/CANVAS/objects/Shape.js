import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useCursor } from '@react-three/drei'
import { useGlobalState } from '../../GlobalState'

export default function Shape({ shape, name, matrix = null, rebuilt = false }) {
	const selected = useGlobalState((state) => state.sceneNoPersist.selected)
	const setSelected = useGlobalState((state) => state.sceneNoPersist.setSelected)
	const setTransformSelected = useGlobalState((state) => state.sceneNoPersist.setTransformSelected)

	// update sceneObjects on currentProject
	const updateCurrentProject = useGlobalState((state) => state.projectStore.updateCurrentProject)
	const currentProjectSceneObjectData = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectData)

	const [hovered, setHovered] = useState(false)
	useCursor(hovered)

	const mesh = useRef()

	const allShapes = {
		box: new THREE.BoxGeometry(0.5, 0.5, 0.5),
		sphere: new THREE.SphereGeometry(0.5),
		cone: new THREE.ConeGeometry(0.5, 0.8),
		cylinder: new THREE.CylinderGeometry(0.5, 0.5, 0.8),
		octahedron: new THREE.OctahedronGeometry(0.5, 1),
		icosahedron: new THREE.IcosahedronGeometry(0.5, 1),
	}

	const allColors = {
		box: 'red',
		sphere: 'pink',
		cone: 'green',
		cylinder: 'yellow',
		octahedron: 'orange',
		icosahedron: 'blue',
	}

	useEffect(() => {
		if (!mesh.current) return
		if (selected?.name === name) {
			return
		}

		let box3 = new THREE.Box3().setFromObject(mesh.current)
		let size = new THREE.Vector3()

		// add "size" attribute to Object3D so the height can be factored into placement on ground by raycaster
		mesh.current.size = box3.getSize(size)

		// Adjust shape origin because model origins are offset in raycaster and its easier to alter the shapes then fix all the origins of the models in blender
		mesh.current.children[0].translateY(size.y / 2)

		if (rebuilt) {
			matrix.decompose(mesh.current.position, mesh.current.quaternion, mesh.current.scale)
		} else {
			setSelected(mesh.current)

			const newObj = {
				name: name,
				matrix: mesh.current.matrix.elements,
				storedShape: shape,
				type: 'shape',
			}

			updateCurrentProject({ sceneObjectData: [...currentProjectSceneObjectData, newObj] })
		}

		// eslint-disable-next-line
	}, [])

	return (
		// Disable visibility initially and set to true in Raycasting.js once mouse position is converted to 3D space
		<group
			ref={mesh}
			name={name}
			userData={{ moveableObj: true }}
			onClick={(e) => {
				e.stopPropagation()
				setTransformSelected(mesh.current)
			}}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			visible={rebuilt ? true : false}>
			<group name='center-offset'>
				<mesh castShadow receiveShadow>
					<primitive object={allShapes[shape]} />
					<meshLambertMaterial color={allColors[shape]} />
				</mesh>
			</group>
		</group>
	)
}
