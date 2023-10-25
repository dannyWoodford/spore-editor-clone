import React, { useState, useRef, useEffect } from 'react'
import { useGlobalState } from '../GlobalState'

export default function SaveProject() {
	const showSaveProjectPrompt = useGlobalState((state) => state.projectNoPersist.showSaveProjectPrompt)

	// Navigation
	const returnHome = useGlobalState((state) => state.projectStore.navigationMethods.returnHome)
	const createNewProject = useGlobalState((state) => state.projectStore.navigationMethods.createNewProject)

	const textInput = useRef()

	const [name, setName] = useState('')

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
					<button className='button ready' onClick={() => createNewProject(name)}>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}
