import jwt from 'jsonwebtoken';

const checkRole = (role) => {
    return (req, res, next) => {
        const token = req.cookies ? req.cookies.token : null;

        //arreglo de rutas (traae path y contralador)

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            if (decodedToken.rol !== role) {
                return res.status(403).json({ error: 'Forbidden' });
            }

            next();
        });
    };
};

export default checkRole;
