import React from 'react'
import '../css/main.scss'
import { Canvas } from '@react-three/fiber'
import { StatsGl, AdaptiveDpr, AdaptiveEvents, GizmoHelper, GizmoViewport, Bvh } from '@react-three/drei'

import Scene from './CANVAS/Scene'
import ContentBrowser from './DOM/ContentBrowser'

function App() {
	return (
		<div className='App'>
			<ContentBrowser />
			<div className='bg-canvas'>
				<Canvas>
					<Bvh firstHitOnly>
						<Scene />
					</Bvh>
					
					<GizmoHelper
						alignment='bottom-right' // widget alignment within scene
						margin={[80, 120]} // widget margins (X, Y)
					>
						<GizmoViewport axisColors={['red', 'green', 'blue']} labelColor='white' hideNegativeAxes={true} />
					</GizmoHelper>

					<AdaptiveDpr pixelated />
					<AdaptiveEvents />
					<StatsGl className='stats' />
				</Canvas>
			</div>
		</div>
	)
}

export default App
