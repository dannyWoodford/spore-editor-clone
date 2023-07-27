import React from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export default function Controls() {
	const { camera } = useThree()

	camera.filmOffset = -10

	return (
		<group>
			<OrbitControls makeDefault maxPolarAngle={Math.PI / 2.05} maxDistance={90} />
			<PerspectiveCamera makeDefault fov={45} position={[20, 6, -20]} />
		</group>
	)
}
