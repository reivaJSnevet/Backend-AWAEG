// globalTrimHook.js

const applyGlobalTrimHook = (sequelize) => {
	sequelize.addHook("beforeSave", (instance) => {
		// iterate over all the attributes of the model
		Object.keys(instance.dataValues).forEach((key) => {
			const value = instance.getDataValue(key);

			// trim all string values
			if (typeof value === "string") {
				instance.setDataValue(key, value.trim());
			}
		});
	});
};

export { applyGlobalTrimHook };
