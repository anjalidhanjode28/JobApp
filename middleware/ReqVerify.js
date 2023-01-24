require('dotenv').config()
const jwt = require('jsonwebtoken');

const ReqVerify = async (req, res, next) =>{
   try {
    let token = req.headers.authtoken || null;
    if(!token){
        res.status(400).send({msg : "You have to login first!!!"});
    }
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if(err){
            res.status(400).send({msg : "You have to login first!!!"});
        }else{
            req.authId = decoded._id;
            next();
        }
      });
   } catch (error) {
    res.status(400).send({msg : "Error in Token", error})
   }
}

module.exports = { ReqVerify }
