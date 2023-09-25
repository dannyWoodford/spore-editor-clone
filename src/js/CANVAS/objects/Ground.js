import React, { useMemo } from 'react'
import { Box, Circle } from '@react-three/drei'
import { useControls } from 'leva'
import { useGlobalState } from './../../GlobalState'

const Ground = ({ children }) => {
	const parcelTotal = useGlobalState((state) => state.intro.parcelTotal)
	const maxDistance = useGlobalState((state) => state.intro.maxDistance)

	const { enabled } = useControls('Ground', {
		enabled: { value: false },
	})

	const addBaseParcel = useMemo(() => {
		return (
			<Box args={[parcelTotal * 10, 0.2, parcelTotal * 10]} position={[0, -0.2, 0]} name='platform' userData={{ staticObj: true }} receiveShadow>
				<meshLambertMaterial color='lightgrey' transparent={true} opacity={0.9} />
			</Box>
		)

	}, [parcelTotal])

	

	return (
		<group position={[0, 0, 0]} name='ground'>
			{addBaseParcel}

			{enabled && (
				<Circle args={[maxDistance]} position={[0, -1.75, 0]} name='platform-base' userData={{ staticObj: true }} rotation={[-Math.PI / 2, 0, 0]}>
					<meshBasicMaterial color='#00570d' />
				</Circle>
			)}
			{children}
		</group>
	)
}

export default Ground
