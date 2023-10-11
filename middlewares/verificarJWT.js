import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader?.startsWith("Bearer")) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({ error: "Token invalido" });
            req.user = decoded.nombre;
            req.rol = decoded.rol;
            next();
        }
    );
}

export default verificarJWT;