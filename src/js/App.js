import React, {useState} from 'react'
import '../css/main.scss'
import { Canvas } from '@react-three/fiber'
import { Stats, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

import Scene from './CANVAS/Scene'
import ContentBrowser from './DOM/ContentBrowser'
import ParcelPrompt from './DOM/ParcelPrompt'

function App() {
	const [initialPrompt, setInitialPrompt] = useState(false)
	const [parcelTotal, setParcelTotal] = useState(3)

	const initialPromptHandler = () => {
		setInitialPrompt(true)
	}

	const parcelTotalHandler = (num) => {
		setParcelTotal(num)
	}

	return (
		<div className='App'>
			<ParcelPrompt
				initialPrompt={initialPrompt}
				initialPromptHandler={initialPromptHandler}
				setParcelTotal={setParcelTotal}
				parcelTotalHandler={parcelTotalHandler}
			/>
			<ContentBrowser initialPrompt={initialPrompt} />
			<div className='bg-canvas'>
				<Canvas frameloop='demand'>
					<Scene parcelTotal={parcelTotal} />

					<AdaptiveDpr pixelated />
					<AdaptiveEvents />
					<Stats className='stats' />
				</Canvas>
			</div>
		</div>
	)
}

export default App
