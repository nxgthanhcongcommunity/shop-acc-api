import jwt from "jsonwebtoken";
import "dotenv/config";
const {
  TOKEN_PRIVATE_KEY,
  TOKEN_EXPIRES_IN,
  TOKEN_REFRESH_EXPIRES_IN,
  TOKEN_REFRESH_PRIVATE_KEY,
} = process.env;

const verifyTokenMiddleware = (roles) => {
  return (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization?.slice(7);

    if (token == null) {
      return res.status(401).json({ succeed: false, message: "unauthorize" });
    }

    try {
      const decoded = jwt.verify(token, TOKEN_PRIVATE_KEY);
      if (decoded == null) {
        return res.status(401).json({ succeed: false, message: "unauthorize" });
      }

      const jwtRoles = decoded.roles;
      if (!roles.some((item) => jwtRoles.includes(item))) {
        return res.status(403).json({ succeed: false, message: "forbidden" });
      }

      req.account = decoded.account;
      next();
    } catch (ex) {
      return res.status(401).json({ succeed: false, message: "unauthorize" });
    }
  };
};

export default verifyTokenMiddleware;
