const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiry = +(process.env.TOKEN_EXPIRY);

exports.createToken = (user) => {
    try{
        let token = jwt.sign({
            id: user._id,
            userName: user.userName,
            firstName: user.fisrtName,
            lastName: user.lastName
        }, secret, {expiresIn: expiry})

        return token
    }catch(err){
        console.log(err);
        return null
    }
}

exports.decodeToken = (token) => {
    try {
        let decoded = jwt.verify(token, secret);
        return decoded;
    }catch(err){
        console.log(err);
        return null
    }
}