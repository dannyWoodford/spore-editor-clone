import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function Drop({ sceneObjects, setSceneObjects, selected, setPrevSelected, setInitialDragCreate }) {
	const { gl } = useThree()

	const createNewObject = (arr) => {
		let newObj = {
			name: '',
			type: '',
			path: '',
		}

		arr.forEach((str) => {
			if (str.startsWith('name=')) {
				newObj['name'] = str.substring(5)
			} else if (str.startsWith('type=')) {
				newObj['type'] = str.substring(5)
			} else if (str.startsWith('path=')) {
				newObj['path'] = str.substring(5)
			}
		})

		return newObj
	}

	gl.domElement.addEventListener('dragenter', (e) => {
		e.preventDefault()
		setInitialDragCreate(true)

		let objData = createNewObject(e.dataTransfer.types)

		setSceneObjects([...sceneObjects, objData])
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
