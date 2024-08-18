import jwt from "jsonwebtoken";
import "dotenv/config";

const {
  TOKEN_PRIVATE_KEY,
  TOKEN_EXPIRES_IN,
  TOKEN_REFRESH_EXPIRES_IN,
  TOKEN_REFRESH_PRIVATE_KEY,
} = process.env;

const generateToken = (payload) =>
  jwt.sign(payload, TOKEN_PRIVATE_KEY, {
    expiresIn: "6h",
  });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, TOKEN_REFRESH_PRIVATE_KEY, {
    expiresIn: "20h",
  });

const verifyToken = (token) => jwt.verify(token, TOKEN_PRIVATE_KEY);

const verifyRefreshToken = (refreshToken) =>
  jwt.verify(refreshToken, TOKEN_REFRESH_PRIVATE_KEY);

export default {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
