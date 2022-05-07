const jwt = require('../utiles/jsonwebtoken');

const User = require('../models/User');

module.exports = async (req, res, next) => {
    
    try {
        const token = await req.headers.authorization.split(" ")[1]; // to just have the token without 'Bearer' word
        // console.log(req.headers.authorization); Bearer token
  
        const decoded = jwt.verifyToken(token);
  
        req.user = await User.findById(decoded.id).select("-password"); // select("-password") is to remove the field password in the object, to protect it

        next();

    } catch (error) {
        res.status(401).json({ error: 'Token invalide ou non trouvé'});
    };
};