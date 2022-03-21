const mongoose = require('mongoose')
const todDoSchema = new mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required:true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    dueDate : {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('todo', todDoSchema)