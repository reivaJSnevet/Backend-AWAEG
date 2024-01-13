const verifyRole = (minLevel) => {
	return (req, res, next) => {
		if (!req?.role)
			return res.status(401).json({ message: "Unauthorized 1" });

		if (req.role.privilegeLevel > minLevel) {
			return res.status(401).json({ message: "Unauthorized 2" });
		}

		next();
	};
};

export default verifyRole;
