import jwt from 'jsonwebtoken';

const jwtToken = {

    signToken: (payload) => {
        return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: "7d"});
    },

    verifyToken: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw error;
        }
    },
};

export default jwtToken;