import { create } from 'zustand'

export const useGlobalState = create((set) => ({
	intro: {
		maxDistance: 60,
		initialPrompt: false,
		parcelTotal: 3,
		setInitialPrompt: () => set((state) => ({ intro: { ...state.intro, initialPrompt: true } })),
		changeParcelTotal: (num) => set((state) => ({ intro: { ...state.intro, parcelTotal: num } })),
	},
	sceneObjects: [],
	setSceneObjects: (arr) => set(() => ({ sceneObjects: arr })),
	vr: { enabled: false, setEnabled: (bol) => set((state) => ({ vr: { ...state.vr, enabled: bol } })) },
}))
