import React from 'react'
import '../css/main.scss'
import { Canvas } from '@react-three/fiber'
import { Stats, AdaptiveDpr, AdaptiveEvents, GizmoHelper, GizmoViewport } from '@react-three/drei'

import Scene from './CANVAS/Scene'
import ContentBrowser from './DOM/ContentBrowser'

function App() {
	return (
		<div className='App'>
			<ContentBrowser />
			<div className='bg-canvas'>
				<Canvas frameloop='demand'>
					<Scene />

					{/* <GizmoHelper
						alignment='bottom-right' // widget alignment within scene
						margin={[80, 120]} // widget margins (X, Y)
					>
						<GizmoViewport axisColors={['red', 'green', 'blue']} labelColor='white' hideNegativeAxes={true} />
					</GizmoHelper> */}

					<AdaptiveDpr pixelated />
					<AdaptiveEvents />
					<Stats className='stats' />
				</Canvas>
			</div>
		</div>
	)
}

export default App
