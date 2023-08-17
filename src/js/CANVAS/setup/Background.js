import React from 'react'
import { Sphere, useTexture, Grid, Stage } from '@react-three/drei'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import { globalState } from './../../GlobalState'
import { useControls } from 'leva'

export default function Background() {
	const snap = useSnapshot(globalState)

	const [enivironment] = useTexture([process.env.PUBLIC_URL + '/textures/FS002_Night.png'])

	const { quality } = useControls('Lighting', { quality: { value: 'medium', options: ['high', 'medium', 'low'] } })

	// const { ...preset } = useControls('Lighting', {
	// 	preset: { value: 'rembrandt', options: ['rembrandt', 'portrait', 'upfront', 'soft'] },
	// 	shadows: { value: 'accumulative', options: ['accumulative', 'contact'] },
	// 	intensity: { value: 1, min: 0, max: 20 },
	// })

	// const { ...lightConfig } = useControls('Lighting', {
	// 	quality: true,
	// 	amount: { value: 8, min: 0, max: 20 },
	// 	radius: { value: 4, min: 0, max: 20 },
	// 	intensity: { value: 1, min: 0, max: 20 },
	// })

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
			{quality === 'low' && <hemisphereLight name='hemisphereLight' skyColor={'blue'} groundColor={'green'} intensity={1} position={[0, 200, 50]} />}
			{quality === 'medium' && (
				<group>
					<directionalLight position={[12, 25, -22]} intensity={0.3} />
					<spotLight position={[120, 40, 85]} intensity={0.8} angle={0.1} penumbra={1} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.000001} />
				</group>
			)}
			{quality === 'high' && <Stage adjustCamera={false} intensity={0.5} preset={{ main: [-32, -5, -22], fill: [-12, -1.5, 12] }} shadows='accumulative' />}

			<Sphere args={[snap.maxDistance]} position={[0, 0, 0]} name='boundry-sphere'>
				<meshBasicMaterial side={THREE.BackSide} map={enivironment} />
			</Sphere>
		</>
	)
}
