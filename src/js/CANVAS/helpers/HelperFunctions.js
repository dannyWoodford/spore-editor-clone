import { useCallback } from 'react'
import { useGlobalState } from './../../GlobalState'

export function updateObjectInArray(array, objectToUpdate) {
	const updatedArray = array.map((obj) => {
		if (obj.name === objectToUpdate.name) {
			// Clone the object to avoid modifying the original object.
			return { ...objectToUpdate }
		}
		return obj
	})

	return updatedArray
}

export function useSaveTransformData(objToUpdate) {
	const updateCurrentProject = useGlobalState((state) => state.projectStore.updateCurrentProject)
	const currentProjectSceneObjectData = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectData)

	const saveTransformData = useCallback(() => {
		if (!objToUpdate) return

		const getObject = currentProjectSceneObjectData.find((obj) => obj.name === objToUpdate.name)

		if (!getObject) {
			console.log('%cNO getObject', 'color:red;font-size:18px;', getObject, objToUpdate.name)
			return
		}

		getObject.matrix = objToUpdate.matrix.elements

		const updatedData = updateObjectInArray(currentProjectSceneObjectData, getObject)

		updateCurrentProject({ sceneObjectData: updatedData })
	}, [currentProjectSceneObjectData, updateCurrentProject, objToUpdate])

	return { saveTransformData }
}
