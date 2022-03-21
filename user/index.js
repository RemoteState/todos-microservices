const express = require('express')
const config = require('./config')
const mongoose = require("mongoose");
const {userRouter} = require("./routes");

const app = express()
app.use(express.json())

// app.use('/', async (req, res, next)=>{
//
//     return res.status(200).json({mgs: "Hello User"})
// })
app.use('/user', userRouter)
const server = async ()=>{
    // db connection
    await mongoose.connect(config.MONGODB_URI)
    app.listen(config.PORT, ()=>{
        console.log(`User is listening at port ${config.PORT}`)
    })
}
server().catch(err=>console.log(err))
