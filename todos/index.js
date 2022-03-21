const express = require('express')
const config = require('./config')
const mongoose = require('mongoose')
const userDetail = require('./middleware/user')
const router = require('./routes/todo')
const app = express()

app.use(express.json())
app.use(userDetail)
app.use('/todos', router)
const server = async ()=>{
    // db connection
    await mongoose.connect("mongodb://localhost:27017/todos_ms_todos")
    app.listen(config.PORT, ()=>{
        console.log(`todos is listening at port ${config.PORT}`)
    })
}

server().catch(err=>console.log(err))
