const express = require("express");
const cors = require('cors');
const {connection} = require("./config/db")
const {jobRouter} = require("./routes/Job.route")
const {authRouter} = require("./routes/Auth.route")
require('dotenv').config()
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", authRouter)
app.use("/admin", jobRouter)

app.listen(PORT, () =>{
    connection();
    console.log(`Localhost started on port ${PORT}`);
})
