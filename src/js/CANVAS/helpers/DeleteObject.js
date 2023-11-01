import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useGlobalState } from './../../GlobalState'

export default function DeleteObject() {
	const { scene } = useThree()

	const deleteObjectName = useGlobalState((state) => state.sceneNoPersist.deleteObjectName)
	const setDeleteObjectName = useGlobalState((state) => state.sceneNoPersist.setDeleteObjectName)
	const setTransformSelected = useGlobalState((state) => state.sceneNoPersist.setTransformSelected)

	useEffect(() => {
		if (deleteObjectName !== '') {
			let selectedObject = scene.getObjectByName(deleteObjectName)
			selectedObject.removeFromParent()

			setDeleteObjectName('')
			setTransformSelected('')
		}
	}, [deleteObjectName, scene, setDeleteObjectName, setTransformSelected])

	return null
}
