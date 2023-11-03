import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useGlobalState } from './../GlobalState'
import { allModels, allShapes } from './../ContentBrowserItems'

const ContentBrowser = ({ isLeva = false }) => {
	const editorStart = useGlobalState((state) => state.projectNoPersist.editorStart)

	// ContentBrowser sub-types
	// wall, item, floor, roof, city
	const [active, setActive] = useState('city')

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
			e.dataTransfer.setData(`modeltype=${e.target.dataset.modeltype}`, '')

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
							data-modeltype=''
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
								data-modeltype={obj[1].modelType}
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

	// useEffect(() => {
	// 	const file_names = [
	// 		'detail_awning.glb',
	// 		'detail_awningWide.glb',
	// 		'detail_overhang.glb',
	// 		'detail_overhangWide.glb',
	// 		'detail_umbrella.glb',
	// 		'detail_umbrellaDetailed.glb',
	// 		'large_buildingA.glb',
	// 		'large_buildingB.glb',
	// 		'large_buildingC.glb',
	// 		'large_buildingD.glb',
	// 		'large_buildingE.glb',
	// 		'large_buildingF.glb',
	// 		'large_buildingG.glb',
	// 		'low_buildingA.glb',
	// 		'low_buildingB.glb',
	// 		'low_buildingC.glb',
	// 		'low_buildingD.glb',
	// 		'low_buildingE.glb',
	// 		'low_buildingF.glb',
	// 		'low_buildingG.glb',
	// 		'low_buildingH.glb',
	// 		'low_buildingI.glb',
	// 		'low_buildingJ.glb',
	// 		'low_buildingK.glb',
	// 		'low_buildingL.glb',
	// 		'low_buildingM.glb',
	// 		'low_buildingN.glb',
	// 		'low_wideA.glb',
	// 		'low_wideB.glb',
	// 		'roof_center.glb',
	// 		'roof_corner.glb',
	// 		'roof_overhang.glb',
	// 		'roof_side.glb',
	// 		'sign_billboard.glb',
	// 		'sign_hospital.glb',
	// 		'skyscraperA.glb',
	// 		'skyscraperB.glb',
	// 		'skyscraperC.glb',
	// 		'skyscraperD.glb',
	// 		'skyscraperE.glb',
	// 		'skyscraperF.glb',
	// 		'small_buildingA.glb',
	// 		'small_buildingB.glb',
	// 		'small_buildingC.glb',
	// 		'small_buildingD.glb',
	// 		'small_buildingE.glb',
	// 		'small_buildingF.glb',
	// 		'wall_doorA.glb',
	// 		'wall_doorB.glb',
	// 		'wall_solid.glb',
	// 		'wall_windowA.glb',
	// 		'wall_windowB.glb',
	// 		'wall_windowC.glb',
	// 		'wall_windowD.glb',
	// 		'wall_windowE.glb',
	// 		'wall_windowF.glb',
	// 	]

	// 	const objects = {}

	// 	function capitalizeWords(inputString) {
	// 		return inputString.replace(/\b\w/g, (match) => match.toUpperCase())
	// 	}

	// 	file_names.forEach((fileName) => {
	// 		const nameWithoutExtension = fileName.replace(/\..+$/, '')

	// 		objects[nameWithoutExtension] = {
	// 			path: `/content-browser/city/${fileName}`,
	// 			thumbnail: '/content-browser/city/large_buildingA.png',
	// 			displayName: capitalizeWords(nameWithoutExtension.replace(/_/g, ' ')),
	// 			type: 'model',
	// 			modelType: 'city',
	// 			hudModelRot: [0, 0, 0],
	// 		}
	// 	})

	// 	// return objects

	// 	console.log('allCityItems', objects)
	// }, [])

	return (
		<div className={`content-browser ${editorStart ? 'show' : ''} ${isLeva ? 'isLeva' : ''}`}>
			<div className='content-container'>
				<div className='side-bar'>
					<div className={`tab ${active === 'city' ? 'active' : ''}`} onClick={() => setActive('city')}>
						<img className='tab-icon' alt='' src={process.env.PUBLIC_URL + '/icons/city.svg'} />
					</div>
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
						<img className='search-icon' alt='' src={process.env.PUBLIC_URL + '/icons/search-options.svg'} />
					</div>
					<div className={`content --models ${active === 'wall' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'roof' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'floor' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --models ${active === 'item' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --shapes ${active === 'shapes' ? 'active' : ''}`}>{addModelItems}</div>
					<div className={`content --shapes ${active === 'city' ? 'active' : ''}`}>{addModelItems}</div>
				</div>
			</div>
		</div>
	)
}

export default ContentBrowser
