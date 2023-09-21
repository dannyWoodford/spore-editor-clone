import React, { useState, useEffect, useMemo } from 'react'
import { useGlobalState } from './../GlobalState'
import { allModels, allShapes } from './../ContentBrowserItems'

const ContentBrowser = () => {
	const initialPrompt = useGlobalState((state) => state.intro.initialPrompt)

	const [active, setActive] = useState('Models')

	const images = {}

	useEffect(() => {
		const elems = document.querySelectorAll('.item')

		for (const elem of elems) {
			const source = process.env.PUBLIC_URL + elem.querySelector('img').src

			const image = new Image()
			image.setAttribute('style', `position: absolute; left: 0px; top: 0px; width: 80px; height: 80px; z-index: -1;`)
			image.src = source

			images[source] = image
		}
	})

	const onDragStartHandler = (e) => {
		e.dataTransfer.setData(`name=${e.target.dataset.name}`, '')
		e.dataTransfer.setData(`type=${e.target.dataset.type}`, '')
		e.dataTransfer.setData(`path=${e.target.dataset.path}`, '')

		const source = process.env.PUBLIC_URL + e.target.querySelector('img').src

		const img = images[source]
		document.body.appendChild(img)

		e.dataTransfer.setDragImage(img, 0, 0)
	}

	const addModelItems = useMemo(() => {
		return Object.entries(allModels).map((obj, index) => {
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
		})
	}, [])

	const addShapeItems = useMemo(() => {
		return Object.entries(allShapes).map((obj, index) => {
			return (
				<div key={index} className='item' data-type={obj[1].type} data-name={obj[0]} data-path='' draggable='true' onDragStart={(e) => onDragStartHandler(e)}>
					<img alt='' src={process.env.PUBLIC_URL + obj[1].thumbnail} />
					<h4>{obj[1].displayName}</h4>
				</div>
			)
		})
	}, [])

	return (
		<div className={`content-browser ${initialPrompt ? 'show' : ''}`}>
			<div className='top-bar'>
				<div className={`tab ${active === 'Models' ? 'active' : ''}`} onClick={() => setActive('Models')}>
					<h2 className='tab-name'>Models</h2>
				</div>
				<div className={`tab ${active === 'Shapes' ? 'active' : ''}`} onClick={() => setActive('Shapes')}>
					<h2 className='tab-name'>Shapes</h2>
				</div>
			</div>
			<div className='content-container'>
				<div className={`content --shapes ${active === 'Shapes' ? 'active' : ''}`}>{addShapeItems}</div>
				<div className={`content --models ${active === 'Models' ? 'active' : ''}`}>{addModelItems}</div>
			</div>
		</div>
	)
}

export default ContentBrowser
