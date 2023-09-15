import React from 'react'
import '../css/main.scss'
import { VRButton, XR } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { Stats, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

import { useSnapshot } from 'valtio'
import { globalState } from './GlobalState'

import Scene from './CANVAS/Scene'
import ContentBrowser from './DOM/ContentBrowser'
import ParcelPrompt from './DOM/ParcelPrompt'

import VRScene from './CANVAS/VR/VRScene'

export default function App() {
	const snap = useSnapshot(globalState)

	return (
		<div className='App'>
			<ParcelPrompt />
			<ContentBrowser />
			{snap.intro.initialPrompt && <VRButton />}
			<div className='bg-canvas'>
				<Canvas frameloop='demand' shadows>
					<XR onSessionStart={() => (globalState.vr.enabled = true)} onSessionEnd={() => (globalState.vr.enabled = false)}>
						{snap.vr.enabled && <VRScene />}
					</XR>

					{!snap.vr.enabled && <Scene />}

					<AdaptiveDpr pixelated />
					<AdaptiveEvents />
					<Stats className='stats' />
				</Canvas>
			</div>
		</div>
	)
}