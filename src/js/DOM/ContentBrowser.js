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

	const [inputVal, setInputVal] = useState('')

	const addModelItems = useMemo(() => {
		if (!editorStart) return

		if (active === 'shapes') {
			return Object.entries(allShapes)
				.filter((obj) => {
					if (inputVal === '') {
						return obj
					} else if (obj[0].toLowerCase().includes(inputVal.toLowerCase())) {
						return obj
					}

					return null
				})
				.map((obj, index) => {
					return (
						<div
							key={index}
							className='item'
							data-type={obj[1].type}
							data-name={obj[0]}
							data-path=''
							draggable='true'
							onDragStart={(e) => onDragStartHandler(e)}>
							<div id='thumbnail-container'>
								<div id='dummy'></div>
								<img alt='' src={process.env.PUBLIC_URL + obj[1].thumbnail} />
							</div>
							<h4>{obj[1].displayName}</h4>
						</div>
					)
				})
		} else {
			return Object.entries(allModels)
				.filter((obj) => {
					if (inputVal === '') {
						return obj
					} else if (obj[0].toLowerCase().includes(inputVal.toLowerCase())) {
						return obj
					}

					return null
				})
				.map((obj, index) => {
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
								<div id='thumbnail-container'>
									<div id='dummy'></div>
									<img alt='' src={process.env.PUBLIC_URL + obj[1].thumbnail} />
								</div>
								<h4>{obj[1].displayName}</h4>
							</div>
						)
					} else {
						return null
					}
				})
		}
	}, [editorStart, active, onDragStartHandler, inputVal])

	return (
		<div className={`content-browser ${editorStart ? 'show' : ''} ${isLeva ? 'isLeva' : ''}`}>
			<div className='content-container'>
				<div className='side-bar'>
					<div className={`tab ${active === 'wall' ? 'active' : ''}`} onClick={() => setActive('wall')}>
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/wall.svg'} />
					</div>
					<div className={`tab ${active === 'roof' ? 'active' : ''}`} onClick={() => setActive('roof')}>
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/roof.svg'} />
					</div>
					<div className={`tab ${active === 'floor' ? 'active' : ''}`} onClick={() => setActive('floor')}>
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/floor.svg'} />
					</div>
					<div className={`tab ${active === 'item' ? 'active' : ''}`} onClick={() => setActive('item')}>
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/items.svg'} />
					</div>
					<div className={`tab ${active === 'shapes' ? 'active' : ''}`} onClick={() => setActive('shapes')}>
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/content-browser/shapes/octahedron.svg'} />
					</div>
				</div>
				<div className='content-container-main'>
					<div className='top-bar'>
						<input
							className='top-bar-search'
							type='text'
							value={inputVal}
							onChange={(e) => {
								setInputVal(e.target.value)
							}}
							placeholder={`search ${active}s...`}
						/>
					</div>
					<div className={`content --models ${active === 'wall' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'roof' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'floor' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'item' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --shapes ${active === 'shapes' ? 'active' : ''}`}>{addModelItems}</div>
				</div>
			</div>
		</div>
	)
}

export default ContentBrowser
