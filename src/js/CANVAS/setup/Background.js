import React from 'react'
import { Environment } from '@react-three/drei'

export default function Background() {
	return (
		<>
			<hemisphereLight skyColor={'blue'} groundColor={'green'} intensity={0.3} position={[0, 300, 50]} />
			<Environment
				files={process.env.PUBLIC_URL + '/texture.hdr'}
				background={true}
				ground={{
					height: 15, // Height of the camera that was used to create the env map (Default: 15)
					radius: 100, // Radius of the world. (Default 60)
					scale: 1000, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
				}}
			/>
		</>
	)
}
