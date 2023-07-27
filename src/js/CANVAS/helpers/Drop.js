import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function Drop({ sceneObjects, setSceneObjects, selected, prevSelected, setPrevSelected }) {
	const { gl } = useThree()

	gl.domElement.addEventListener('dragenter', (e) => {
		console.log('dataTransfer', e.dataTransfer)
		console.log('prevSelected', prevSelected)
		console.log('e.dataTransfer.types[0]', e.dataTransfer.types[0])
		setSceneObjects([...sceneObjects, e.dataTransfer.types[0]])
	})

	useEffect(() => {
		const updatePrevState = () => {
			// console.log('pointerup PREVSELECTED', selected?.name)
			setPrevSelected(selected?.name)
		}

		window.addEventListener('pointerup', updatePrevState)

		return () => {
			window.removeEventListener('pointerup', updatePrevState)
		}
	}, [selected])

	return <></>
}
