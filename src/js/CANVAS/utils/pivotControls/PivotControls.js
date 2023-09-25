import React from 'react'
import { useGlobalState } from './../../../GlobalState'

import { PivotControls as ObjectTransformer } from './index'

export default function PivotControls() {
	const transformSelected = useGlobalState((state) => state.transformSelected)

	return (
		<ObjectTransformer
			object={transformSelected ? transformSelected : undefined}
			visible={transformSelected}
			depthTest={false}
			lineWidth={2}
			scale={1.5}
			anchor={transformSelected ? [0, -transformSelected.size.y / 2, 0] : [0, 0, 0]}
			// anchor={transformSelected ? [-transformSelected.size.x / 2, -transformSelected.size.y / 2, -transformSelected.size.z / 2] : [0, 0, 0]}
		/>
	)
}
