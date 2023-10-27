import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import merge from 'lodash.merge'

export const useGlobalState = create()(
	persist(
		(set, get) => ({
			vr: {
				enabled: false,
				setEnabled: (bol) => set((state) => ({ vr: { ...state.vr, enabled: bol } })),
				isSetup: false,
				setIsSetup: (bol) => set((state) => ({ vr: { ...state.vr, isSetup: bol } })),
				hudScale: false,
				setHudScale: (bol) => set((state) => ({ vr: { ...state.vr, hudScale: bol } })),
			},
			intro: {
				maxDistance: 60,
				defaultParcelTotal: 3,
				snapDistance: 0.5,
				snapAngle: 45,
				snapping: true,
				setSnapping: (bol) => set((state) => ({ intro: { ...state.intro, snapping: bol } })),
			},
			projectNoPersist: {
				currentProjectName: '',
				setCurrentProjectName: (string) => set((state) => ({ projectNoPersist: { ...state.projectNoPersist, currentProjectName: string } })),
				levaUIInjected: false,
				setLevaUIInjected: (bol) => set((state) => ({ projectNoPersist: { ...state.projectNoPersist, levaUIInjected: bol } })),
				showSaveProjectPrompt: false,
				setShowSaveProjectPrompt: (bol) => set((state) => ({ projectNoPersist: { ...state.projectNoPersist, showSaveProjectPrompt: bol } })),
				projectLoaded: false,
				setProjectLoaded: (bol) => set((state) => ({ projectNoPersist: { ...state.projectNoPersist, projectLoaded: bol } })),
				editorStart: false,
				setEditorStart: (bol) => set((state) => ({ projectNoPersist: { ...state.projectNoPersist, editorStart: bol } })),
				reset: () =>
					set((state) => ({
						projectNoPersist: {
							...state.projectNoPersist,
							showSaveProjectPrompt: false,
							projectLoaded: false,
							editorStart: false,
							currentProjectName: '',
						},
						sceneNoPersist: {
							...state.sceneNoPersist,
							contentBrowserItems: [],
							selected: '',
							transformSelected: '',
							prevSelectedName: '',
						},
					})),
			},
			projectStore: {
				allProjects: [
					// {
					// 	name: 'dummy name',
					// 	thumbnail: '',
					//  parcelTotal: 3,
					//  sceneObjects: [],
					// }
				],
				setAllProjects: (arr) => set((state) => ({ projectStore: { ...state.projectStore, allProjects: arr } })),
				getCurrentProject: () => {
					const currentProjectName = get().projectNoPersist.currentProjectName
					const allProjects = get().projectStore.allProjects

					const foundObject = allProjects.find((obj) => obj.name === currentProjectName)

					// If a matching object is found, return it; otherwise, return null
					return foundObject || null
				},
				deleteCurrentProject: () => {
					const currentProjectName = get().projectNoPersist.currentProjectName
					const returnHome = get().projectStore.navigationMethods.returnHome

					const allProjects = get().projectStore.allProjects
					let allProjectsClone = [...allProjects]

					const setAllProjects = get().projectStore.setAllProjects

					allProjectsClone = allProjectsClone.filter((item) => item.name !== currentProjectName)

					setAllProjects(allProjectsClone)
					returnHome()
				},
				deleteProjectByName: (name) => {
					const allProjects = get().projectStore.allProjects
					let allProjectsClone = [...allProjects]

					const setAllProjects = get().projectStore.setAllProjects

					allProjectsClone = allProjectsClone.filter((item) => item.name !== name)

					setAllProjects(allProjectsClone)
				},
				updateCurrentProject: (updateObj) => {
					const getCurrentProject = get().projectStore.getCurrentProject()
					const allProjects = get().projectStore.allProjects
					const setAllProjects = get().projectStore.setAllProjects

					for (const key in updateObj) {
						if (updateObj.hasOwnProperty(key)) {
							// Check if the property exists in the getCurrentProject object
							if (!getCurrentProject.hasOwnProperty(key)) {
								// If it doesn't exist, add it to the getCurrentProject object
								getCurrentProject[key] = updateObj[key]
							} else {
								// Otherwise, update the property in the getCurrentProject object
								getCurrentProject[key] = updateObj[key]
							}
						}
					}

					setAllProjects(allProjects)
				},
				navigationMethods: {
					returnHome: () => {
						const setCurrentProjectName = get().projectNoPersist.setCurrentProjectName
						const resetProjectIntro = get().projectNoPersist.reset

						resetProjectIntro()
						setCurrentProjectName('')
					},
					createNewProject: (name) => {
						const setAllProjects = get().projectStore.setAllProjects
						const setProjectLoaded = get().projectNoPersist.setProjectLoaded
						const setCurrentProjectName = get().projectNoPersist.setCurrentProjectName
						const allProjects = get().projectStore.allProjects

						let newObj = {
							name: name,
							thumbnail: '/content-browser/models/Roof_Slant_Red_01.png',
							sceneObjectData: [],
						}

						setAllProjects([...allProjects, newObj])
						setProjectLoaded(true)
						setCurrentProjectName(name)
					},
				},
			},
			sceneNoPersist: {
				contentBrowserItems: [],
				setContentBrowserItems: (arr) => set((state) => ({ sceneNoPersist: { ...state.sceneNoPersist, contentBrowserItems: arr } })),
				selected: '',
				setSelected: (mesh) => set((state) => ({ sceneNoPersist: { ...state.sceneNoPersist, selected: mesh } })),
				transformSelected: '',
				setTransformSelected: (mesh) => set((state) => ({ sceneNoPersist: { ...state.sceneNoPersist, transformSelected: mesh } })),
				prevSelectedName: '',
				setPrevSelectedName: (string) => set((state) => ({ sceneNoPersist: { ...state.sceneNoPersist, prevSelectedName: string } })),
				transforms: {
					transformInitRot: null,
					setTransformInitRot: (rot) =>
						set((state) => ({ sceneNoPersist: { ...state.sceneNoPersist, transforms: { ...state.sceneNoPersist.transforms, transformInitRot: rot } } })),
					isTransforming: false,
					setIsTransforming: (bol) =>
						set((state) => ({ sceneNoPersist: { ...state.sceneNoPersist, transforms: { ...state.sceneNoPersist.transforms, isTransforming: bol } } })),
				},
			},
		}),
		{
			merge: (persistedState, currentState) => merge(currentState, persistedState),
			partialize: (state) =>
				Object.fromEntries(
					Object.entries(state).filter(([key]) => {
						// persist all data except "projectNoPersist"
						return !['projectNoPersist'].includes(key) && !['sceneNoPersist'].includes(key)
					})
				),
			name: 'user-store',
			storage: createJSONStorage(() => localStorage),
		}
	)
)
