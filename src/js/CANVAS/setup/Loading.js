import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

function Loading() {
	const loadingGroup = useRef()
	const loader = useRef()

	useFrame(() => {
		if (loader.current) {
			loader.current.rotation.z -= 0.06
			loadingGroup.current.rotation.y -= 0.006
		}
	})

	return (
		<group ref={loadingGroup} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
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

export default Loading
