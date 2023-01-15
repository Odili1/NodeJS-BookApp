const {decodeToken} = require('../services/jwtService');



exports.authenticateUser = (req, res, next) => {
    // check if there is an authoriztion token
    if (!req.headers.authorization){
        return res.status(401).json({message: "authorization header required"})
    }

    // check the format
    let splittedHeader = req.headers.authorization.split(' ');
    if (splittedHeader[0] !== "Bearer"){
        return res.status(401).json({message: "authorization format is Bearer <token>"})
    }
    let token = splittedHeader[1];

    // decode the token
    let decodedToken = decodeToken(token)

    // check if valid
    if (!decodedToken){
        return res.status(401).json({message: "invalid autorization token. please login"});
    }
    console.log(decodedToken);
    req.user = decodedToken;
    
    // allow user to continue with request
    next()
};


exports.checkIfAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({message: "this route is restricted to admin users"});
    }

    return next()
}