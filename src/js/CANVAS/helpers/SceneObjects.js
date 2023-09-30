import { useEffect } from 'react'

import { useGlobalState } from '../../GlobalState'

export default function SceneObjects() {
	const sceneObjects = useGlobalState((state) => state.sceneObjects)
	const selected = useGlobalState((state) => state.selected)
	const transformSelected = useGlobalState((state) => state.transformSelected)

	useEffect(() => {
		console.log('selected', selected.name)
	}, [selected])

	useEffect(() => {
		console.log('transformSelected', transformSelected)
	}, [transformSelected])

	useEffect(() => {
		if (!sceneObjects.length) return
		console.log('sceneObjects', sceneObjects)
	}, [sceneObjects])

	return
}
