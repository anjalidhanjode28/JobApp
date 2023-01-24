const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    adminId : {type : mongoose.Schema.Types.ObjectId, ref : "auth"},
    companyName : {type : String, required : true},
    position: { type: String, required: true },
    contract: { type: String, required: true },
    location : { type: String, required: true }
}, {
    versionKey : false,
    timestamps : true
});

const jobModel = mongoose.model('job', jobSchema);
module.exports = { jobModel };