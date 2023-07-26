import React, { Suspense, useState, useMemo } from 'react'
import { StatsGl, OrbitControls, PerspectiveCamera, Box, Sphere, Cone, Cylinder, Octahedron, Icosahedron } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

import Loading from './setup/Loading'
import Background from './setup/Background'
import Ground from './objects/Ground'
// import Raycasting from './setup/Raycasting'

export default function Scene() {
	const [sceneObjects, setSceneObjects] = useState([])
	// const sceneObjects = useRef([])

	const { camera, gl } = useThree()

	camera.filmOffset = -10

	gl.domElement.addEventListener('dragover', function (e) {
		e.stopPropagation()
		e.preventDefault()
	})

	gl.domElement.addEventListener('drop', function (e) {
		e.stopPropagation()
		e.preventDefault()
		// console.log('onDrop', e.dataTransfer.getData('id'))
		// setSceneObjects([e.dataTransfer.getData('id')])
		setSceneObjects([...sceneObjects, e.dataTransfer.getData('id')])

		// console.log('sceneObjects', sceneObjects)
		// e.stopImmediatePropagation()
	})

	// const addSceneObjects = useMemo(() => {
	// 	// if (!sceneObjects.length) return

	// 	console.log('%caddSceneObjects', 'color:red;font-size:14px;', sceneObjects)

	// 	sceneObjects.map((obj) => {
	// 		if (obj === 'box') {
	// 			console.log('obj', obj)
	// 			return (
	// 				<Box
	// 					args={[2, 2, 2]}
	// 					position={[0,0,0]}
	// 				>
	// 					<meshLambertMaterial color='red' />
	// 				</Box>
	// 			)
	// 		} else if (obj === 'sphere') {
	// 			console.log('obj', obj)
	// 			return (
	// 				<Sphere
	// 					args={[2]}
	// 				>
	// 					<meshLambertMaterial color='blue' />
	// 				</Sphere>
	// 			)
	// 		} else {
	// 			console.log('else', obj)
	// 			return (
	// 				<Box
	// 					args={[2, 2, 2]}
	// 					position={[0, 0, 0]}>
	// 					<meshLambertMaterial color='green' />
	// 				</Box>
	// 			)
	// 		}
	// 	})

	// 	// return (
	// 	// 	<Box
	// 	// 		args={[2, 2, 2]}
	// 	// 		position={[0, 0, 0]}>
	// 	// 		<meshLambertMaterial color='green' />
	// 	// 	</Box>
	// 	// )
	// }, [sceneObjects])

	return (
		<>
			<OrbitControls maxPolarAngle={Math.PI / 2.05} />
			<PerspectiveCamera makeDefault fov={45} position={[20, 6, -20]} />
			{/* <Raycasting /> */}
			<Suspense fallback={<Loading />}>
				<Background />
				<Ground>
					{sceneObjects.map((obj, i) => {
						if (obj === 'box') {
							return (
								<Box args={[2, 2, 2]} key={i} position={[0, 0, -2]}>
									<meshLambertMaterial color='red' />
								</Box>
							)
						} else if (obj === 'sphere') {
							return (
								<Sphere args={[2]} key={i} position={[0, 0, 2]}>
									<meshLambertMaterial color='green' />
								</Sphere>
							)
						} else if (obj === 'cone') {
							return (
								<Cone args={[2, 3]} key={i} position={[2, 0, 5]}>
									<meshLambertMaterial color='blue' />
								</Cone>
							)
						} else if (obj === 'cylinder') {
							return (
								<Cylinder args={[2, 2, 3]} key={i} position={[-5, 0, 2]}>
									<meshLambertMaterial color='purple' />
								</Cylinder>
							)
						} else if (obj === 'octahedron') {
							return (
								<Octahedron args={[2, 1]} key={i} position={[0, 0, 7]}>
									<meshLambertMaterial color='pink' />
								</Octahedron>
							)
						} else if (obj === 'icosahedron') {
							return (
								<Icosahedron args={[2, 1]} key={i} position={[-7, 0, -5]}>
									<meshLambertMaterial color='orange' />
								</Icosahedron>
							)
						} else {
							return null
						}
					})}
				</Ground>
			</Suspense>
			<StatsGl className='stats' />
		</>
	)
}
