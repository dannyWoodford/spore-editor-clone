import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function Drop({ sceneObjects, setSceneObjects, selected, setPrevSelected }) {
	const { gl } = useThree()

	gl.domElement.addEventListener('dragenter', (e) => {
		e.preventDefault()

		setSceneObjects([...sceneObjects, e.dataTransfer.types[0]])
	})

	gl.domElement.addEventListener('dragover', (e) => {
		e.preventDefault()
		// console.log('dragenter')
	})

	useEffect(() => {
		const updatePrevState = () => {
			// console.log('setPrevSelected', selected?.name)
			// console.log('drag')
			setPrevSelected(selected?.name)
		}

			window.addEventListener('drop', updatePrevState)

		return () => {
			window.removeEventListener('drop', updatePrevState)
		}
	}, [selected, setPrevSelected])

	return <></>
}
