import React, { Suspense, useState, useMemo, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { TransformControls, Bvh } from '@react-three/drei'
import { useControls } from 'leva'

import { useAtom } from 'jotai'
import { parcelTotalAtom } from './../GlobalState'

import Loading from './setup/Loading'
import Controls from './setup/Controls'
import Background from './setup/Background'
import Drop from './helpers/Drop'
import Ground from './objects/Ground'
import Shape from './objects/Shape'
import Raycasting from './setup/Raycasting'

export default function Scene({ parcelTotal }) {
	const [selected, setSelected] = useState('')
	const [transformSelected, setTransformSelected] = useState('')
	const [prevSelected, setPrevSelected] = useState('')
	const [sceneObjects, setSceneObjects] = useState([])

	const [initialDragCreate, setInitialDragCreate] = useState(false)

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
					<Ground parcelTotal={parcelTotal}>{addSceneObjects}</Ground>
				</Bvh>

				<Drop
					selected={selected}
					setPrevSelected={setPrevSelected}
					sceneObjects={sceneObjects}
					setSceneObjects={setSceneObjects}
					setInitialDragCreate={setInitialDragCreate}
				/>
				<Raycasting selected={selected} prevSelected={prevSelected} initialDragCreate={initialDragCreate} />
				{transformSelected && <TransformControls object={transformSelected} mode={mode} />}
			</Suspense>
		</>
	)
}
