import React from 'react'
import { useTexture, Cylinder, Circle } from '@react-three/drei'

const Ground = ({ children }) => {
	const [circleBrick] = useTexture([process.env.PUBLIC_URL + '/brick1.bmp'])

	return (
		<group position={[0, 1.5, 0]} name='ground'>
			<Cylinder args={[15, 16, 0.5]} position={[0, -1.25, 0]} name='platform' rotation={[0, 0, 0]}>
				<meshBasicMaterial color='darkgrey' map={circleBrick} />
			</Cylinder>

			<Circle args={[50]} position={[0, -1.75, 0]} name='platform-base' rotation={[-Math.PI / 2, 0, 0]}>
				<meshBasicMaterial color='green' />
			</Circle>

			{children}
		</group>
	)
}

export default Ground
