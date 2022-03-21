const axios = require('axios')
const userDetail = async (req, res, next)=>{
    try {
        const user = await axios.get('http://localhost:3000/user/profile',
            {headers: {authorization: req.headers.authorization}}
        )
        req.user = user.data.data
        next()
    }catch (err){
        console.log(err.response, err.message)
        return res.status(err.response.status).json({err: err.response.data.err})
    }

}

module.exports = userDetail