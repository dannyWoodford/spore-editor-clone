import React from 'react'
import { useControls } from 'leva'

import { useGlobalState } from './../../../GlobalState'
import { PivotControls as ObjectTransformer } from './index'
import { useSaveTransformData } from '../../helpers/HelperFunctions'

export default function PivotControls() {
	const transformSelected = useGlobalState((state) => state.sceneNoPersist.transformSelected)
	const snapDistance = useGlobalState((state) => state.intro.snapDistance)
	const snapAngle = useGlobalState((state) => state.intro.snapAngle)
	const snapping = useGlobalState((state) => state.intro.snapping)
	const setSnapping = useGlobalState((state) => state.intro.setSnapping)

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

	const { saveTransformData } = useSaveTransformData(transformSelected)

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
			onDragEnd={() => saveTransformData()}
		/>
	)
}
