import React from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { RayGrab } from '@react-three/xr'
import ThreeMeshUI from 'three-mesh-ui'

import Model from '../Model'

extend(ThreeMeshUI)

export default function Panel() {
	const container = new ThreeMeshUI.Block({
		ref: 'container',
		// width: 0.7,
		padding: 0.02,
		fontFamily: `${process.env.PUBLIC_URL}/vr_fonts/Roboto-msdf.json`,
		fontTexture: `${process.env.PUBLIC_URL}/vr_fonts/Roboto-msdf.png`,
		fontColor: new THREE.Color(0xffffff),
		backgroundOpacity: 0.4,
		backgroundColor: new THREE.Color('#5E5C6C'),
		borderRadius: 0.02,
	})

	const contentContainer = new ThreeMeshUI.Block({
		contentDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0.002,
		margin: 0.0,
		backgroundOpacity: 0.7,
		backgroundColor: new THREE.Color('#5E5C6C'),
		borderRadius: 0.02,
	})

	container.add(contentContainer)
	//

	const topSubBlock = new ThreeMeshUI.Block({
		// height: 0.5,
		// width: 0.5,
		padding: 0.005,
		margin: 0.0,
		contentDirection: 'column',
		justifyContent: 'center',
		// alignItems: 'start',
		backgroundOpacity: 0,
		borderRadius: 0.0,
		// backgroundColor: new THREE.Color('red'),
	})

	const topSubBlockRow1 = new ThreeMeshUI.Block({
		// height: 0.5,
		// width: 0.5,
		padding: 0.0,
		margin: 0.0,
		contentDirection: 'row',
		// justifyContent: 'start',
		// alignItems: 'start',
		borderRadius: 0.0,
		// backgroundColor: new THREE.Color('green'),
		backgroundOpacity: 0,
	})

	const topSubBlockRow2 = new ThreeMeshUI.Block({
		// height: 0.5,
		// width: 0.5,
		padding: 0.0,
		margin: 0.0,
		contentDirection: 'row',
		// justifyContent: 'start',
		// alignItems: 'start',
		borderRadius: 0.0,
		// backgroundColor: new THREE.Color('blue'),
		backgroundOpacity: 0,
	})

	topSubBlock.add(topSubBlockRow1, topSubBlockRow2)

	const allShapes = {
		box: new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), new THREE.MeshLambertMaterial({ color: 0x3de364 })),
		sphere: new THREE.Mesh(new THREE.SphereGeometry(0.05), new THREE.MeshLambertMaterial({ color: 0x3de364 })),
		cone: new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.08), new THREE.MeshLambertMaterial({ color: 0x3de364 })),
		cylinder: new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.08), new THREE.MeshLambertMaterial({ color: 0x3de364 })),
		octahedron: new THREE.Mesh(new THREE.OctahedronGeometry(0.05, 1), new THREE.MeshLambertMaterial({ color: 0x3de364 })),
		icosahedron: new THREE.Mesh(new THREE.IcosahedronGeometry(0.05, 1), new THREE.MeshLambertMaterial({ color: 0x3de364 })),
	}

	Object.entries(allShapes).forEach((obj, index) => {

		// console.log('obj[1]', obj[1])
		// console.log('Model', <Model path={'/content-browser/models/Castle_Wall_01.glb'} />)

		const item = new ThreeMeshUI.Block({
			height: 0.15,
			width: 0.15,
			margin: 0.005,
			// padding: 0.002,
			fontSize: 0.02,
			contentDirection: 'column-reverse',
			backgroundColor: new THREE.Color('#094074'),
			backgroundOpacity: 0.6,
			borderRadius: 0.01,
		})
			// .add(<Model path={'/content-browser/models/Castle_Wall_01.glb'} />)
			.add(obj[1])
			.add(
				new ThreeMeshUI.Text({
					content: `${obj[0]}`,
				})
			)

		if (index < 3) {
			topSubBlockRow1.add(item)
		} else {
			topSubBlockRow2.add(item)
		}
	})

	//

	const bottomSubBlock = new ThreeMeshUI.Block({
		contentDirection: 'row',
		justifyContent: 'space-between',
		// alignItems: 'start',
		margin: 0.02,
		padding: 0.0,
		width: 0.5,
		// height: 0.2,
		backgroundOpacity: 0,
		backgroundColor: new THREE.Color('green'),
		borderRadius: 0.01,
	})

	const subSubBlock1 = new ThreeMeshUI.Block({
		width: 0.24,
		height: 0.05,
		margin: 0.0,
		padding: 0.0,
		fontSize: 0.03,
		backgroundOpacity: 1,
		backgroundColor: new THREE.Color('blue'),
	}).add(
		new ThreeMeshUI.Text({
			content: 'Models',
		})
	)

	const subSubBlock2 = new ThreeMeshUI.Block({
		width: 0.24,
		height: 0.05,
		margin: 0.0,
		padding: 0.0,
		fontSize: 0.03,
		backgroundOpacity: 1,
		backgroundColor: new THREE.Color('red'),
	}).add(
		new ThreeMeshUI.Text({
			content: 'Shapes',
		})
	)

	bottomSubBlock.add(subSubBlock1, subSubBlock2)

	//

	contentContainer.add(topSubBlock, bottomSubBlock)

	//

	// new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/textures/FS002_Night.png', (texture) => {
	// 	topSubBlock.set({
	// 		backgroundTexture: texture,
	// 	})
	// })

	useFrame(() => {
		ThreeMeshUI.update()
	})

	return <primitive object={container} />
}
