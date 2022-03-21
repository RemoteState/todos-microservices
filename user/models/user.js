const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName: String,
    email: {
        type: String,
        required:true,
        unique:true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6,"password should be greater than 5 character."]
    }
})

authSchema.pre('save', async function (){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    console.log(this.password)
})

authSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcryptjs.compare(password, this.password)
    return isMatch
}

module.exports = mongoose.model('user', authSchema)