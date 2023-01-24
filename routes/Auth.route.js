const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 6;
const { AuthModel } = require('../models/AuthModel');
const { body, validationResult } = require('express-validator');




authRouter.post("/login", [
    body('email', "enter email").isEmail(),
    body('password', "enter password").not().isEmpty(),
], async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg : errors.errors[0].msg });
        }
        let {email, password} = req.body;

        let isAuth = await AuthModel.findOne({email});
        if(!isAuth){
            res.status(400).send({ msg : "Wrong Credentials" });
        }
        
        let isPasswordMatch = await bcrypt.compare(password, isAuth.password);
        if(isPasswordMatch){
            let token = jwt.sign({ _id : isAuth._id }, process.env.SECRET_KEY);
             res.send({msg : "Login Successfully", token, isAdmin : isAuth.isAdmin });
        }else{
            res.status(400).send({ msg : "Wrong Credentials" });
         }
    } catch (error) {
        res.send({msg : "Somthing Error", error})
    }
});

authRouter.post("/signup", [
    body('fullName', "enter full name").not().isEmpty(),
    body('email', "enter email").isEmail(),
    body('password', "enter password").not().isEmpty(),
], async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg : errors.errors[0].msg });
        }

        let {fullName, email, password} = req.body;

        let isAuth = await AuthModel.findOne({email});
        if(isAuth){
            res.status(400).send({ msg : "This Email Exists Please Login Directly" });
        }
        let hashPassword = await bcrypt.hash(password, saltRounds);

        let [base, end] = email.split("@");
        if(end == "masaischool.com"){
           await AuthModel.create({fullName, email, password : hashPassword, isAdmin : true});
        }else{
            await AuthModel.create({fullName, email, password : hashPassword});
        }
    
            res.send({msg : "Signup Successfully!"});

    } catch (error) {
        res.status(400).send({msg : "Somthing Went Wrong", error})
    }
});




module.exports = {authRouter};