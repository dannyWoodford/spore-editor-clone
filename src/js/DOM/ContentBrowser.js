import React from 'react'

const ContentBrowser = () => {
	const dragStart = (e) => {
		e.dataTransfer.setData(e.target.id, '')
		e.dataTransfer.setData(e.target.dataset['type'], '')

		console.log('e.target', e.target.id)
		console.log('e.target', e.target.dataset['type'])

		let targetImage = e.target.querySelector('img')

		e.dataTransfer.setDragImage(targetImage, 0, 0)
	}

	return (
		<div className='content-browser'>
			{/* <div className='top-bar'></div> */}
			<div className='content-container'>
				<div className='item' id='box' data-type="shape" draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/box.svg'} />
					<h4>Box</h4>
				</div>
				<div className='item' id='sphere' data-type="shape" draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/sphere.svg'} />
					<h4>Sphere</h4>
				</div>
				<div className='item' id='cone' data-type="shape" draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/cone.svg'} />
					<h4>Cone</h4>
				</div>
				<div className='item' id='cylinder' data-type="shape" draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/cylinder.svg'} />
					<h4>Cylinder</h4>
				</div>
				<div className='item' id='octahedron' data-type="shape" draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/octahedron.svg'} />
					<h4>Octahedron</h4>
				</div>
				<div className='item' id='icosahedron' data-type="shape" draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/icosahedron.svg'} />
					<h4>Icosahedron</h4>
				</div>
				<div className='item' id='Castle_Wall_01' data-type="model" draggable='true' onDragStart={(e) => dragStart(e)}>
					<img alt='' src={process.env.PUBLIC_URL + '/logo192.png'} />
					<h4>Castle_Wall_01</h4>
				</div>
			</div>
		</div>
	)
}

export default ContentBrowser
