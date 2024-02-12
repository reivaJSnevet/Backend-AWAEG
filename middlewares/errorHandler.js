const customErrorHandlerMap = {
	ForbiddenError: (err, res) => {
		return res.status(err.statusCode).json({
			error: err.name,
			message: err.message,
			validToken: err.validToken,
		});
	},
	NotFoundError: (err, res) => {
		return res.status(err.statusCode).json({
			error: err.name,
			message: err.message,
			resourceId: err.resourceId,
		});
	},
	UnauthorizedError: (err, res) => {
		return res.status(err.statusCode).json({
			error: err.name,
			message: err.message,
            where: err.where,
		});
	},
	ValidationError: (err, res) => {
		return res.status(err.statusCode).json({
			error: err.name,
			message: err.message,
			errors: err.errors,
		});
	},
};

const sequelizeErrorHandlerMap = {
	SequelizeUniqueConstraintError: (err, res) => {
		return res.status(400).json({
			error: "UniqueConstraintError",
			message: "Oops, some fields are not unique.",
			key: err.errors[0].value,
		});
	},
	SequelizeValidationError: (err, res) => {
		const errors = [];
		err.errors.forEach((e) => {
			errors.push({
				type: "ValidationError",
				message: e.message,
				field: e.path,
			});
		});

		return res.status(400).json({
			error: "ValidationError",
			message: "Some fields do not meet the requirements.",
			unmetValidations: errors,
		});
	},
	SequelizeDatabaseError: (err, res) => {
		return res.status(500).json({
			error: "DatabaseError",
			message: "Database error",
		});
	},
	SequelizeConnectionError: (err, res) => {
		return res.status(500).json({
			error: "DatabaseError",
			message: "Database error, connection failed.",
		});
	},
	SequelizeForeignKeyConstraintError: (err, res) => {
        const errors = [];
			errors.push({
				type: "ForeignKeyConstraintError",
				message: `El valor digitado no existe en la tabla ${err.table}`,
				field: err.fields[0],
            });

		return res.status(400).json({
			error: "ForeignKeyConstraintError",
			message:
				"An inserted value does not match its respective foreign key.",
			unmetValidations: errors,
		});
	},
};

const logError = (err) => {
	console.error("\x1b[31m%s\x1b[0m", "Error name:", err.name);
	console.error("\x1b[31m%s\x1b[0m", "Error message:", err.message);
	console.error("\x1b[31m%s\x1b[0m", "Error stack:", err.stack || "🥞");
    console.error("\x1b[31m%s\x1b[0m", "Error status code:", err.statusCode);
};

const defaultErrorHandler = (err, res) => {
	const statusCode = err.statusCode || 500;
	const responseBody = {
		error: err.name || "InternalServerError",
		message: err.message || "An error occurred.",
		stack: process.env.NODE_ENV === "development" ? err.stack : "🥞",
	};
	return res.status(statusCode).json(responseBody);
};

const errorHandler = (err, req, res, next) => {
	try {
		logError(err);
        /* console.log(err); */

		const sequelizeErrorFunction = sequelizeErrorHandlerMap[err.name];
		if (sequelizeErrorFunction) {
			return sequelizeErrorFunction(err, res);
		}

		const customErrorFunction = customErrorHandlerMap[err.name];
		if (customErrorFunction) {
			return customErrorFunction(err, res);
		}

		return defaultErrorHandler(err, res);
	} catch (err) {
		return defaultErrorHandler(err, res);
	}
};

export default errorHandler;
