import React from 'react'
import { Sphere, useTexture, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { useGlobalState } from './../../GlobalState'

export default function Background() {
	const maxDistance = useGlobalState((state) => state.intro.maxDistance)
	const vrEnabled = useGlobalState((state) => state.vr.enabled)

	const [nightSky] = useTexture([process.env.PUBLIC_URL + '/textures/FS002_Night.png'])

	return (
		<>
			<Grid
				position={[0, -0.31, 0]}
				args={[70, 70]}
				cellSize={0.6}
				cellThickness={1}
				cellColor={'#6f6f6f'}
				sectionSize={3.0}
				sectionThickness={1.5}
				sectionColor={'#9d4b4b'}
				fadeDistance={vrEnabled ? maxDistance : 100}
				fadeStrength={1}
				followCamera={false}
				infiniteGrid={true}
			/>

			<Sphere args={[maxDistance]} position={[0, 0, 0]} name='boundary-sphere' userData={{ staticObj: true }}>
				<meshBasicMaterial side={THREE.BackSide} map={nightSky} />
			</Sphere>
		</>
	)
}
