const express = require('express');
const jobRouter = express.Router();
const { jobModel } = require('../models/JobModel');
const {ReqVerify}  =  require("../middleware/ReqVerify")



jobRouter.get("/", ReqVerify, async (req, res) =>{
    try {
        let adminId = req.authId;
        let admin = await jobModel.find({adminId});
        res.send(admin);
    } catch (error) {
        res.status(400).send({msg : "error in get"});
    }
})


jobRouter.post("/add", ReqVerify, async (req, res) =>{
        
    try {
        let adminId = req.authId;
        let {companyName, position, contract, location} = req.body;
        if(!companyName || !position || !contract || !location){
            res.status(400).send({msg : "Fill all the input tags"});
        }
        await jobModel.create({adminId, companyName, position, contract, location});
        res.send({msg : "Added Successfully"});
    } catch (error) {
        res.status(400).send({msg : "Error in add "});
    }

});

jobRouter.delete("/delete/:id", async (req, res) =>{
        
    try {
        let _id = req.params.id;
        await jobModel.findByIdAndDelete({_id});
        res.send({msg : "Delete Successfully"});
    } catch (error) {
        res.status(400).send({msg : "Error in delete"});
    }

});


jobRouter.patch("/update/:id", async (req, res) =>{
        
    try {
        let _id = req.params.id;
        await jobModel.findByIdAndUpdate({_id}, req.body);
        res.send({msg : "Update Successfully"});
    } catch (error) {
        res.status(400).send({msg : "Error in patch "});
    }

});




jobRouter.get("user/get", async (req, res) =>{
    try {
      let Data = await jobModel.find();
      res.send(Data);
    } catch (error) {
        res.status(400).send({msg : "Error...Somthing Went Wrong"});
    }
})



module.exports = {jobRouter}