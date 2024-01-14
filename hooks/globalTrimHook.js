/**
 * Applies a global trim hook to a Sequelize instance.
 * This hook trims all string values before saving the instance.
 *
 * @param {Sequelize} sequelize - The Sequelize instance.
 * @returns {void}
 */
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
