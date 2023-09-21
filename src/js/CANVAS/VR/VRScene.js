import React, { useEffect, useMemo } from 'react'
import { Controllers, Hands } from '@react-three/xr'
import * as THREE from 'three'

import { useGlobalState } from '../../GlobalState'

import Ground from '../objects/Ground'
import Interactives from './objects/Interactives'
import HUD from './hud/HUD'
import Model from './objects/Model'
import MovementController from './controls/MovementController'
import TeleportTravel from './controls/TeleportTravel'

export default function VRScene() {
	const sceneObjects = useGlobalState((state) => state.sceneObjects)

	useEffect(() => {
		if (sceneObjects) {
			// console.log('VR sceneObjects', sceneObjects)
		}
	}, [sceneObjects])

	const addSceneObjects = useMemo(() => {
		if (!sceneObjects.length) return

		return sceneObjects.map((obj, i) => {
			if (obj) {
				if (obj.type === 'model') {
					return <Model key={i} name={obj.name + '-' + i} path={obj.path} />
				}
				// else if (obj.type === 'shape') {
				// 	return (
				// 		<Shape
				// 			shape={obj.name}
				// 			key={i}
				// 			name={obj.name + '-' + i}
				// 			setSelectedHandler={setSelectedHandler}
				// 			setTransformSelectedHandler={setTransformSelectedHandler}
				// 			selected={selected}
				// 		/>
				// 	)
				// }
				else {
					return null
				}
			} else {
				return null
			}
		})

		// eslint-disable-next-line
	}, [sceneObjects])

	return (
		<group name='vr-scene'>
			<Controllers />
			<Hands />

			<MovementController />
			<MovementController hand='left' applyRotation={false} applyHorizontal={true} />
			<HUD />

			<Ground>{addSceneObjects}</Ground>

			{/* <TeleportTravel useNormal={true}>
				<Ground>{addSceneObjects}</Ground>
			</TeleportTravel> */}

			{/* <Interactives /> */}
		</group>
	)
}
