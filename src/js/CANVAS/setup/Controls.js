import React from 'react'
// import { useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useGlobalState } from './../../GlobalState'

export default function Controls() {
	const maxDistance = useGlobalState((state) => state.intro.maxDistance)


	// const { camera } = useThree()

	// camera.filmOffset = -10

	return (
		<>
			<OrbitControls makeDefault maxPolarAngle={Math.PI / 2.05} maxDistance={maxDistance} />
			<PerspectiveCamera name="main-cam" makeDefault fov={45} position={[40, 15, 0]} />
		</>
	)
}
