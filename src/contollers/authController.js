const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {createToken} = require('../services/jwtService')

exports.registerNewUser = (req, res) => {
    // fetch user details from req body
    // check if a user with this username exists
    User.findOne({userName: req.body.userName}, (err, existingUser) => {
        if (err){
            return res.status(500).json({message: err})
        }
        if (existingUser){
            return res.status(400).json({message: "a user with this username already exists"})
        }

        // create a new user
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        }, (err, newUser) => {
            if (err){
                return res.status(500).json({message: err})
            }
            
            // hash user's password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({message: err})
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err){
                        return res.status(500).json({message: err})
                    }

                    // save password to db
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if (err) {
                            return res.status(500).json({message: err})
                        }

                        // create jwt for user
                        let token = createToken(newUser);
                        if (!token) {
                            return res.status(500).json({message: "sorry, we could not authenticate you. please login"})
                        }
                        
                        // send token to user
                        return res.status(200).json({
                            message: "User registration successful",
                            token
                        })
                
                    })
                })
            })
        })
        
    })
}

exports.loginUser = (req, res) => {
    // check if user exists
    User.findOne({userName: req.body.userName}, (err, foundUser) => {
        if (err) {
            return res.status(500).json({message: err})
        }

        if (!foundUser){
            return res.status(401).json({message: "incorrect username"})
        }

        // check if password is correct
        let match = bcrypt.compareSync(req.body.password, foundUser.password)
        if (!match) {
            return res.status(401).json({message: "incorrect password"})
        }

        // create a token
        let token = createToken(foundUser);
        if (!token) {
            return res.status(500).json({message: "sorry, we could not authenticate you. please login"})
        }

        
        // send token to user
        return res.status(200).json({
            message: "Userlogged in",
            token
        })
        

    })

}