const jsonwebtoken = require("jsonwebtoken");
const {SECRET_TOKEN_KEY} = require("../config");

const authenticatedMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(400).json({
            err: "invalid token"
        })
    }
    const token = authHeader.split(' ')[1]
    try{
        const {_id, firstName} = jsonwebtoken.verify(token, SECRET_TOKEN_KEY)
        req.user  = {_id, firstName}
        next()
    }catch (err){
        return res.status(500).json({err: err.message})
    }

}

module.exports = authenticatedMiddleware