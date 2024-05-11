import jwt from 'jsonwebtoken';
import config from '../config/auth.config';

export const verifyToken = (req: any, res: any, next: any) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};