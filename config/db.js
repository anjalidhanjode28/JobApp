const mongoose = require('mongoose');
require('dotenv').config();

const connection = () =>{
    mongoose.connect(process.env.URL).then(() =>{
        console.log({msg : "Connected Successfully!"});
    }).catch((error) =>{
        console.log({msg : "Connection is Failed!", error});
    })
}
module.exports = { connection };