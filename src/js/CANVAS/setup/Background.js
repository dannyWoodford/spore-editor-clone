import React from 'react'
import { Sphere, useTexture, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import { globalState } from './../../GlobalState'

export default function Background() {
	const snap = useSnapshot(globalState)

	const [enivironment] = useTexture([process.env.PUBLIC_URL + '/textures/FS002_Night.png'])

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
				fadeDistance={100}
				fadeStrength={1}
				followCamera={false}
				infiniteGrid={true}
			/>

			<Sphere args={[snap.maxDistance]} position={[0, 0, 0]} name='boundry-sphere'>
				<meshBasicMaterial side={THREE.BackSide} map={enivironment} />
			</Sphere>
		</>
	)
}
