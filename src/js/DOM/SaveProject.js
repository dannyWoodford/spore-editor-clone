import React, { useState, useRef, useEffect } from 'react'
import { useGlobalState } from '../GlobalState'

export default function SaveProject() {
	const setProjectLoaded = useGlobalState((state) => state.projectNoPersist.setProjectLoaded)
	const showSaveProjectPrompt = useGlobalState((state) => state.projectNoPersist.showSaveProjectPrompt)
	const allProjects = useGlobalState((state) => state.projectStore.allProjects)
	const setAllProjects = useGlobalState((state) => state.projectStore.setAllProjects)
	const setCurrentProjectName = useGlobalState((state) => state.projectStore.setCurrentProjectName)

	// Navigation
	const returnHome = useGlobalState((state) => state.projectStore.navigationMethods.returnHome)

	const textInput = useRef()

	const [name, setName] = useState('')

	const setProjectHandler = () => {
		let newObj = {
			name: name,
			thumbnail: '/content-browser/models/Roof_Slant_Red_01.png',
			sceneObjectData: [],
		}

		setAllProjects([...allProjects, newObj])
		setProjectLoaded(true)
		setCurrentProjectName(name)
	}

	useEffect(() => {
		if (showSaveProjectPrompt) {
			textInput.current.focus()
		}
	}, [showSaveProjectPrompt])

	return (
		<div className={`save-project-bg ${showSaveProjectPrompt ? '' : 'hide-prompt'}`}>
			<div className='save-project'>
				<p className='text'>Ready to save your structure?</p>

				<form>
					<label>Structure Name</label>
					<input type='text' ref={textInput} value={name} onChange={(e) => setName(e.target.value)} />
				</form>

				<p className='text note'>You will be able to place your structure on the web app home page</p>
				<div className='button-container'>
					<button className='button cancel' onClick={() => returnHome()}>
						Abandon
					</button>
					<button className='button ready' onClick={() => setProjectHandler()}>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}
