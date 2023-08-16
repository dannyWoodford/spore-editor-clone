import React, { useMemo } from 'react'
import { useTexture, Circle, Box } from '@react-three/drei'

const Ground = ({ parcelTotal, children }) => {
	const [circleBrick] = useTexture([process.env.PUBLIC_URL + '/textures/brick1.bmp'])

		const addSceneObjects = useMemo(() => {
			return (
				<Box args={[parcelTotal * 10, 0.2, parcelTotal * 10]} position={[0, -1.7, 0]}>
					{/* <meshLambertMaterial color='red' /> */}
					<meshBasicMaterial color='darkgrey' map={circleBrick} />
				</Box>
			)

			// eslint-disable-next-line
		}, [parcelTotal])

	return (
		<group position={[0, 1.5, 0]} name='ground'>
			{/* <Cylinder args={[15, 16, 0.5]} position={[0, -1.25, 0]} name='platform' rotation={[0, 0, 0]}>
				<meshBasicMaterial color='darkgrey' map={circleBrick} />
			</Cylinder> */}

			{addSceneObjects}

			<Circle args={[60]} position={[0, -1.75, 0]} name='platform-base' rotation={[-Math.PI / 2, 0, 0]}>
				<meshBasicMaterial color='#00570d' />
			</Circle>

			{children}
		</group>
	)
}

export default Ground
