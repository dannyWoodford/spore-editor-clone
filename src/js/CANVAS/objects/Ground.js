import React, { useMemo } from 'react'
import { Box } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { globalState } from './../../GlobalState'

const Ground = ({ children }) => {
	const snap = useSnapshot(globalState)
	// const [circleBrick] = useTexture([process.env.PUBLIC_URL + '/textures/brick1.bmp'])

	const addBaseParcel = useMemo(() => {
		return (
			<Box args={[snap.intro.parcelTotal * 10, 0.2, snap.intro.parcelTotal * 10]} position={[0, -1.7, 0]} name='platform' receiveShadow>
				<meshLambertMaterial color='lightgrey' transparent={true} opacity={0.9}/>
				{/* <meshBasicMaterial color='darkgrey' map={circleBrick} /> */}
			</Box>
		)

		// eslint-disable-next-line
	}, [snap.intro.parcelTotal])


	return (
		<group position={[0, 1.5, 0]} name='ground'>

			{addBaseParcel}

			{/* <Circle args={[snap.maxDistance]} position={[0, -1.75, 0]} name='platform-base' rotation={[-Math.PI / 2, 0, 0]}>
				<meshBasicMaterial color='#00570d' />
			</Circle> */}

				{children}
		</group>
	)
}

export default Ground
