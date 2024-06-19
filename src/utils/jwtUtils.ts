
import jwt from "jsonwebtoken";
import 'dotenv/config';

const { TOKEN_PRIVATE_KEY, TOKEN_EXPIRES_IN, TOKEN_REFRESH_EXPIRES_IN, TOKEN_REFRESH_PRIVATE_KEY } = process.env

const generateToken = (account) => {

    const payload = {
        account: account,
    };

    return jwt.sign(payload, TOKEN_PRIVATE_KEY, {
        expiresIn: 60,
    });
};

const generateRefreshToken = (account) => {

    const payload = {
        account: account,
    };

    return jwt.sign(payload, TOKEN_REFRESH_PRIVATE_KEY, {
        expiresIn: "20h",
    });

};

const verifyToken = (token) => {
    try {
        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, TOKEN_PRIVATE_KEY);
        return decoded;

    } catch (ex) {

        console.log(ex);
        return null;
    }
};

const verifyRefreshToken = (refreshToken) => {
    try {
        if (!refreshToken) {
            return null;
        }

        const decoded = jwt.verify(refreshToken, TOKEN_REFRESH_PRIVATE_KEY);
        return decoded;

    } catch (ex) {

        console.log(ex);
        return null;
    }
};

export default {
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken
};