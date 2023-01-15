// Set Up Mongoose
const mongoose = require('mongoose');
const connectionString = process.env.DB_URL;


module.exports = function (){
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err){
            console.log(err);
        }else{
            console.log('Database connection Succesful');
        }
    })
}


