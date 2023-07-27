import React from 'react'
import '../css/main.scss'
import { Canvas } from '@react-three/fiber'
import { Stats, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

import Scene from './CANVAS/Scene'
import ContentBrowser from './DOM/ContentBrowser'

function App() {
	return (
		<div className='App'>
			<ContentBrowser />
			<div className='bg-canvas'>
				<Canvas frameloop='demand'>
					<Scene />

					<AdaptiveDpr pixelated />
					<AdaptiveEvents />
					<Stats className='stats' />
				</Canvas>
			</div>
		</div>
	)
}

export default App
