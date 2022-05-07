const jwt = require('jsonwebtoken');

const jwtToken = {

    signToken: (payload) => {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d"});
    },

    verifyToken: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            throw error;
        }
    },
};

module.exports = jwtToken;