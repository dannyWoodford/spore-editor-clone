import React from 'react'
import { SoftShadows } from '@react-three/drei'
import { useControls } from 'leva'
import { useThree } from '@react-three/fiber'



export default function Lighting() {
	const { invalidate } = useThree()
	
	const { quality } = useControls('Lighting', {
		quality: {
			value: 'high',
			options: ['high', 'medium', 'low'],
			onChange: () => {
				// force update because of "on demand" rendering style
				invalidate()
			},
			transient: false,
		},
	})

	// const { ...preset } = useControls('Lighting', {
	// 	preset: { value: 'rembrandt', options: ['rembrandt', 'portrait', 'upfront', 'soft'] },
	// 	shadows: { value: 'accumulative', options: ['accumulative', 'contact'] },
	// 	intensity: { value: 1, min: 0, max: 20 },
	// })

	// const { ...lightConfig } = useControls('Lighting', {
	// 	quality: true,
	// 	amount: { value: 8, min: 0, max: 20 },
	// 	radius: { value: 4, min: 0, max: 20 },
	// 	intensity: { value: 1, min: 0, max: 20 },
	// })

	return (
		<group>
			{quality === 'low' && <hemisphereLight name='hemisphereLight' skyColor={'blue'} groundColor={'green'} intensity={1} position={[0, 200, 50]} />}
			{quality === 'medium' && (
				<group>
					<directionalLight position={[12, 35, -22]} intensity={0.3} />
					<spotLight position={[120, 40, 85]} intensity={0.8} angle={0.1} penumbra={1} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.000001} />
				</group>
			)}
			{quality === 'high' && (
				<group>
					<SoftShadows size={53} focus={1.14} samples={14} />
					<directionalLight position={[12, 35, -22]} intensity={0.3} />
					<spotLight position={[120, 40, 85]} intensity={0.8} angle={0.12} penumbra={1} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.000001} />
				</group>
			)}
		</group>
	)
}
