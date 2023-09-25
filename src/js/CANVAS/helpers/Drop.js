import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useGlobalState } from '../../GlobalState'

export default function Drop() {
	const sceneObjects = useGlobalState((state) => state.sceneObjects)
	const setSceneObjects = useGlobalState((state) => state.setSceneObjects)
	const selected = useGlobalState((state) => state.selected)
	const setPrevSelectedName = useGlobalState((state) => state.setPrevSelectedName)
	const setInitialDragCreate = useGlobalState((state) => state.setInitialDragCreate)

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
			setPrevSelectedName(selected?.name)
		}

		window.addEventListener('drop', updatePrevState)

		return () => {
			window.removeEventListener('drop', updatePrevState)
		}
	}, [selected, setPrevSelectedName, setInitialDragCreate])

	return <></>
}
