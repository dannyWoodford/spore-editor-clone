import React, { useMemo } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import ThreeMeshUI from 'three-mesh-ui'

import ItemFactory from './ItemFactory'

extend(ThreeMeshUI)

export default function Panel() {
	const buildPanel = useMemo(() => {
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
					<ItemFactory />
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
	}, [])

	useFrame(() => {
		ThreeMeshUI.update()
	})

	return buildPanel
}
