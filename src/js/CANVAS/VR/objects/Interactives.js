import React, { useState } from 'react'
import { Interactive, RayGrab } from '@react-three/xr'
import { Text, Box } from '@react-three/drei'

import Model2 from './Model2'

const Interactives = () => {
	const [hover, setHover] = useState(false)
	const [color, setColor] = useState(0x123456)

	const onSelect = () => {
		setColor((Math.random() * 0xffffff) | 0)
	}

	return (
		<group>
			<Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
				<Box position={[0, 1, -10]} color={color} scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]} args={[4, 1, 1]}>
					<Text position={[0, 0, 0.6]} fontSize={0.5} color='red' anchorX='center' anchorY='middle'>
						Hello react-xr!
					</Text>
				</Box>
			</Interactive>

			<RayGrab>
				<Box position={[1, 3, -10]} args={[1, 1, 1]}>
					<meshBasicMaterial color='red' />
				</Box>
			</RayGrab>

			<Model2 position={[1, 3, -60]} path={'/content-browser/models/Banner_01.glb'} />
		</group>
	)
}

export default Interactives
