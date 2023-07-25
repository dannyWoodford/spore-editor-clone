import React, { useRef } from 'react'

export default function Loading() {
	const loadingMesh = useRef()

	return (
		<group>
			<mesh ref={loadingMesh} name={'loading'} position={[0, 0, 0]} rotation={[0, 0, 0]} visible={false}>
				<torusGeometry args={[1.3, 0.14, 16, 100, 4.5]} />
				<meshBasicMaterial color='white' />
			</mesh>
		</group>
	)
}
