import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useGlobalState } from '../../GlobalState'

export default function Drop() {
	const contentBrowserItems = useGlobalState((state) => state.sceneNoPersist.contentBrowserItems)
	const setContentBrowserItems = useGlobalState((state) => state.sceneNoPersist.setContentBrowserItems)
	const selected = useGlobalState((state) => state.sceneNoPersist.selected)
	const setPrevSelectedName = useGlobalState((state) => state.sceneNoPersist.setPrevSelectedName)
	const setIsTransforming = useGlobalState((state) => state.sceneNoPersist.transforms.setIsTransforming)
	const setTransformSelected = useGlobalState((state) => state.sceneNoPersist.setTransformSelected)

	const { gl } = useThree()

	const createNewObject = (arr) => {
		let newObj = {
			// name: '',
			// type: '',
			// path: '',
			// modeltype: '',
		}

		arr.forEach((str) => {
			if (str.startsWith('name=')) {
				newObj['name'] = str.substring(5)
			} else if (str.startsWith('type=')) {
				newObj['type'] = str.substring(5)
			} else if (str.startsWith('path=')) {
				newObj['path'] = str.substring(5)
			} else if (str.startsWith('modeltype=')) {
				newObj['modeltype'] = str.substring(10)
			}
		})

		return newObj
	}

	gl.domElement.addEventListener('dragenter', (e) => {
		e.preventDefault()
		setIsTransforming(true)

		let objData = createNewObject(e.dataTransfer.types)

		setContentBrowserItems([...contentBrowserItems, objData])
	})

	gl.domElement.addEventListener('dragover', (e) => {
		e.preventDefault()
	})

	useEffect(() => {
		const updatePrevState = () => {
			setIsTransforming(false)
			setPrevSelectedName(selected?.name)
			setTransformSelected(selected)
		}

		window.addEventListener('drop', updatePrevState)

		return () => {
			window.removeEventListener('drop', updatePrevState)
		}
	}, [selected, setPrevSelectedName, setIsTransforming, setTransformSelected])

	return <></>
}
