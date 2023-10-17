import React, { useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'

import { useGlobalState } from '../../GlobalState'

export default function InjectUIToLeva() {
	const editorStart = useGlobalState((state) => state.projectNoPersist.editorStart)
	const levaUIInjected = useGlobalState((state) => state.projectNoPersist.levaUIInjected)
	const setLevaUIInjected = useGlobalState((state) => state.projectNoPersist.setLevaUIInjected)

	useEffect(() => {
		if (levaUIInjected) return

		const html = `
		<div id="leva-controls-container"></div>
	`

		if (editorStart) {
			let levaMainContainer = document.querySelector('.leva-c-kWgxhW-bCBHqk-fill-false ')
			levaMainContainer.style.width = '20%'
			// levaMainContainer.style.width = '30%'

			const timer = setTimeout(() => {
				let levaControlsContainer = document.querySelector('.leva-c-dmsJDs-hXSjjU-isRoot-true')

				const contentHTML = ReactDOMServer.renderToString(<SceneObjectsHelper />)

				const template = document.createElement('div')
				template.innerHTML = html

				const container = template.querySelector('#leva-controls-container')
				container.style.position = 'relative'
				container.style.display = 'block'
				container.innerHTML = contentHTML

				levaControlsContainer.appendChild(template)
				hydrateRoot(container, <SceneObjectsHelper />)

				setLevaUIInjected(true)
			}, 100)

			return () => clearTimeout(timer)
		}
	}, [editorStart, levaUIInjected, setLevaUIInjected])

	return
}

export function SceneObjectsHelper() {
	const store = useGlobalState((state) => state)
	const currentProjectSceneObjects = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjects)
	const currentProjectSceneObjectNames = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectNames)
	const selected = useGlobalState((state) => state.sceneNoPersist.selected)
	const transformSelected = useGlobalState((state) => state.sceneNoPersist.transformSelected)

	// Navigation
	const returnHome = useGlobalState((state) => state.projectStore.navigationMethods.returnHome)

	return (
		<div className='scene-objects-helper'>
			<button className='button' onClick={() => console.log('selected', selected)}>
				<p className='text'>selected</p>
				<i className='arrow right'></i>
			</button>
			<button className='button' onClick={() => console.log('transformSelected', transformSelected)}>
				<p className='text'>transformSelected</p>
				<i className='arrow right'></i>
			</button>
			<button className='button' onClick={() => console.log('currentProjectSceneObjects', currentProjectSceneObjects)}>
				<p className='text'>SceneObjects</p>
				<i className='arrow right'></i>
			</button>
			<button className='button navigate' onClick={() => console.log('currentProjectSceneObjectNames', currentProjectSceneObjectNames)}>
				<p className='text'>SceneObjects Names</p>
				<i className='arrow right'></i>
			</button>
			<button className='button' onClick={() => console.log('store', store)}>
				<p className='text'>store</p>
				<i className='arrow right'></i>
			</button>
			<button
				className='button'
				onClick={() => {
					localStorage.removeItem('user-store')
					window.location.reload()
				}}>
				<p className='text'>RESET Store</p>
				<i className='arrow right'></i>
			</button>
			<button className='button navigate' onClick={() => returnHome()}>
				<p className='text'>Return Home</p>
				<i className='arrow right'></i>
			</button>
		</div>
	)
}
