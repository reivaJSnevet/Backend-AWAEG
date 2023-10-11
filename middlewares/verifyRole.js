const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.rol) return res.status(401).json({ error: "Unauthorized" });

        const rolesArray = [...allowedRoles]

        const result = rolesArray.includes(req.rol);

        if (!result) return res.status(401).json({ error: "Unauthorized" });

        next();
    }
}

export default verifyRole;