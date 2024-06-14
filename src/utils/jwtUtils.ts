
import jwt from "jsonwebtoken";
import 'dotenv/config';

const { TOKEN_PRIVATE_KEY, TOKEN_EXPIRES_IN } = process.env

const generateToken = (account) => {

    const payload = {
        account: account,
    };

    return jwt.sign(payload, TOKEN_PRIVATE_KEY, {
        expiresIn: TOKEN_EXPIRES_IN || '1h',
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

export default { generateToken, verifyToken };