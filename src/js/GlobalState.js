import { atom } from 'jotai'

export const initialPromptAtom = atom(false)
export const parcelTotalAtom = atom(3)



// import { proxy } from 'valtio'

// export const globalState = proxy({
// 	intro: { initialPrompt: false, parcelTotal: 3 },
// 	// scene: { selected: '', transformSelected: '', prevSelected: '', initialDragCreate: false },
// })
