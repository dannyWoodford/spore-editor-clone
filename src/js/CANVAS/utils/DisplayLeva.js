import React, { useEffect } from 'react'
import { useGlobalState } from '../../GlobalState'

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

	return <></>
}
