const validateModelAttributes = (req, model) => {
	const requestBodyFields = Object.keys(req.body);
	const modelAttributes = Object.keys(model.rawAttributes);
	const primaryKey = model.primaryKeyAttribute;

	const invalidAttributes = requestBodyFields.filter(
		(attribute) => !modelAttributes.includes(attribute),
	);

	if (invalidAttributes.length > 0) {
		const attributeError = new Error(
			`Attributes not allowed: ${invalidAttributes.join(", ")}`,
		);
		attributeError.name = "MappingError";
		attributeError.status = 400;
		throw attributeError;
	}

	if (req.method === "PUT" && req.body[primaryKey]) {
		const primaryKeyError = new Error(
			`The ${primaryKey} cannot be modified!`,
		);
		primaryKeyError.name = "MappingError";
		primaryKeyError.status = 403;
		throw primaryKeyError;
	}
};

const validateModel = (model) => {
	return (req, res, next) => {
		try {
			validateModelAttributes(req, model);
			next();
		} catch (error) {
			next(error);
		}
	};
};

export default validateModel;
