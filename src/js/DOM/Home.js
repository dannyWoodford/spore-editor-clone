import React, { useMemo, useCallback } from 'react'
import { useGlobalState } from '../GlobalState'

export default function Home() {
	const setEditorStart = useGlobalState((state) => state.projectNoPersist.setEditorStart)
	const setShowSaveProjectPrompt = useGlobalState((state) => state.projectNoPersist.setShowSaveProjectPrompt)
	const setProjectLoaded = useGlobalState((state) => state.projectNoPersist.setProjectLoaded)
	const allProjects = useGlobalState((state) => state.projectStore.allProjects)
	const setCurrentProjectName = useGlobalState((state) => state.projectStore.setCurrentProjectName)

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
	}, [allProjects, existingProjectOnClickHandler])

	return (
		<div className={`home`}>
			<div className='profile home-panel'>
				<h1 className='title'>Username</h1>
				<hr id='divider'></hr>
				<p className='text'>Please choose a workspace size by inputting parcel dimensions</p>
			</div>
			<div className='projects home-panel'>
				<h1 className='title'>Projects</h1>
				<hr id='divider'></hr>
				<div className='projects-container'>
					{projectsHandler}

					<div className='project'>
						<div className='thumbnail' onClick={() => setShowSaveProjectPrompt(true)}>
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
