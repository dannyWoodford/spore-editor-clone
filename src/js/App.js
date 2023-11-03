import React, { Suspense } from 'react'
import '../css/main.scss'
import { VRButton, XR } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { Stats, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

import { useGlobalState } from './GlobalState'

import Loading from './CANVAS/setup/Loading'
import Scene from './CANVAS/Scene'
import ContentBrowser from './DOM/ContentBrowser'
import ObjectData from './DOM/ObjectData'
import ParcelPrompt from './DOM/ParcelPrompt'
import SaveProject from './DOM/SaveProject'
import Home from './DOM/Home'

import VRScene from './CANVAS/VR/VRScene'

import Controls from './CANVAS/setup/Controls'
import Background from './CANVAS/setup/Background'
import Lighting from './CANVAS/setup/Lighting'
import UpdateThumbnail from './CANVAS/helpers/UpdateThumbnail'
import DeleteObject from './CANVAS/helpers/DeleteObject'
import InjectUIToLeva from './CANVAS/helpers/InjectUIToLeva'

import TerrainManager from './CANVAS/objects/terrain/TerrainManager'


export default function App() {
	const projectLoaded = useGlobalState((state) => state.projectNoPersist.projectLoaded)
	const editorStart = useGlobalState((state) => state.projectNoPersist.editorStart)
	const vrEnabled = useGlobalState((state) => state.vr.enabled)
	const setVrEnabled = useGlobalState((state) => state.vr.setEnabled)

	return (
		<div className='App'>
			{!projectLoaded && (
				<>
					<Home />
					<SaveProject />
				</>
			)}
			{projectLoaded && <ParcelPrompt />}
			<ContentBrowser />
			<ObjectData />
			{editorStart && <VRButton />}
			<div className='bg-canvas'>
				{/* frameloop will not be respected while in a VR session. */}
				<Canvas frameloop='demand' shadows>
					<Suspense fallback={<Loading />}>
						<Controls />
						<Background />
						<Lighting />
						<InjectUIToLeva />

						<TerrainManager />

						<XR onSessionStart={() => setVrEnabled(true)} onSessionEnd={() => setVrEnabled(false)}>
							{vrEnabled && <VRScene />}
						</XR>

						{!vrEnabled && <Scene />}
					</Suspense>

					<UpdateThumbnail />
					<DeleteObject />
					<AdaptiveDpr pixelated />
					<AdaptiveEvents />
					<Stats className='stats' />
				</Canvas>
			</div>
		</div>
	)
}
