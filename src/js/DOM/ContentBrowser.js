import React from 'react'
import { initialPromptAtom } from './../GlobalState'
import { useAtom } from 'jotai'

const ContentBrowser = () => {
		const [initialPrompt, setInitialPrompt] = useAtom(initialPromptAtom)

	const dragStart = (e) => {
		e.dataTransfer.setData(e.target.id, '')

		let targetImage = e.target.querySelector('img')

		e.dataTransfer.setDragImage(targetImage, 0, 0)
	}

	return (
		<div className={`content-browser ${initialPrompt ? 'show' : ''}`}>
			{/* <div className='top-bar'></div> */}
			<div className='content-container'>
				<div className='item' id='box' draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/box.svg'} />
					<h4>Box</h4>
				</div>
				<div className='item' id='sphere' draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/sphere.svg'} />
					<h4>Sphere</h4>
				</div>
				<div className='item' id='cone' draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/cone.svg'} />
					<h4>Cone</h4>
				</div>
				<div className='item' id='cylinder' draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/cylinder.svg'} />
					<h4>Cylinder</h4>
				</div>
				<div className='item' id='octahedron' draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/octahedron.svg'} />
					<h4>Octahedron</h4>
				</div>
				<div className='item' id='icosahedron' draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/icosahedron.svg'} />
					<h4>Icosahedron</h4>
				</div>
			</div>
		</div>
	)
}

export default ContentBrowser
