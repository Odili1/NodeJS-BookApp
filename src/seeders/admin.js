const User = require('../models/user');
const bcrypt = require('bcryptjs');

let password = "admin234"

exports.seedAdmin = () => {
    User.findOne({role: "admin"}, (err, admin) => {
        if (err){
            throw err
        }

        // check if there is an admin account
        if (admin){
            return "admin account already exists"
        }

        // if there is none, create an admin account
        User.create({
            firstName: "Harry",
            lastName: "Potter",
            userName: "Goblin",
            role: "admin"
        }, (err, newAdmin) => {
            if (err) {
                throw err;
            }

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    throw err
                }

                bcrypt.hash(password, salt, (err, encoded) => {
                    if (err) {
                        throw err
                    }

                    newAdmin.password = encoded;
                    newAdmin.save((err, ssavedUser) => {
                        if (err) throw err;
                        return "admin account created";
                    })
                })
            })
        })
    })
}
