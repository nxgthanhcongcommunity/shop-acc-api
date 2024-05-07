import { verifyToken } from "../utils/jwtUtils";

const verifyTokenMiddleware = (roles) => {
    return (req, res, next) => {

        const authorization = req.headers.authorization;
        const token = authorization?.slice(7);

        const decoded = verifyToken(token);

        if (decoded == null) {
            res.status(401).json({
                succeed: false,
                message: "unauthorize",
                data: null,
            })
            return;
        }

        const role = decoded.account.role;

        if (!roles.includes(role)) {
            res.status(403).json({
                succeed: false,
                message: "forbidden",
                data: null,
            })
            return;
        }

        req.account = decoded.account;

        console.log(req.account)
        next();
    }
}

export default verifyTokenMiddleware;