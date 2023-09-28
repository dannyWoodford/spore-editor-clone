import React, { useEffect } from 'react'
// import ReactDOMServer from 'react-dom/server'
// import { hydrateRoot } from 'react-dom/client'

import { useGlobalState } from '../../GlobalState'

// import ContentBrowser from '../../DOM/ContentBrowser'

export default function DisplayLeva() {
	const initialPrompt = useGlobalState((state) => state.intro.initialPrompt)

	useEffect(() => {
		let levaControls = document.querySelector('#leva__root')
		levaControls.style.display = 'none'

		if (initialPrompt) {
			levaControls.style.display = 'block'
		} else {
			levaControls.style.display = 'none'
		}
	}, [initialPrompt])

	// useEffect(() => {
	// 	const html = `
	// 	<div id="leva-controls-container"></div>
	// `

	// 	if (initialPrompt) {
	// 		let levaMainContainer = document.querySelector('.leva-c-kWgxhW-bCBHqk-fill-false ')
	// 		levaMainContainer.style.width = '30%'

	// 		let levaControlsContainer = document.querySelector('.leva-c-dmsJDs-hXSjjU-isRoot-true')
	// 		const contentHTML = ReactDOMServer.renderToString(<ContentBrowser isLeva={true} />)

	// 		const template = document.createElement('div')
	// 		template.innerHTML = html

	// 		const container = template.querySelector('#leva-controls-container')
	// 		container.style.position = 'relative'
	// 		container.style.display = 'block'
	// 		container.innerHTML = contentHTML

	// 		levaControlsContainer.appendChild(template)
	// 		hydrateRoot(container, <ContentBrowser isLeva={true} />)
	// 	}
	// }, [initialPrompt])

	return <></>
}
