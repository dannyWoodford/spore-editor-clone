import React, { Suspense, useState, useMemo, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { TransformControls, Bvh } from '@react-three/drei'
import { useControls } from 'leva'
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

export default function Scene() {
	const { invalidate } = useThree()
	const snap = useSnapshot(globalState)

	const [selected, setSelected] = useState('')
	const [transformSelected, setTransformSelected] = useState('')
	const [prevSelected, setPrevSelected] = useState('')
	const [sceneObjects, setSceneObjects] = useState([])
	const [initialDragCreate, setInitialDragCreate] = useState(false)

	// useEffect(() => {
	// 	console.log('%cselected', 'color:red;font-size:12px;', selected)
	// }, [selected])

	// useEffect(() => {
	// 	console.log('%ctransformSelected', 'color:red;font-size:12px;', typeof transformSelected)
	// }, [transformSelected])

	// useEffect(() => {
	// 	console.log('%cprevSelected', 'color:red;font-size:12px;', prevSelected)
	// }, [prevSelected])

	// useEffect(() => {
	// 	console.log('%cinitialDragCreate', 'color:red;font-size:12px;', initialDragCreate)
	// }, [initialDragCreate])

	// useEffect(() => {
	// 	console.log('%csceneObjects', 'color:red;font-size:12px;', sceneObjects)
	// }, [sceneObjects])

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

	const { mode } = useControls('Transforms', {
		mode: {
			value: 'translate',
			options: ['translate', 'rotate'],
		},
	})

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
				<Background />

				<Bvh firstHitOnly>
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
				{typeof transformSelected === 'object' && <TransformControls object={transformSelected} mode={mode} />}
			</Suspense>
		</>
	)
}
