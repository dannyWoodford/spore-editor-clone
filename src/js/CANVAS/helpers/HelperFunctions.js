export 	function updateObjectInArray(array, objectToUpdate) {
		const updatedArray = array.map((obj) => {
			if (obj.name === objectToUpdate.name) {
				// Clone the object to avoid modifying the original object.
				return { ...objectToUpdate }
			}
			return obj
		})

		return updatedArray
	}