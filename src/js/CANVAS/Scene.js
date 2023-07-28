import React, { Suspense, useState, useMemo, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { TransformControls, Bvh } from '@react-three/drei'
import { useControls } from 'leva'

import Loading from './setup/Loading'
import Controls from './setup/Controls'
import Background from './setup/Background'
import Drop from './helpers/Drop'
import Ground from './objects/Ground'
import Shape from './objects/Shape'
import Raycasting from './setup/Raycasting'

export default function Scene() {
	const [selected, setSelected] = useState('')
	const [transformSelected, setTransformSelected] = useState('')
	const [prevSelected, setPrevSelected] = useState('')
	const [sceneObjects, setSceneObjects] = useState([])

	const { invalidate } = useThree()

	const setSelectedHandler = (mesh) => {
		setSelected(mesh)

		invalidate()
	}

	const setTransformSelectedHandler = (mesh) => {
		setTransformSelected(mesh)

		invalidate()
	}

	const addSceneObjects = useMemo(() => {
		if (!sceneObjects.length) return

		// console.log('sceneObjects', sceneObjects)

		return sceneObjects.map((obj, i) => {
			if (obj) {
				return (
					<Shape
						shape={obj}
						key={i}
						name={obj + '-' + i}
						setSelectedHandler={setSelectedHandler}
						setTransformSelectedHandler={setTransformSelectedHandler}
						selected={selected}
					/>
				)
			} else {
				return null
			}
		})
	}, [sceneObjects])

	const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })

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

				<Drop selected={selected} setPrevSelected={setPrevSelected} sceneObjects={sceneObjects} setSceneObjects={setSceneObjects} />
				<Raycasting selected={selected} prevSelected={prevSelected} />
				{transformSelected && <TransformControls object={transformSelected} mode={mode} />}
			</Suspense>
		</>
	)
}
