import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useGlobalState } from './../../GlobalState'

export default function Drop() {
	const selected = useGlobalState((state) => state.selected)
	const setPrevSelected = useGlobalState((state) => state.setPrevSelected)
	const sceneObjects = useGlobalState((state) => state.sceneObjects)
	const setSceneObjects = useGlobalState((state) => state.setSceneObjects)
	const setInitialDragCreate = useGlobalState((state) => state.setInitialDragCreate)

	const { gl } = useThree()

	gl.domElement.addEventListener('dragenter', (e) => {
		e.preventDefault()
		setInitialDragCreate(true)

		// if (JSON.stringify(sceneObjects) === JSON.stringify([...sceneObjects, e.dataTransfer.types[0]])) return
		
		console.log('sceneObjects', sceneObjects)
		console.log('new', [...sceneObjects, e.dataTransfer.types[0]])
		console.log('equal', JSON.stringify(sceneObjects) === JSON.stringify([...sceneObjects, e.dataTransfer.types[0]]))

		setSceneObjects([...sceneObjects, e.dataTransfer.types[0]])
	})

	gl.domElement.addEventListener('dragover', (e) => {
		e.preventDefault()
	})

	useEffect(() => {
		const updatePrevState = () => {
			setInitialDragCreate(false)
			setPrevSelected(selected?.name)
		}

		window.addEventListener('drop', updatePrevState)

		return () => {
			window.removeEventListener('drop', updatePrevState)
		}
	}, [selected, setPrevSelected, setInitialDragCreate])

	return <></>
}
