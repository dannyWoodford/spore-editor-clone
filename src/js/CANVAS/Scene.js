import React, { Suspense, useMemo } from 'react'
import { Bvh } from '@react-three/drei'

import { useGlobalState } from './../GlobalState'

import Loading from './setup/Loading'
import DisplayLeva from './utils/DisplayLeva'
import Drop from './helpers/Drop'
import Ground from './objects/Ground'
import Shape from './objects/Shape'
import Model from './objects/Model'
import Raycasting from './utils/Raycasting'
import PivotControls from './utils/pivotControls/PivotControls'

export default function Scene() {
	const contentBrowserItems = useGlobalState((state) => state.sceneNoPersist.contentBrowserItems)
	const currentProjectSceneObjects = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjects)

	const addContentBrowserItems = useMemo(() => {
		if (!contentBrowserItems.length) return

		return contentBrowserItems.map((obj, i) => {
			if (obj) {
				if (obj.type === 'model') {
					return (
						<group key={i}>
							<Suspense fallback={<Loading />}>
								<Model name={obj.name + '-' + i} path={obj.path} />
							</Suspense>
						</group>
					)
				} else if (obj.type === 'shape') {
					return <Shape shape={obj.name} key={i} name={obj.name + '-' + i} />
				} else {
					return null
				}
			} else {
				return null
			}
		})

		// eslint-disable-next-line
	}, [contentBrowserItems])

	// const addStoredSceneObjects = useMemo(() => {
	// 	if (!currentProjectSceneObjects.length) return

	// 	// console.log('currentProjectSceneObjects', currentProjectSceneObjects)

	// 	// return currentProjectSceneObjects.map((obj, i) => {
	// 	// 	if (obj) {
	// 	// 		if (obj.type === 'model') {
	// 	// 			return (
	// 	// 				<group key={i}>
	// 	// 					<Suspense fallback={<Loading />}>
	// 	// 						<Model name={obj.name + '-' + i} path={obj.path} />
	// 	// 					</Suspense>
	// 	// 				</group>
	// 	// 			)
	// 	// 		} else if (obj.type === 'shape') {
	// 	// 			return <Shape shape={obj.name} key={i} name={obj.name + '-' + i} />
	// 	// 		} else {
	// 	// 			return null
	// 	// 		}
	// 	// 	} else {
	// 	// 		return null
	// 	// 	}
	// 	// })

	// 	// eslint-disable-next-line
	// }, [currentProjectSceneObjects])

	return (
		<group name='standard-scene'>
			<DisplayLeva />

			<Bvh firstHitOnly>
				<Ground>
					{addContentBrowserItems}
					{/* {addStoredSceneObjects} */}
				</Ground>
			</Bvh>

			<Drop />
			<Raycasting />

			<PivotControls />
		</group>
	)
}
