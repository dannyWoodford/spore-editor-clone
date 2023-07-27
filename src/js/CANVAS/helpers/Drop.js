import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function Drop({ sceneObjects, setSceneObjects, selected, setPrevSelected, setIsDragging }) {
	const { gl } = useThree()

	gl.domElement.addEventListener('dragenter', (e) => {
		e.preventDefault()
		// console.log('dragenter')

		setSceneObjects([...sceneObjects, e.dataTransfer.types[0]])
	})

	gl.domElement.addEventListener('dragover', (e) => {
		e.preventDefault()
		// console.log('dragenter')
	})

	useEffect(() => {
		const updatePrevState = () => {
			// console.log('setPrevSelected', selected?.name)
			console.log('drag')
			setPrevSelected(selected?.name)
			setIsDragging(false)
		}

			window.addEventListener('drop', updatePrevState)

		return () => {
			window.removeEventListener('drop', updatePrevState)
		}
	}, [selected, setPrevSelected])

	// useEffect(() => {
	// 	const updatePrevState = () => {
	// 		// console.log('setPrevSelected', selected?.name)
	// 		console.log('pointerup')
	// 		setPrevSelected(selected?.name)
	// 		setIsDragging(false)
	// 	}

	// 	document.addEventListener('pointerup', updatePrevState)

	// 	return () => {
	// 		document.removeEventListener('pointerup', updatePrevState)
	// 	}
	// }, [selected, setPrevSelected])

	useEffect(() => {
		const updateDragging = () => {
			console.log('pointerdown')
			setIsDragging(true)
		}

		window.addEventListener('pointerdown', updateDragging)

		return () => {
			window.removeEventListener('pointerdown', updateDragging)
		}
	}, [setIsDragging])

	return <></>
}
