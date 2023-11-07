import React, { useMemo } from 'react'
import * as THREE from 'three'
import combinedObjects from '../../../ContentBrowserItems/index'

import HudModel from './HudModel'

export default function ItemFactory() {
	const addModelItems = useMemo(() => {
		let items = Object.entries(combinedObjects).map((obj, index) => {
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
					<HudModel name={`${obj[1].displayName}`} path={obj[1].path} type={obj[1].type} rotation={obj[1].hudModelRot} />
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

	return addModelItems
}
