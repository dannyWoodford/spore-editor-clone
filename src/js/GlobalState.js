import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import merge from 'lodash.merge'

export const useGlobalState = create()(
	persist(
		(set, get) => ({
			projectIntro: {
				showSaveProjectPrompt: false,
				setShowSaveProjectPrompt: (bol) => set((state) => ({ projectIntro: { ...state.projectIntro, showSaveProjectPrompt: bol } })),
				projectLoaded: false,
				setProjectLoaded: (bol) => set((state) => ({ projectIntro: { ...state.projectIntro, projectLoaded: bol } })),
				editorStart: false,
				setEditorStart: (bol) => set((state) => ({ projectIntro: { ...state.projectIntro, editorStart: bol } })),
				reset: () => set((state) => ({ projectIntro: { ...state.projectIntro, showSaveProjectPrompt: false, projectLoaded: false, editorStart: false } })),
			},
			projectStore: {
				currentProjectName: '',
				setCurrentProjectName: (string) => set((state) => ({ projectStore: { ...state.projectStore, currentProjectName: string } })),
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
					const currentProjectName = get().projectStore.currentProjectName
					const allProjects = get().projectStore.allProjects

					const foundObject = allProjects.find((obj) => obj.name === currentProjectName)

					// If a matching object is found, return it; otherwise, return null
					return foundObject || null
				},
				deleteCurrentProject: () => {
					const currentProjectName = get().projectStore.currentProjectName
					const returnHome = get().projectStore.navigationMethods.returnHome

					const allProjects = get().projectStore.allProjects
					let allProjectsClone = [...allProjects]

					const setAllProjects = get().projectStore.setAllProjects

					allProjectsClone = allProjectsClone.filter((item) => item.name !== currentProjectName)

					setAllProjects(allProjectsClone)
					returnHome()
				},
				updateCurrentProject: (updateObj) => {
					const getCurrentProject = get().projectStore.getCurrentProject()

					const setAllProjects = get().projectStore.setAllProjects
					const allProjects = get().projectStore.allProjects

					for (const key in updateObj) {
						if (updateObj.hasOwnProperty(key)) {
							// Check if the property exists in the getCurrentProject object
							if (!getCurrentProject.hasOwnProperty(key)) {
								// If it doesn't exist, add it to the getCurrentProject object
								getCurrentProject[key] = updateObj[key]
							} else if (typeof updateObj[key] === 'object' && typeof getCurrentProject[key] === 'object') {
								// If both properties are objects, recursively merge them
								console.log('recursive')
								// UpdateCurrentProject(getCurrentProject[key], updateObj[key])
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
						const setCurrentProjectName = get().projectStore.setCurrentProjectName
						const resetProjectIntro = get().projectStore.projectIntro.reset

						resetProjectIntro()
						setCurrentProjectName('')
					},
				},
			},
			currentProjectName: '',
			setCurrentProjectName: (string) => set(() => ({ currentProjectName: string })),
			allProjects: [
				// {
				// 	name: 'dummy name',
				// 	thumbnail: '',
				//  parcelTotal: 3,
				//  sceneObjects: [],
				// }
			],
			setAllProjects: (arr) => set(() => ({ allProjects: arr })),
			getCurrentProject: () => {
				const currentProjectName = get().currentProjectName
				const allProjects = get().allProjects

				const foundObject = allProjects.find((obj) => obj.name === currentProjectName)

				// If a matching object is found, return it; otherwise, return null
				return foundObject || null
			},
			deleteCurrentProject: () => {
				const currentProjectName = get().currentProjectName
				const returnHome = get().navigationMethods.returnHome

				const allProjects = get().allProjects
				let allProjectsClone = [...allProjects]

				const setAllProjects = get().setAllProjects

				allProjectsClone = allProjectsClone.filter((item) => item.name !== currentProjectName)

				setAllProjects(allProjectsClone)
				returnHome()
			},
			updateCurrentProject: (updateObj) => {
				const getCurrentProject = get().getCurrentProject()

				const setAllProjects = get().setAllProjects
				const allProjects = get().allProjects

				for (const key in updateObj) {
					if (updateObj.hasOwnProperty(key)) {
						// Check if the property exists in the getCurrentProject object
						if (!getCurrentProject.hasOwnProperty(key)) {
							// If it doesn't exist, add it to the getCurrentProject object
							getCurrentProject[key] = updateObj[key]
						} else if (typeof updateObj[key] === 'object' && typeof getCurrentProject[key] === 'object') {
							// If both properties are objects, recursively merge them
							console.log('recursive')
							// UpdateCurrentProject(getCurrentProject[key], updateObj[key])
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
					const setCurrentProjectName = get().setCurrentProjectName
					const resetProjectIntro = get().projectIntro.reset

					resetProjectIntro()
					setCurrentProjectName('')
				},
			},
			intro: {
				maxDistance: 60,
				defaultParcelTotal: 3,
				snapDistance: 0.5,
				snapAngle: 45,
				snapping: true,
				setSnapping: (bol) => set((state) => ({ intro: { ...state.intro, snapping: bol } })),
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
			contentBrowserItems: [],
			setContentBrowserItems: (arr) => set(() => ({ contentBrowserItems: arr })),
			selected: '',
			setSelected: (mesh) => set(() => ({ selected: mesh })),
			transformSelected: '',
			setTransformSelected: (mesh) => set(() => ({ transformSelected: mesh })),
			prevSelectedName: '',
			setPrevSelectedName: (string) => set(() => ({ prevSelectedName: string })),
			transforms: {
				transformInitRot: null,
				setTransformInitRot: (rot) => set((state) => ({ transforms: { ...state.transforms, transformInitRot: rot } })),
				isTransforming: false,
				setIsTransforming: (bol) => set((state) => ({ transforms: { ...state.transforms, isTransforming: bol } })),
			},
		}),
		{
			merge: (persistedState, currentState) => merge(currentState, persistedState),
			partialize: (state) =>
				Object.fromEntries(
					Object.entries(state).filter(([key]) => {
						// persist all data except "projectIntro"
						return !['projectIntro'].includes(key)
					})
				),
			name: 'user-store',
			storage: createJSONStorage(() => localStorage),
		}
	)
)
