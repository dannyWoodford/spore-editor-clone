import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useXR, Controllers, Hands } from '@react-three/xr'
import { Bvh, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import { useGlobalState } from '../../GlobalState'

import Loading from '../setup/Loading'
import Ground from '../objects/Ground'
// import Interactives from './objects/Interactives'
import HUD from './hud/HUD'
import Model from './objects/Model'
import MovementController from './controls/MovementController'
import OrbitController from './controls/OrbitController'
import Raycasting from './utils/Raycasting'
// import TeleportTravel from './controls/TeleportTravel'

export default function VRScene() {
	const contentBrowserItems = useGlobalState((state) => state.contentBrowserItems)
	const isSetup = useGlobalState((state) => state.vr.isSetup)
	const setIsSetup = useGlobalState((state) => state.vr.setIsSetup)

	const addContentBrowserItems = useMemo(() => {
		if (!contentBrowserItems.length) return

		return contentBrowserItems.map((obj, i) => {
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
	}, [contentBrowserItems])




	const text = useRef()
	const [textColor, setTextColor] = useState('red')

	const { player } = useXR()

	useEffect(() => {
		if (player && !isSetup) {
			player.position.set(40, 15, 0)
			player.rotation.y = 1.6

			setIsSetup(true)
		}
	})

	useFrame(() => {
		if (!text.current) return

		if (player) {
			text.current.lookAt(player.position)
		}

		if (textColor === 'red') {
			setTextColor('green')
		} 
	})

	return (
		<group name='vr-scene'>
			<Controllers />
			<Hands />

			<Suspense fallback={<Loading />}>
				<MovementController />
				<MovementController hand='left' applyRotation={false} applyHorizontal={true} />
				<OrbitController />

				<HUD />

				<Bvh firstHitOnly>
					<Ground>{addContentBrowserItems}</Ground>
				</Bvh>

				{/* <TeleportTravel useNormal={true}>
				<Ground>{addContentBrowserItems}</Ground>
			</TeleportTravel> */}

				{/* <Interactives /> */}
				<Raycasting />

				<Text ref={text} position={[0, 2.5, 0]} fontSize={1.1} color={textColor} anchorX='center' anchorY='middle'>
					VR SCENE:
				</Text>
			</Suspense>
		</group>
	)
}
