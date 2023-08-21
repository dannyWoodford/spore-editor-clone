import React, { Suspense, useState, useMemo, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Bvh } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { globalState } from './../GlobalState'

import Loading from './setup/Loading'
import Controls from './setup/Controls'
import Background from './setup/Background'
import Lighting from './setup/Lighting'
import Drop from './helpers/Drop'
import Ground from './objects/Ground'
import Shape from './objects/Shape'
import Model from './objects/Model'
import Raycasting from './setup/Raycasting'
import { PivotControls } from './objects/pivotControls/index'

export default function Scene() {
	const { invalidate } = useThree()
	const snap = useSnapshot(globalState)

	const [selected, setSelected] = useState('')
	const [transformSelected, setTransformSelected] = useState('')
	const [prevSelected, setPrevSelected] = useState('')
	const [sceneObjects, setSceneObjects] = useState([])
	const [initialDragCreate, setInitialDragCreate] = useState(false)

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
				if (obj.type === 'model') {
					return (
						<Model
							key={i}
							name={obj.name + '-' + i}
							path={obj.path}
							setSelectedHandler={setSelectedHandler}
							setTransformSelectedHandler={setTransformSelectedHandler}
							selected={selected}
						/>
					)
				} else if (obj.type === 'shape') {
					return (
						<Shape
							shape={obj.name}
							key={i}
							name={obj.name + '-' + i}
							setSelectedHandler={setSelectedHandler}
							setTransformSelectedHandler={setTransformSelectedHandler}
							selected={selected}
						/>
					)
				} else {
					return null
				}
			} else {
				return null
			}
		})

		// eslint-disable-next-line
	}, [sceneObjects])

	useEffect(() => {
		let levaControls = document.querySelector('#leva__root')
		levaControls.style.display = 'none'

		if (snap.intro.initialPrompt) {
			levaControls.style.display = 'block'
		} else {
			levaControls.style.display = 'none'
		}
	}, [snap.intro.initialPrompt])

	return (
		<>
			<Controls />

			<Suspense fallback={<Loading />}>
				<Lighting />

				<Bvh firstHitOnly>
					<Background />
					<Ground>{addSceneObjects}</Ground>
				</Bvh>

				<Drop
					selected={selected}
					setPrevSelected={setPrevSelected}
					sceneObjects={sceneObjects}
					setSceneObjects={setSceneObjects}
					setInitialDragCreate={setInitialDragCreate}
				/>
				<Raycasting selected={selected} prevSelected={prevSelected} initialDragCreate={initialDragCreate} />
				<PivotControls
					object={typeof transformSelected === 'object' ? transformSelected : undefined}
					visible={typeof transformSelected === 'object'}
					depthTest={false}
					lineWidth={2}
					scale={1.5}
					anchor={typeof transformSelected === 'object' ? [0, -transformSelected.size.y / 2, 0] : [0, 0, 0]}
					// anchor={typeof transformSelected === 'object' ? [-transformSelected.size.x / 2, -transformSelected.size.y / 2, -transformSelected.size.z / 2] : [0, 0, 0]}
				/>
			</Suspense>
		</>
	)
}
