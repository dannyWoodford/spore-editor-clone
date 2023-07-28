import React from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export default function Controls() {
	const { camera } = useThree()

	camera.filmOffset = -10

	return (
		<>
			<OrbitControls makeDefault maxPolarAngle={Math.PI / 2.05} maxDistance={60} />
			<PerspectiveCamera makeDefault fov={45} position={[20, 10, -20]} />
		</>
	)
}
