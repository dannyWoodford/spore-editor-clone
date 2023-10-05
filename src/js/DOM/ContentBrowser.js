import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useGlobalState } from './../GlobalState'
import { allModels, allShapes } from './../ContentBrowserItems'

const ContentBrowser = ({ isLeva = false }) => {
	const editorStart = useGlobalState((state) => state.projectNoPersist.editorStart)

	// ContentBrowser sub-types
	// wall, item, floor, roof
	const [active, setActive] = useState('wall')

	const images = useRef({})

	useEffect(() => {
		const elems = document.querySelectorAll('.item')

		for (const elem of elems) {
			const source = process.env.PUBLIC_URL + elem.querySelector('img').src

			const image = new Image()
			image.setAttribute('style', `position: absolute; left: 0px; top: 0px; width: 80px; height: 80px; z-index: -1;`)
			image.src = source

			images.current[source] = image
		}
	})

	const onDragStartHandler = useCallback(
		(e) => {
			e.dataTransfer.setData(`name=${e.target.dataset.name}`, '')
			e.dataTransfer.setData(`type=${e.target.dataset.type}`, '')
			e.dataTransfer.setData(`path=${e.target.dataset.path}`, '')

			const source = process.env.PUBLIC_URL + e.target.querySelector('img').src

			const img = images.current[source]
			document.body.appendChild(img)

			e.dataTransfer.setDragImage(img, 0, 0)
		},
		[images]
	)

	const addModelItems = useMemo(() => {
		return Object.entries(allModels).map((obj, index) => {
			if (obj[1].modelType === active) {
				return (
					<div
						key={index}
						className='item'
						data-type={obj[1].type}
						data-name={obj[0]}
						data-path={obj[1].path}
						draggable='true'
						onDragStart={(e) => onDragStartHandler(e)}>
						<img alt='' src={process.env.PUBLIC_URL + obj[1].thumbnail} />
						<h4>{obj[1].displayName}</h4>
					</div>
				)
			} else {
				return null
			}
		})
	}, [active, onDragStartHandler])

	const addShapeItems = useMemo(() => {
		return Object.entries(allShapes).map((obj, index) => {
			return (
				<div key={index} className='item' data-type={obj[1].type} data-name={obj[0]} data-path='' draggable='true' onDragStart={(e) => onDragStartHandler(e)}>
					<img alt='' src={process.env.PUBLIC_URL + obj[1].thumbnail} />
					<h4>{obj[1].displayName}</h4>
				</div>
			)
		})
	}, [onDragStartHandler])

	return (
		<div className={`content-browser ${editorStart ? 'show' : ''} ${isLeva ? 'isLeva' : ''}`}>
			<div className='top-bar'>
				<h1 className='top-bar-title'>{active}</h1>
			</div>
			<div className='content-container'>
				<div className='side-bar'>
					<div className={`tab ${active === 'wall' ? 'active' : ''}`} onClick={() => setActive('wall')}>
						{/* <h3 className='tab-name'>Wall</h3> */}
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/wall.svg'} />
					</div>
					<div className={`tab ${active === 'roof' ? 'active' : ''}`} onClick={() => setActive('roof')}>
						{/* <h3 className='tab-name'>Roof</h3> */}
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/roof.svg'} />
					</div>
					<div className={`tab ${active === 'floor' ? 'active' : ''}`} onClick={() => setActive('floor')}>
						{/* <h3 className='tab-name'>Floor</h3> */}
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/floor.svg'} />
					</div>
					<div className={`tab ${active === 'item' ? 'active' : ''}`} onClick={() => setActive('item')}>
						{/* <h3 className='tab-name'>Items</h3> */}
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/items.svg'} />
					</div>
					<div className={`tab ${active === 'shapes' ? 'active' : ''}`} onClick={() => setActive('shapes')}>
						{/* <h3 className='tab-name'>Shapes</h3> */}
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/octahedron.svg'} />
					</div>
				</div>
				<div className='content-container-main' style={{ borderRadius: active === 'wall' ? '0 8px 8px 8px' : '8px 8px 8px 8px' }}>
					<div className={`content --shapes ${active === 'shapes' ? 'active' : ''}`}>{addShapeItems}</div>
					<div className={`content --models ${active === 'wall' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'roof' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'floor' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'item' ? 'active' : ''}`}>{addModelItems}</div>
				</div>
			</div>
		</div>
	)
}

export default ContentBrowser
