import React from 'react'
import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Background() {
		const [enivironment] = useTexture([process.env.PUBLIC_URL + '/FS002_Night.png'])

	return (
		<>
			<hemisphereLight name='hemisphereLight' skyColor={'blue'} groundColor={'green'} intensity={0.3} position={[0, 300, 50]} />
			<Sphere args={[50]} position={[0, 0, 0]} name='boundry-sphere'>
				<meshBasicMaterial side={THREE.BackSide} map={enivironment} />
			</Sphere>
		</>
	)
}
