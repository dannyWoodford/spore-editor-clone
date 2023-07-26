import React from 'react'
import '../css/main.scss'
import Scene from './CANVAS/Scene'
import ContentBrowser from './DOM/ContentBrowser'
import { Canvas } from '@react-three/fiber'

function App() {
	return (
		<div className='App'>
			<ContentBrowser />
			<div className='bg-canvas'>
				<Canvas>
					<Scene />
				</Canvas>
			</div>
		</div>
	)
}

export default App
