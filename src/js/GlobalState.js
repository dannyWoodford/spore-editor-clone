import { create } from 'zustand'

export const useGlobalState = create((set) => ({
	intro: {
		maxDistance: 60,
		initialPrompt: false,
		parcelTotal: 3,
		setInitialPrompt: () => set((state) => ({ intro: { ...state.intro, initialPrompt: true } })),
		changeParcelTotal: (num) => set((state) => ({ intro: { ...state.intro, parcelTotal: num } })),
	},
	vr: {
		enabled: false,
		setEnabled: (bol) => set((state) => ({ vr: { ...state.vr, enabled: bol } })),
		isSetup: false,
		setIsSetup: (bol) => set((state) => ({ vr: { ...state.vr, isSetup: bol } })),
		hudScale: false,
		setHudScale: (bol) => set((state) => ({ vr: { ...state.vr, hudScale: bol } })),
	},
	sceneObjects: [],
	setSceneObjects: (arr) => set(() => ({ sceneObjects: arr })),
	selected: '',
	setSelected: (mesh) => set(() => ({ selected: mesh })),
	transformSelected: '',
	setTransformSelected: (mesh) => set(() => ({ transformSelected: mesh })),
	prevSelectedName: '',
	setPrevSelectedName: (string) => set(() => ({ prevSelectedName: string })),
	initialDragCreate: '',
	setInitialDragCreate: (bol) => set(() => ({ initialDragCreate: bol })),
}))
