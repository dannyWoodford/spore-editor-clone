import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

import { useGlobalState } from './../../GlobalState'

export default function Loading() {
	const vrEnabled = useGlobalState((state) => state.vr.enabled)

	const loadingGroup = useRef()
	const loader = useRef()

	useFrame(() => {
		if (loader.current) {
			loader.current.rotation.z -= 0.06
			loadingGroup.current.rotation.y -= 0.006
		}
	})

	return (
		<group
			ref={loadingGroup}
			position={vrEnabled ? [0, 1, -3] : [0, 5, 0]}
			rotation={vrEnabled ? [0, Math.PI / 4, 0] : [0, Math.PI / 2, 0]}
			scale={vrEnabled ? [0.2, 0.2, 0.2] : [1, 1, 1]}>
			<mesh ref={loader}>
				<torusGeometry args={[4, 0.2, 16, 100, 4.5]} />
				<meshBasicMaterial color={'white'} />
			</mesh>
			<Text color={'white'} anchorX={'center'} anchorY={'middle'} fontSize={1} font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'>
				Loading...
			</Text>
		</group>
	)
}
