import React, { Suspense, useMemo, useEffect } from 'react'
import { TransformControls, Bvh } from '@react-three/drei'
import { useControls } from 'leva'

import { useAtom } from 'jotai'
import { transformSelectedAtom, sceneObjectsAtom } from './../GlobalState'

import Loading from './setup/Loading'
import Controls from './setup/Controls'
import Background from './setup/Background'
import Drop from './helpers/Drop'
import Ground from './objects/Ground'
import Shape from './objects/Shape'
import Raycasting from './setup/Raycasting'

export default function Scene() {
	const [transformSelected, setTransformSelected] = useAtom(transformSelectedAtom)
	const [sceneObjects, setSceneObjects] = useAtom(sceneObjectsAtom)


	const addSceneObjects = useMemo(() => {
		if (!sceneObjects.length) return

		return sceneObjects.map((obj, i) => {
			if (obj) {
				return (
					<Shape
						shape={obj}
						key={i}
						name={obj + '-' + i}
					/>
				)
			} else {
				return null
			}
		})

		// eslint-disable-next-line
	}, [sceneObjects])

	const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate'] } })

	useEffect(() => {
		let levaControls = document.querySelector('#leva__root')
		levaControls.style.display = 'none'

		if (transformSelected) {
			levaControls.style.display = 'block'
		} else {
			levaControls.style.display = 'none'
		}
	}, [transformSelected])

	return (
		<>
			<Controls />

			<Suspense fallback={<Loading />}>
				<Bvh firstHitOnly>
					<Background />
					<Ground>{addSceneObjects}</Ground>
				</Bvh>

				<Drop />
				<Raycasting />
				{transformSelected && <TransformControls object={transformSelected} mode={mode} />}
			</Suspense>
		</>
	)
}
