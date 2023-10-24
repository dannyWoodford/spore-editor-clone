import React from 'react'
import { useControls } from 'leva'

import { useGlobalState } from './../../../GlobalState'
import { PivotControls as ObjectTransformer } from './index'
import { updateObjectInArray } from '../../helpers/HelperFunctions'

export default function PivotControls() {
	const transformSelected = useGlobalState((state) => state.sceneNoPersist.transformSelected)
	const snapDistance = useGlobalState((state) => state.intro.snapDistance)
	const snapAngle = useGlobalState((state) => state.intro.snapAngle)
	const snapping = useGlobalState((state) => state.intro.snapping)
	const setSnapping = useGlobalState((state) => state.intro.setSnapping)

	// update sceneObjects on currentProject
	const currentProjectSceneObjectData = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectData)
	const updateCurrentProject = useGlobalState((state) => state.projectStore.updateCurrentProject)

	useControls(
		'Position Snapping',
		() => ({
			enabled: {
				value: snapping,
				onChange: (c) => {
					setSnapping(c)
				},
			},
		}),
		[setSnapping]
	)

	const saveTransformData = () => {
		const getObject = currentProjectSceneObjectData.find((obj) => obj.name === transformSelected.name)

		getObject.matrix = transformSelected.matrix.elements

		const updatedData = updateObjectInArray(currentProjectSceneObjectData, getObject)

		updateCurrentProject({ sceneObjectData: updatedData })
	}

	return (
		<ObjectTransformer
			object={transformSelected ? transformSelected : undefined}
			visible={transformSelected}
			depthTest={false}
			lineWidth={2}
			scale={1.5}
			translationSnap={snapping ? snapDistance : null}
			rotationSnap={snapping ? snapAngle : null}
			/** Anchor point, like BBAnchor, each axis can be between -1/0/+1 */
			anchor={[-1, -1, -1]}
			onDragEnd={saveTransformData}
		/>
	)
}
