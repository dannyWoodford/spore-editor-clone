import React from 'react'
import { Sphere, useTexture, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { useGlobalState } from './../../GlobalState'
import { useControls, folder } from 'leva'

export default function Background() {
	const maxDistance = useGlobalState((state) => state.intro.maxDistance)
	const vrEnabled = useGlobalState((state) => state.vr.enabled)
	const setTransformSelected = useGlobalState((state) => state.sceneNoPersist.setTransformSelected)

	const [nightSky] = useTexture([process.env.PUBLIC_URL + '/textures/FS002_Night.png'])

	const { gridSize, ...gridConfig } = useControls('Ground', {
		Grid: folder(
			{
				gridSize: [70, 70],
				cellSize: { value: 0.5, min: 0, max: 10, step: 0.1 },
				cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
				cellColor: '#6f6f6f',
				sectionSize: { value: 2.5, min: 0, max: 10, step: 0.1 },
				sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
				sectionColor: '#9d4b4b',
				fadeDistance: { value: vrEnabled ? maxDistance : 100, min: 0, max: 200, step: 1 },
				fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
				followCamera: false,
				infiniteGrid: true,
			},
			{ collapsed: true }
		),
	})

	return (
		<>
			<Grid
				// position={[0, -0.19, 0]}
				position={[0, -0.41, 0]}
				args={gridSize}
				{...gridConfig}
				// args={[70, 70]}
				// cellSize={0.6}
				// cellThickness={1}
				// cellColor={'#6f6f6f'}
				// sectionSize={3.0}
				// sectionThickness={1.5}
				// sectionColor={'#9d4b4b'}
				// fadeDistance={vrEnabled ? maxDistance : 100}
				// fadeStrength={1}
				// followCamera={false}
				// infiniteGrid={true}
			/>

			<Sphere
				args={[maxDistance]}
				position={[0, 0, 0]}
				name='boundary-sphere'
				onClick={(e) => {
					e.stopPropagation()

					setTransformSelected('')
				}}
				userData={{ staticObj: true }}>
				<meshBasicMaterial side={THREE.BackSide} map={nightSky} />
			</Sphere>
		</>
	)
}
