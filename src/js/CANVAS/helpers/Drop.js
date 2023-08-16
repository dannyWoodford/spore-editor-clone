import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useAtom } from 'jotai'
import { selectedAtom, prevSelectedAtom, sceneObjectsAtom, initialDragCreateAtom } from './../../GlobalState'

export default function Drop() {
		const [selected, setSelected] = useAtom(selectedAtom)
		const [prevSelected, setPrevSelected] = useAtom(prevSelectedAtom)
		const [sceneObjects, setSceneObjects] = useAtom(sceneObjectsAtom)

		const [initialDragCreate, setInitialDragCreate] = useAtom(initialDragCreateAtom)

	const { gl } = useThree()

	gl.domElement.addEventListener('dragenter', (e) => {
		e.preventDefault()
		setInitialDragCreate(true)
		console.log('sceneObjects', sceneObjects)

		setSceneObjects([...sceneObjects, e.dataTransfer.types[0]])
	})

	gl.domElement.addEventListener('dragover', (e) => {
		e.preventDefault()
	})

	useEffect(() => {
		const updatePrevState = () => {
			setInitialDragCreate(false)
			setPrevSelected(selected?.name)
			console.log('updatePrevState', selected?.name)
		}

		window.addEventListener('drop', updatePrevState)

		return () => {
			window.removeEventListener('drop', updatePrevState)
		}
	}, [selected, setPrevSelected, setInitialDragCreate])

	return <></>
}
