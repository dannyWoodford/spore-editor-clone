import React, { Suspense, useState, useMemo } from 'react'

import Loading from './setup/Loading'
import Controls from './setup/Controls'
import Background from './setup/Background'
import Drop from './helpers/Drop'
import Ground from './objects/Ground'
import Shape from './objects/Shape'
import Raycasting from './setup/Raycasting'

export default function Scene() {
	const [selected, setSelected] = useState('')
	const [prevSelected, setPrevSelected] = useState('')
	const [sceneObjects, setSceneObjects] = useState([])

	// useEffect(() => {
	// 	if (!selected) return;

	// 	console.log('selected', selected.name)
	// }, [selected])

	// useEffect(() => {
	// 	console.log('%csceneObjects', 'color:green;font-size:14px;', sceneObjects)
	// }, [sceneObjects])

	// useEffect(() => {
	// 	// if (!prevSelected) return

	// 	console.log('%cprevSelected', 'color:green;font-size:14px;', prevSelected)
	// }, [prevSelected])

	const addSceneObjects = useMemo(() => {
		if (!sceneObjects.length) return

		// console.log('%caddSceneObjects', 'color:green;font-size:14px;', sceneObjects)

		return sceneObjects.map((obj, i) => {
			if (obj) {
				return <Shape shape={obj} key={i} name={obj + '-' + i} setSelected={setSelected} selected={selected} />
			} else {
				return null
			}
		})
	}, [sceneObjects])

	return (
		<>
			<Controls />
			<Suspense fallback={<Loading />}>
				<Drop selected={selected} setPrevSelected={setPrevSelected} prevSelected={prevSelected} sceneObjects={sceneObjects} setSceneObjects={setSceneObjects} />
				<Background />
				<Ground>{addSceneObjects}</Ground>
				<Raycasting selected={selected} prevSelected={prevSelected} />
			</Suspense>
		</>
	)
}