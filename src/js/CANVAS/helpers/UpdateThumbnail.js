import { useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import { useGlobalState } from './../../GlobalState'

export default function UpdateThumbnail() {
	const { gl, scene, camera } = useThree()

	const editorStart = useGlobalState((state) => state.projectNoPersist.editorStart)
	const updateCurrentProject = useGlobalState((state) => state.projectStore.updateCurrentProject)
	const currentProjectSceneObjectData = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectData)

	const updateThumbnail = useCallback(() => {
		gl.render(scene, camera)
		const screenshot = gl.domElement.toDataURL('image/jpeg', 0.1)

		updateCurrentProject({ thumbnail: screenshot })
	}, [camera, gl, scene, updateCurrentProject])

	useEffect(() => {
		if (currentProjectSceneObjectData?.length || editorStart) {
			// Update Project thumbnail when currentProjectSceneObjectData changes
			updateThumbnail()
		}
	}, [editorStart, currentProjectSceneObjectData, updateThumbnail])

	return null
}
