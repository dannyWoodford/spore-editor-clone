const dynamicImports = require.context('.', false, /\.js$/)
let combinedObject = {}

dynamicImports.keys().forEach((fileName) => {
	if (fileName === './index.js' || fileName === './ContentBrowserOther.js') {
		// console.log('skip fileName', fileName)
		return // Skip this file
	}

	const componentModule = dynamicImports(fileName)

	if (componentModule.default) {
		// Print the individual object to the terminal
		// console.log(`Object from ${fileName}:`)
		// console.log(componentModule.default)

		// Add the object to the combinedObject
		Object.keys(componentModule.default).forEach((key) => {
			combinedObject[key] = componentModule.default[key]
		})
	}
})

// console.log('Combined Object:', combinedObject)

export default combinedObject
