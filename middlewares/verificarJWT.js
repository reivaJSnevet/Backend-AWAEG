import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader) return res.status(401).json({ error: "Unauthorized" });

    console.log(authHeader); //Bearer token

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({ error: "Token invalido" });
            req.user = decoded.nombre;
            next();
        }
    );
}

export default verificarJWT;