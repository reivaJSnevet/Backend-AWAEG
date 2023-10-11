import jwt from "jsonwebtoken";

const checkRole = (allowedRoles) => {
	return (req, res, next) => {
        try{
        
		const token = req.cookies ? req.cookies.token : null;
		const tokenP = req.headers.authorization.split(" ")[1];

		if (!token && !tokenP) {
			return res.status(401).json({ error: "Unauthorized"});
		}

		const verifyToken = (tokenToVerify) => {
			jwt.verify(tokenToVerify, process.env.JWT_SECRET, (err, decodedToken) => {
				if (err || !decodedToken) {
					return res.status(401).json({ error: "Unauthorized" });
				}

				if (!allowedRoles.includes(decodedToken.rol)) {
					return res.status(403).json({ error: "Forbidden" });
				}

				next();
			});
		};

		if (token) {
			verifyToken(token);
		}

		if (tokenP) {
			verifyToken(tokenP);
		}
    }catch(error){

        if(error.message === "Cannot read properties of undefined (reading 'split')"){
            return res.status(500).json({ error: "Problemas con el token o no se recibió uno" });
        }
        return res.status(500).json({ error: error.message || "Unexpected error" });
    }
	};
    
};

export default checkRole;

