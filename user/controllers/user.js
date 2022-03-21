const { User } = require('../models')
const jwt = require('jsonwebtoken')
const {SECRET_TOKEN_KEY, EXPIRY} = require("../config");

const login = async (req, res)=>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if (!user || !await user.comparePassword(password)){
            return res.status(401).json({
                msg: "Invalid Credentials"
            })
        }
        // req.session.user = user.id
        const token  = await jwt.sign({_id: user._id, firstName: user.firstName}, SECRET_TOKEN_KEY, {expiresIn: EXPIRY})
        res.status(200).json({
            msg: "You are logged in!",
            token
        })
    } catch (err){
        res.status(500).json({
            error: err.message
        })
    }

}

// const logout = (req, res)=>{
//     const {user} = req.session
//     if(user){
//         req.session.destroy()
//         res.status(200).json({
//             msg: "You are successfully logged out!"
//         })
//     } else{
//         res.status(200).json({
//             error: "You are already logged out!"
//         })
//     }
// }

const register = async (req, res)=>{

    try{
        const user = await User.create(req.body)
        res.status(201).json({
            msg: `User created`,
            data: user
        })
    }catch (err){
        res.status(500).json({
            error: err.message
        })
    }
}

const userDetail = async (req, res)=>{
    try{
        const user = await User.findOne({_id: req.user._id})
        return res.status(200).json({data: user})

    }catch (err){
        return res.status(500).json({err})
    }
}

module.exports = {
    login,
    register,
    userDetail
}