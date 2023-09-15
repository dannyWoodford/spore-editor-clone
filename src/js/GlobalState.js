import { proxy } from 'valtio'

export const globalState = proxy({
	intro: { initialPrompt: false, parcelTotal: 3 },
	maxDistance: 100,
	vr: { enabled: false },
	// scene: { selected: '', transformSelected: '', prevSelected: '', initialDragCreate: false },
})
