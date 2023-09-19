import React, { useEffect, Suspense, useMemo } from 'react'
import { Controllers, Hands, useXR, TeleportationPlane } from '@react-three/xr'
import { Physics } from '@react-three/cannon'
import { useGlobalState } from '../../GlobalState'

import Loading from '../setup/Loading'
import Lighting from '../setup/Lighting'
import Background from '../setup/Background'
import Ground from './objects/Ground'
import Interactives from './objects/Interactives'
import HUD from './objects/HUD'
import Model from './objects/Model'

export default function VRScene() {
	const sceneObjects = useGlobalState((state) => state.sceneObjects)

	// const player = useXR((state) => state)

	// useEffect(() => {
	// 	if (player) {
	// 		console.log('player', player)
	// 	}
	// }, [player])

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
					return (
						<Model
							key={i}
							name={obj.name + '-' + i}
							path={obj.path}
						/>
					)
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
		<>
			<Physics
				iterations={20}
				tolerance={0.0001}
				defaultContactMaterial={{
					friction: 0.9,
					restitution: 0.7,
					contactEquationStiffness: 1e7,
					contactEquationRelaxation: 1,
					frictionEquationStiffness: 1e7,
					frictionEquationRelaxation: 2,
				}}
				gravity={[0, -4, 0]}
				allowSleep={false}
				// Adjust to the headset refresh rate
				step={1 / 90}>
				<Controllers />
				<Hands />

				<Suspense fallback={<Loading />}>
					<Lighting />

					<Background />
					<Ground>{addSceneObjects}</Ground>
					{/* <Interactives /> */}
					<HUD />
				</Suspense>

				<TeleportationPlane
					/** Whether to allow teleportation from left controller. Default is `false` */
					leftHand={true}
					/** Whether to allow teleportation from right controller. Default is `false` */
					rightHand={false}
					/** The maximum distance from the camera to the teleportation point. Default is `10` */
					maxDistance={30}
					/** The radial size of the teleportation marker. Default is `0.25` */
					size={0.25}
				/>
			</Physics>
		</>
	)
}