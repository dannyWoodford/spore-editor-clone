import React, {useState} from 'react'
import { globalState } from './../GlobalState'
import { useSnapshot } from 'valtio'

const ContentBrowser = () => {
	const snap = useSnapshot(globalState)
	const [active, setActive] = useState('Shapes')

	const dragStart = (e) => {
		e.dataTransfer.setData(`name=${e.target.dataset.name}`, '')
		e.dataTransfer.setData(`type=${e.target.dataset.type}`, '')
		e.dataTransfer.setData(`path=${e.target.dataset.path}`, '')


		let targetImage = e.target.querySelector('img')

		e.dataTransfer.setDragImage(targetImage, 0, 0)
	}

	return (
		<div className={`content-browser ${snap.intro.initialPrompt ? 'show' : ''}`}>
			<div className='top-bar'>
				<div className={`tab ${active === 'Shapes' ? 'active' : ''}`} onClick={() => setActive('Shapes')}>
					<h2 className='tab-name'>Shapes</h2>
				</div>
				<div className={`tab ${active === 'Models' ? 'active' : ''}`} onClick={() => setActive('Models')}>
					<h2 className='tab-name'>Models</h2>
				</div>
			</div>
			<div className='content-container'>
				<div className={`content ${active === 'Shapes' ? 'active' : ''}`}>
					<div className='item' data-type='shape' data-name='box' data-path='' draggable='true' onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/box.svg'} />
						<h4>Box</h4>
					</div>
					<div className='item' data-type='shape' data-name='sphere' data-path='' draggable='true' onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/sphere.svg'} />
						<h4>Sphere</h4>
					</div>
					<div className='item' data-type='shape' data-name='cone' data-path='' draggable='true' onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/cone.svg'} />
						<h4>Cone</h4>
					</div>
					<div className='item' data-type='shape' data-name='cylinder' data-path='' draggable='true' onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/cylinder.svg'} />
						<h4>Cylinder</h4>
					</div>
					<div className='item' data-type='shape' data-name='octahedron' data-path='' draggable='true' onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/octahedron.svg'} />
						<h4>Octahedron</h4>
					</div>
					<div className='item' data-type='shape' data-name='icosahedron' data-path='' draggable='true' onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/icosahedron.svg'} />
						<h4>Icosahedron</h4>
					</div>
				</div>
				<div className={`content ${active === 'Models' ? 'active' : ''}`}>
					<div
						className='item'
						data-type='model'
						data-name='banner'
						data-path='/content-browser/models/Banner_01.glb'
						draggable='true'
						onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/models/Banner_01.png'} />
						<h4>Banner</h4>
					</div>
					<div
						className='item'
						data-type='model'
						data-name='castle_wall'
						data-path='/content-browser/models/Castle_Wall_01.glb'
						draggable='true'
						onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/models/Castle_Wall_01.png'} />
						<h4>Castle Wall</h4>
					</div>
					<div
						className='item'
						data-type='model'
						data-name='grey_arch'
						data-path='/content-browser/models/Grey_Arch_01.glb'
						draggable='true'
						onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/models/Grey_Arch_01.png'} />
						<h4>Grey Arch</h4>
					</div>
					<div
						className='item'
						data-type='model'
						data-name='stairs_stone'
						data-path='/content-browser/models/Stairs_Stone_01.glb'
						draggable='true'
						onDragStart={(e) => dragStart(e)}>
						<img alt='' src={process.env.PUBLIC_URL + '/content-browser/models/Stairs_Stone_01.png'} />
						<h4>Stairs Stone</h4>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContentBrowser
