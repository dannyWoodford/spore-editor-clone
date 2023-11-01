import React, { useCallback } from 'react'
import * as THREE from 'three'

import { useDeleteObject } from './../CANVAS/helpers/HelperFunctions'

import { useGlobalState } from './../GlobalState'

export default function ObjectData() {
	const editorStart = useGlobalState((state) => state.projectNoPersist.editorStart)
	const currentProjectSceneObjectData = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectData)
	const transformSelected = useGlobalState((state) => state.sceneNoPersist.transformSelected)
	const setAnchor = useGlobalState((state) => state.sceneNoPersist.setAnchor)
	const returnHome = useGlobalState((state) => state.projectStore.navigationMethods.returnHome)

	const { deleteObject } = useDeleteObject(transformSelected)

	const handleTransformChange = useCallback(
		(axis, vec = new THREE.Vector3()) => {
			if (!transformSelected) return 0

			vec.setFromMatrixPosition(transformSelected.matrix)

			if (axis === 'y') {
				// "+ 0.208" is offset for floor position
				return parseFloat(vec[axis].toFixed(4)) + 0.208
			} else {
				return parseFloat(vec[axis].toFixed(4))
			}
		},
		// eslint-disable-next-line
		[currentProjectSceneObjectData, transformSelected]
	)

	return (
		<div className={`object-data ${editorStart ? 'show' : ''}`}>
			<div className='object-data-container'>
				<div className='profile-container'>
					<img className='profile-pic' alt='' src={process.env.PUBLIC_URL + '/icons/profile-pic.svg'} />
					<h1 className='username'>Username</h1>
				</div>
				<hr id='divider'></hr>
				<div className={`transformSelected-data ${transformSelected ? 'show' : ''}`}>
					<h1 className='heading'>Position</h1>
					<div className='data'>
						<div className='row'>
							<p className='label'>X:</p>
							<input className='variable' type='number' value={handleTransformChange('x')} readOnly />
						</div>
						<div className='row'>
							<p className='label'>Y:</p>
							<input className='variable' type='number' value={handleTransformChange('y')} readOnly />
						</div>
						<div className='row'>
							<p className='label'>Z:</p>
							<input className='variable' type='number' value={handleTransformChange('z')} readOnly />
						</div>
					</div>
					<hr id='divider'></hr>
					<h1 className='heading'>(Align options)</h1>
					<div className='data'>
						<div className='row align-options'>
							<img className='anchor-icon' alt='' src={process.env.PUBLIC_URL + '/icons/anchor-1.svg'} onClick={() => setAnchor(1)} />
							<img className='anchor-icon' alt='' src={process.env.PUBLIC_URL + '/icons/anchor-2.svg'} onClick={() => setAnchor(2)} />
							<img className='anchor-icon' alt='' src={process.env.PUBLIC_URL + '/icons/anchor-3.svg'} onClick={() => setAnchor(3)} />
							<img className='anchor-icon' alt='' src={process.env.PUBLIC_URL + '/icons/anchor-4.svg'} onClick={() => setAnchor(4)} />
						</div>
					</div>
					<hr id='divider'></hr>
					<div className='data'>
						<button className='delete-button' onClick={() => deleteObject()}>
							<h1 className='delete'>Delete Object</h1>
						</button>
					</div>
					<hr id='divider'></hr>
				</div>
				<div className='exit-container'>
					<button className='exit-button' onClick={() => returnHome()}>
						<h1 className='exit'>Exit</h1>
						<img className='exit-arrow' alt='' src={process.env.PUBLIC_URL + '/icons/exit-arrow.svg'} />
					</button>
				</div>
			</div>
		</div>
	)
}
