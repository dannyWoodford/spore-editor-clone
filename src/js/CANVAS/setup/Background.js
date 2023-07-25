import React from 'react'
import { Environment, Box } from '@react-three/drei'

export default function Background() {
	return (
		<>
			<Environment preset='city' />
			<Box
				args={[2, 2, 2]} // Args for the buffer geometry
			/>
		</>
	)
}
