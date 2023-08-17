import React from 'react'
import '../css/main.scss'
import { Canvas } from '@react-three/fiber'
import { Stats, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

import Scene from './CANVAS/Scene'
import ContentBrowser from './DOM/ContentBrowser'
import ParcelPrompt from './DOM/ParcelPrompt'

function App() {
	return (
		<div className='App'>
			<ParcelPrompt />
			<ContentBrowser />
			<div className='bg-canvas'>
				<Canvas frameloop='demand' shadows>
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
