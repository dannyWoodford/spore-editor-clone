import React from 'react'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function Background() {
	return (
		<>
			<hemisphereLight name='hemisphereLight' skyColor={'blue'} groundColor={'green'} intensity={0.3} position={[0, 300, 50]} />
			<Sphere args={[90]} position={[0, 0, 0]} name='boundry-sphere'>
				<meshBasicMaterial color='black' side={THREE.BackSide} />
			</Sphere>
		</>
	)
}
