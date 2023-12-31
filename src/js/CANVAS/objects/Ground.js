import React, { useMemo } from 'react'
import { Plane, Box, Circle, MeshReflectorMaterial } from '@react-three/drei'
import { useControls, folder } from 'leva'

import { useGlobalState } from './../../GlobalState'

const Ground = ({ children }) => {
	const defaultParcelTotal = useGlobalState((state) => state.intro.defaultParcelTotal)
	const currentProjectParcelTotal = useGlobalState((state) => state.projectStore.getCurrentProject()?.parcelTotal)
	let parcelTotal = typeof currentProjectParcelTotal == 'undefined' ? defaultParcelTotal : currentProjectParcelTotal;

	const maxDistance = useGlobalState((state) => state.intro.maxDistance)

	const { enabled, material, ...reflectiveConfig } = useControls('Ground', {
		enabled: { value: false },
		Parcel: folder(
			{
				material: {
					value: 'transparent',
					options: ['transparent', 'reflective'],
				},
				blur: [300, 100],
				roughness: { value: 1.0, min: 0, max: 1, step: 0.1 },
				metalness: { value: 0.8, min: 0, max: 1, step: 0.1 },
				mixBlur: { value: 1.0, min: 0, max: 2, step: 0.1 },
				mixStrength: { value: 85, min: 0, max: 200, step: 10 },
				depthScale: { value: 1, min: 0, max: 5, step: 0.1 },
				minDepthThreshold: { value: 0.85, min: 0, max: 2, step: 0.1 },
				maxDepthThreshold: { value: 1.4, min: 0, max: 2, step: 0.1 },
			},
			{
				collapsed: true,
			}
		),
	})

	const addBaseParcel = useMemo(() => {
		return (
			<group>
				{material === 'reflective' && (
					<Plane
						args={[parcelTotal * 10, parcelTotal * 10]}
						rotation={[-Math.PI / 2, 0, 0]}
						position={[0, -0.2, 0]}
						name='platform-top'
						userData={{ staticObj: true }}
						onClick={(e) => {
							e.stopPropagation()
						}}
						receiveShadow>
						<MeshReflectorMaterial {...reflectiveConfig} resolution={2048} color='lightgrey' />
					</Plane>
				)}
				<Box
					args={[parcelTotal * 10, 0.2, parcelTotal * 10]}
					position={[0, -0.308, 0]}
					name='platform'
					userData={{ staticObj: true }}
					onClick={(e) => {
						e.stopPropagation()
					}}
					receiveShadow>
					<meshLambertMaterial color={'lightgrey'} transparent={true} opacity={0.9} />
				</Box>
			</group>
		)
	}, [parcelTotal, material, reflectiveConfig])

	return (
		<group position={[0, 0, 0]} name='ground'>
			{addBaseParcel}

			{enabled && (
				<Circle args={[maxDistance * 2]} position={[0, -0.5, 0]} name='platform-base' userData={{ staticObj: true }} rotation={[-Math.PI / 2, 0, 0]}>
					<meshBasicMaterial color='#00570d' />
				</Circle>
			)}
			<group name='children-group'>
				{children}
			</group>
		</group>
	)
}

export default Ground
