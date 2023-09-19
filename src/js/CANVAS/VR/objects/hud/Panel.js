import React, { useMemo } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import ThreeMeshUI from 'three-mesh-ui'

import HudModel from './HudModel'

extend(ThreeMeshUI)

export default function Panel() {
	const addModelItems = useMemo(() => {
		const allModels = {
			banner: {
				path: '/content-browser/models/Banner_01.glb',
				displayName: 'Banner',
			},
			castle_wall: {
				path: '/content-browser/models/Castle_Wall_01.glb',
				displayName: 'Castle Wall',
			},
			grey_arch: {
				path: '/content-browser/models/Grey_Arch_01.glb',
				displayName: 'Grey Arch',
			},
			stairs_stone: {
				path: '/content-browser/models/Stairs_Stone_01.glb',
				displayName: 'Stairs Stone',
			},
		}

		let items = Object.entries(allModels).map((obj, index) => {
			return (
				<block
					name='item'
					key={index}
					args={[
						{
							height: 0.15,
							width: 0.15,
							margin: 0.005,
							fontSize: 0.02,
							contentDirection: 'column-reverse',
							backgroundColor: new THREE.Color('#094074'),
							backgroundOpacity: 0.6,
							borderRadius: 0.01,
						},
					]}>
					<text content={`${obj[1].displayName}`} />
					<HudModel name={`${obj[1].displayName}`} path={obj[1].path} type={'model'} />
				</block>
			)
		})

		const rows = []

		// there is no equivalent to flex-wrap so this is to dynamically break items to the appropriate amount of rows
		while (items.length) {
			rows.push(items.splice(0, 3))
		}

		return (
			<block
				name='topSubBlock'
				args={[
					{
						padding: 0.005,
						margin: 0.0,
						contentDirection: 'column',
						justifyContent: 'center',
						backgroundOpacity: 0,
						borderRadius: 0.0,
					},
				]}>
				{rows.map((row, index) => {
					return (
						<block
							name='topSubBlockRow'
							key={index}
							args={[
								{
									width: 0.47,
									padding: 0.0,
									margin: 0.0,
									contentDirection: 'row',
									justifyContent: 'start',
									borderRadius: 0.0,
									backgroundOpacity: 0,
								},
							]}>
							{row.map((item) => {
								return item
							})}
						</block>
					)
				})}
			</block>
		)
	}, [])

	useFrame(() => {
		ThreeMeshUI.update()
	})

	return (
		<block
			name='container'
			args={[
				{
					// width: 0.7,
					padding: 0.02,
					fontFamily: `${process.env.PUBLIC_URL}/vr_fonts/Roboto-msdf.json`,
					fontTexture: `${process.env.PUBLIC_URL}/vr_fonts/Roboto-msdf.png`,
					fontColor: new THREE.Color(0xffffff),
					backgroundOpacity: 0.4,
					backgroundColor: new THREE.Color('#5E5C6C'),
					borderRadius: 0.02,
				},
			]}>
			<block
				name='contentContainer'
				args={[
					{
						contentDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 0.002,
						margin: 0.0,
						backgroundOpacity: 0.7,
						backgroundColor: new THREE.Color('#5E5C6C'),
						borderRadius: 0.02,
					},
				]}>
				{addModelItems}
				<block
					name='bottomSubBlock'
					args={[
						{
							contentDirection: 'row',
							justifyContent: 'space-between',
							// alignItems: 'start',
							margin: 0.02,
							padding: 0.0,
							width: 0.5,
							// height: 0.2,
							backgroundOpacity: 0,
							backgroundColor: new THREE.Color('green'),
							borderRadius: 0.01,
						},
					]}>
					<block
						name='subSubBlock1'
						args={[
							{
								width: 0.24,
								height: 0.05,
								margin: 0.0,
								padding: 0.0,
								fontSize: 0.03,
								backgroundOpacity: 1,
								backgroundColor: new THREE.Color('blue'),
							},
						]}>
						<text content={'Models'} />
					</block>
					<block
						name='subSubBlock2'
						args={[
							{
								width: 0.24,
								height: 0.05,
								margin: 0.0,
								padding: 0.0,
								fontSize: 0.03,
								backgroundOpacity: 1,
								backgroundColor: new THREE.Color('red'),
							},
						]}>
						<text content={'Shapes'} />
					</block>
				</block>
			</block>
		</block>
	)
}
