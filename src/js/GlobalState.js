import { create } from 'zustand'

export const useGlobalState = create((set) => ({
	initialPrompt: false,
	parcelTotal: 3,
	setInitialPrompt: () => set(() => ({ initialPrompt: true })),
	changeParcelTotal: (num) => set(() => ({ parcelTotal: num })),

	selected: '',
	setSelected: (mesh) => set(() => ({ selected: mesh })),
	transformSelected: '',
	setTransformSelected: (mesh) => set(() => ({ transformSelected: mesh })),
	prevSelected: '',
	setPrevSelected: (name) => set(() => ({ prevSelected: name })),
	initialDragCreate: false,
	setInitialDragCreate: (bol) => set(() => ({ initialDragCreate: bol })),
	sceneObjects: [],
	setSceneObjects: (arr) => set(() => ({ sceneObjects: arr })),
}))
