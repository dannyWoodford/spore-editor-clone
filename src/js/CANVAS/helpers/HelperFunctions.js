// import { useCallback } from 'react'
// import { useThree } from '@react-three/fiber'
// import { useGlobalState } from './../../GlobalState'

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

// export function useUpdateProjectThumbnail() {
// 	const { gl, scene, camera } = useThree()
// 	const updateCurrentProject = useGlobalState((state) => state.projectStore.updateCurrentProject)

// 	const updateThumbnail = useCallback(() => {
// 		gl.render(scene, camera)
// 		const screenshot = gl.domElement.toDataURL('image/jpeg', 0.1)

// 		updateCurrentProject({ thumbnail: screenshot })

// 	}, [camera, gl, scene, updateCurrentProject])

// 	return { updateThumbnail }
// }
