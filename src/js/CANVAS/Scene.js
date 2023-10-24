import React, { Suspense, useMemo } from 'react'
import { Bvh } from '@react-three/drei'
import * as THREE from 'three'

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
	const projectLoaded = useGlobalState((state) => state.projectNoPersist.projectLoaded)
	const contentBrowserItems = useGlobalState((state) => state.sceneNoPersist.contentBrowserItems)
	const currentProjectSceneObjectData = useGlobalState((state) => state.projectStore.getCurrentProject()?.sceneObjectData)

	const addContentBrowserItems = useMemo(() => {
		if (!contentBrowserItems.length) return
		
		return contentBrowserItems.map((obj, i) => {
			if (obj) {
				// console.log('%cNEW cobj.name', 'color:lightblue;font-size:14px;', obj)

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

	const addStoredSceneObjects = useMemo(() => {
		if (!projectLoaded) return
		if (!currentProjectSceneObjectData?.length) return

		// using this useMemo more like a useEffect to fire once on the first render to add the stored sceneObjects

		return currentProjectSceneObjectData.map((obj, i) => {
			if (obj) {
				// console.log('%cREBUILD sceneObjectData obj', 'color:orange;font-size:14px;', obj)

				if (obj.type === 'model') {
					return (
						<group key={i}>
							<Suspense fallback={<Loading />}>
								<Model name={obj.name + '-rebuild'} path={obj.storedPath} rebuilt={true} matrix={new THREE.Matrix4().fromArray(obj.matrix)} />
							</Suspense>
						</group>
					)
				} else if (obj.type === 'shape') {
					return <Shape shape={obj.name} key={i} name={obj.name + '-rebuild'} rebuilt={true} matrix={new THREE.Matrix4().fromArray(obj.matrix)} />
				} else {
					return null
				}
			} else {
				return null
			}
		})

		// eslint-disable-next-line
	}, [projectLoaded])

	return (
		<group name='standard-scene'>
			<DisplayLeva />

			<Bvh firstHitOnly>
				<Ground>
					{addContentBrowserItems}
					{addStoredSceneObjects}
				</Ground>
			</Bvh>

			<Drop />
			<Raycasting />

			<PivotControls />
		</group>
	)
}
