import React, { Suspense } from 'react'
import { Stats, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Loading from './setup/Loading'
import Background from './setup/Background'

export default function Scene() {

	return (
		<div className='bg-canvas'>
			<Canvas camera={{ fov: 80 }}>
				<OrbitControls/>
				<Suspense fallback={<Loading />}>
					<Background />
				</Suspense>
				<Stats className='stats' />
			</Canvas>
		</div>
	)
}
