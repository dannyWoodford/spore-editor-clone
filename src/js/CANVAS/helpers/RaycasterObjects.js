import { useThree } from '@react-three/fiber'

import { useGlobalState } from '../../GlobalState'

export default function RaycasterObjects() {
	const selected = useGlobalState((state) => state.sceneStore.selected)
	const { scene } = useThree()

	let raycasterObjectsArr = []

	scene.traverse((child) => {
		// Only include "ground" objects or created object

		// Explanation of (child.userData.moveableObj === true && child.name !== selected.name)
		// "child.userData.moveableObj === true" allows you to stack raycasterObjects
		// and "child.name !== selected.name" makes sure raycaster doesn't hit the current selected object and cause an infinite climb
		if (child.userData.staticObj === true || (child.userData.moveableObj === true && child.name !== selected.name)) {
			raycasterObjectsArr.push(child)
		}
	})

	return raycasterObjectsArr
}
