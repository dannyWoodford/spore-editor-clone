import React, { useMemo, useCallback } from 'react'
import { useGlobalState } from '../GlobalState'

export default function Home() {
	const store = useGlobalState((state) => state)
	const setEditorStart = useGlobalState((state) => state.projectNoPersist.setEditorStart)
	const setShowSaveProjectPrompt = useGlobalState((state) => state.projectNoPersist.setShowSaveProjectPrompt)
	const setProjectLoaded = useGlobalState((state) => state.projectNoPersist.setProjectLoaded)
	const allProjects = useGlobalState((state) => state.projectStore.allProjects)
	const setCurrentProjectName = useGlobalState((state) => state.projectNoPersist.setCurrentProjectName)
	const deleteProjectByName = useGlobalState((state) => state.projectStore.deleteProjectByName)

	const existingProjectOnClickHandler = useCallback(
		(projectName) => {
			// Skip parcel prompt
			setEditorStart(true)
			setProjectLoaded(true)
			setCurrentProjectName(projectName)
		},
		[setCurrentProjectName, setEditorStart, setProjectLoaded]
	)

	const projectsHandler = useMemo(() => {
		if (!allProjects.length) return

		return allProjects.map((project, i) => {
			return (
				<div className='project' key={i} onClick={() => existingProjectOnClickHandler(project.name)}>
					<button
						className='delete-project-button'
						onClick={(e) => {
							e.stopPropagation()

							deleteProjectByName(project.name)
						}}>
						<img className='delete-icon' alt='' src={process.env.PUBLIC_URL + '/icons/delete.svg'} />
					</button>

					<div className='thumbnail'>
						<img alt='' src={process.env.PUBLIC_URL + project.thumbnail} />
					</div>
					<div className='info'>
						<p className='name'>{project.name}</p>
						<p className='edited'>edited x months ago</p>
					</div>
				</div>
			)
		})
	}, [allProjects, existingProjectOnClickHandler, deleteProjectByName])

	return (
		<div className={`home`}>
			<div className='profile home-panel'>
				<h1 className='title'>Username</h1>
				<hr id='divider'></hr>
				<p className='text'>Please choose a workspace size by inputting parcel dimensions</p>
				<button
					className='button'
					onClick={() => {
						localStorage.removeItem('user-store')
						window.location.reload()
					}}>
					<p className='text'>RESET Store</p>
					<i className='arrow right'></i>
				</button>
				<button className='button' onClick={() => console.log('store', store)}>
					<p className='text'>store</p>
					<i className='arrow right'></i>
				</button>
			</div>
			<div className='projects home-panel'>
				<h1 className='title'>Projects</h1>
				<hr id='divider'></hr>
				<div className='projects-container'>
					{projectsHandler}

					<div className='project'>
						<div className='thumbnail new' onClick={() => setShowSaveProjectPrompt(true)}>
							<img className='plus' alt='' src={process.env.PUBLIC_URL + '/icons/plus.svg'} />
						</div>
						<div className='info'>
							<p className='name'>New Project</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
