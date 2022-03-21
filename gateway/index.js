const cors = require('cors')
const express = require('express')
const proxy = require('express-http-proxy')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/user', proxy('http://localhost:3001'))
app.use('/todos', proxy('http://localhost:3002'))

app.listen(3000, ()=>{
    console.log(`Gateway is listening at port 3000`)
})

