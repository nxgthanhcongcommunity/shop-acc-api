
import jwt from "jsonwebtoken";
const { PRIVATE_KEY } = process.env

const generateToken = (user) => {
    const payload = {
        user: user,
    };

    const options = {
        expiresIn: '1h', // Thời gian hết hạn của JWT
    };

    return jwt.sign(payload, PRIVATE_KEY, options);
};

export { generateToken };